import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Game, GameStatus } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FilterGamesDto, GameSortBy, SortOrder } from './dto/filter-games.dto';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async findAll(filterDto: FilterGamesDto) {
    const {
      page = 1,
      limit = 20,
      search,
      genre,
      platform,
      status,
      isFavorite,
      minScore,
      sortBy = GameSortBy.CREATED_AT,
      sortOrder = SortOrder.DESC,
    } = filterDto;

    const query: SelectQueryBuilder<Game> = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.achievements', 'achievements');

    if (search) {
      query.andWhere(
        '(LOWER(game.title) LIKE :search OR LOWER(game.developer) LIKE :search OR LOWER(game.publisher) LIKE :search OR LOWER(game.description) LIKE :search OR LOWER(game.tags) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (genre) {
      query.andWhere('LOWER(game.genres) LIKE :genre', {
        genre: `%${genre.toLowerCase()}%`,
      });
    }

    if (platform) {
      query.andWhere('LOWER(game.platforms) LIKE :platform', {
        platform: `%${platform.toLowerCase()}%`,
      });
    }

    if (status) {
      query.andWhere('game.status = :status', { status });
    }

    if (typeof isFavorite === 'boolean') {
      query.andWhere('game.isFavorite = :isFavorite', { isFavorite });
    }

    if (minScore) {
      query.andWhere('game.metacriticScore >= :minScore', { minScore });
    }

    // Sorting
    const safeSortBy = Object.values(GameSortBy).includes(sortBy)
      ? sortBy
      : GameSortBy.CREATED_AT;
    const safeSortOrder = sortOrder === SortOrder.ASC ? 'ASC' : 'DESC';

    query.orderBy(`game.${safeSortBy}`, safeSortOrder);

    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['achievements', 'reviews', 'collectionItems', 'collectionItems.collection'],
    });

    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" was not found.`);
    }

    return game;
  }

  async findBySlug(slug: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { slug },
      relations: ['achievements', 'reviews'],
    });

    if (!game) {
      throw new NotFoundException(`Game with slug "${slug}" was not found.`);
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
      throw new ConflictException(`A game with slug "${slug}" already exists.`);
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
    const game = await this.findOne(id);
    game.playtimeMinutes = (game.playtimeMinutes || 0) + additionalMinutes;
    game.lastPlayedAt = new Date();
    if (game.status === GameStatus.BACKLOG || game.status === GameStatus.WISHLIST) {
      game.status = GameStatus.PLAYING;
    }
    return this.gameRepository.save(game);
  }

  async getFeatured(): Promise<Game[]> {
    return this.gameRepository.find({
      order: { metacriticScore: 'DESC', userScore: 'DESC' },
      take: 5,
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
