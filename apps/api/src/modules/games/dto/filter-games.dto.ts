import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { GameStatus } from '../entities/game.entity';

export enum GameSortBy {
  TITLE = 'title',
  RATING = 'metacriticScore',
  USER_SCORE = 'userScore',
  PLAYTIME = 'playtimeMinutes',
  RELEASE_DATE = 'releaseDate',
  LAST_PLAYED = 'lastPlayedAt',
  CREATED_AT = 'createdAt',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FilterGamesDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search query across title, developer, publisher, and tags' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by genre' })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({ description: 'Filter by platform' })
  @IsString()
  @IsOptional()
  platform?: string;

  @ApiPropertyOptional({ enum: GameStatus })
  @IsEnum(GameStatus)
  @IsOptional()
  status?: GameStatus;

  @ApiPropertyOptional({ description: 'Filter only favorites' })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @ApiPropertyOptional({ description: 'Minimum metacritic score' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  minScore?: number;

  @ApiPropertyOptional({ enum: GameSortBy, default: GameSortBy.CREATED_AT })
  @IsEnum(GameSortBy)
  @IsOptional()
  sortBy?: GameSortBy = GameSortBy.CREATED_AT;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.DESC;
}
