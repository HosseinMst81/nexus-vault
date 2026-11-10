import { SelectQueryBuilder } from 'typeorm';
import { Game } from '../entities/game.entity';
import { FilterGamesDto, GameSortBy, SortOrder } from '../dto/filter-games.dto';

/**
 * Open/Closed Principle (OCP) & Single Responsibility Principle (SRP):
 * Encapsulates the relational query specification pipeline for games.
 * New filter criteria or sorting strategies can be attached fluently
 * without modifying GamesService core business methods.
 */
export class GameFilterBuilder {
  private readonly query: SelectQueryBuilder<Game>;

  constructor(baseQuery: SelectQueryBuilder<Game>) {
    this.query = baseQuery;
  }

  static create(baseQuery: SelectQueryBuilder<Game>): GameFilterBuilder {
    return new GameFilterBuilder(baseQuery);
  }

  withRelations(): this {
    this.query.leftJoinAndSelect('game.achievements', 'achievements');
    return this;
  }

  applyFilters(filterDto: FilterGamesDto): this {
    const { search, genre, platform, status, isFavorite, minScore } = filterDto;

    if (search && search.trim()) {
      const term = `%${search.trim().toLowerCase()}%`;
      this.query.andWhere(
        '(LOWER(game.title) LIKE :search OR LOWER(game.developer) LIKE :search OR LOWER(game.publisher) LIKE :search OR LOWER(game.description) LIKE :search OR LOWER(game.tags) LIKE :search)',
        { search: term },
      );
    }

    if (genre && genre.trim()) {
      this.query.andWhere('LOWER(game.genres) LIKE :genre', {
        genre: `%${genre.trim().toLowerCase()}%`,
      });
    }

    if (platform && platform.trim()) {
      this.query.andWhere('LOWER(game.platforms) LIKE :platform', {
        platform: `%${platform.trim().toLowerCase()}%`,
      });
    }

    if (status) {
      this.query.andWhere('game.status = :status', { status });
    }

    if (typeof isFavorite === 'boolean') {
      this.query.andWhere('game.isFavorite = :isFavorite', { isFavorite });
    }

    if (minScore !== undefined && minScore !== null) {
      this.query.andWhere('game.metacriticScore >= :minScore', { minScore });
    }

    return this;
  }

  applySorting(sortBy?: GameSortBy, sortOrder?: SortOrder): this {
    const safeSortBy = Object.values(GameSortBy).includes(sortBy as GameSortBy)
      ? sortBy
      : GameSortBy.CREATED_AT;

    const safeSortOrder = sortOrder === SortOrder.ASC ? 'ASC' : 'DESC';

    this.query.orderBy(`game.${safeSortBy}`, safeSortOrder);
    return this;
  }

  applyPagination(page: number = 1, limit: number = 20): this {
    const skip = Math.max(0, (page - 1) * limit);
    this.query.skip(skip).take(limit);
    return this;
  }

  build(): SelectQueryBuilder<Game> {
    return this.query;
  }
}
