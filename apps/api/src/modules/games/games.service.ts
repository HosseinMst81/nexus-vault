import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameStatus } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FilterGamesDto } from './dto/filter-games.dto';
import { GameFilterBuilder } from './query-builders/game-filter.builder';
import {
  GameNotFoundException,
  DuplicateGameSlugException,
  InvalidPlaytimeException,
} from '../../common/exceptions/domain.exceptions';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async findAll(filterDto: FilterGamesDto) {
    const { page = 1, limit = 20, sortBy, sortOrder } = filterDto;

    const baseQuery = this.gameRepository.createQueryBuilder('game');

    // Open/Closed Principle: delegate dynamic query composition to GameFilterBuilder
    const query = GameFilterBuilder.create(baseQuery)
      .withRelations()
      .applyFilters(filterDto)
      .applySorting(sortBy, sortOrder)
      .applyPagination(page, limit)
      .build();

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: [
        'achievements',
        'reviews',
        'collectionItems',
        'collectionItems.collection',
      ],
    });

    if (!game) {
      throw new GameNotFoundException(id);
    }

    return game;
  }

  async findBySlug(slug: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { slug },
      relations: ['achievements', 'reviews'],
    });

    if (!game) {
      throw new GameNotFoundException(`slug: ${slug}`);
    }

    return game;
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const slug =
      createGameDto.slug ||
      createGameDto.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
        '-' +
        Math.floor(1000 + Math.random() * 9000);

    const existing = await this.gameRepository.findOne({ where: { slug } });
    if (existing) {
      throw new DuplicateGameSlugException(slug);
    }

    const game = this.gameRepository.create({
      ...createGameDto,
      slug,
      platforms: createGameDto.platforms || ['PC'],
      genres: createGameDto.genres || ['Action'],
      tags: createGameDto.tags || ['Singleplayer'],
    });

    return this.gameRepository.save(game);
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    const updated = this.gameRepository.merge(game, updateGameDto);
    return this.gameRepository.save(updated);
  }

  async remove(id: string): Promise<{ success: boolean; id: string }> {
    const game = await this.findOne(id);
    await this.gameRepository.remove(game);
    return { success: true, id };
  }

  async toggleFavorite(id: string): Promise<Game> {
    const game = await this.findOne(id);
    game.isFavorite = !game.isFavorite;
    return this.gameRepository.save(game);
  }

  async updateStatus(id: string, status: GameStatus): Promise<Game> {
    const game = await this.findOne(id);
    game.status = status;
    return this.gameRepository.save(game);
  }

  async logPlaytime(id: string, additionalMinutes: number): Promise<Game> {
    if (additionalMinutes <= 0) {
      throw new InvalidPlaytimeException(additionalMinutes);
    }

    const game = await this.findOne(id);
    game.playtimeMinutes = (game.playtimeMinutes || 0) + additionalMinutes;
    game.lastPlayedAt = new Date();

    if (
      game.status === GameStatus.BACKLOG ||
      game.status === GameStatus.WISHLIST
    ) {
      game.status = GameStatus.PLAYING;
    }

    return this.gameRepository.save(game);
  }

  async getFeatured(): Promise<Game[]> {
    return this.gameRepository.find({
      order: { metacriticScore: 'DESC', userScore: 'DESC' },
      take: 6,
      relations: ['achievements'],
    });
  }

  async getGenres(): Promise<string[]> {
    const games = await this.gameRepository.find({ select: ['genres'] });
    const genresSet = new Set<string>();
    games.forEach((g) => {
      if (Array.isArray(g.genres)) {
        g.genres.forEach((genre) => genresSet.add(genre.trim()));
      }
    });
    return Array.from(genresSet).sort();
  }

  async getPlatforms(): Promise<string[]> {
    const games = await this.gameRepository.find({ select: ['platforms'] });
    const platformsSet = new Set<string>();
    games.forEach((g) => {
      if (Array.isArray(g.platforms)) {
        g.platforms.forEach((platform) => platformsSet.add(platform.trim()));
      }
    });
    return Array.from(platformsSet).sort();
  }
}
