import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { GameStatus } from '../entities/game.entity';

export class CreateGameDto {
  @ApiProperty({ example: 'Cyberpunk 2077: Phantom Liberty' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'cyberpunk-2077' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'An open-world action-adventure RPG set in Night City.' })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-...' })
  @IsString()
  coverUrl: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-...' })
  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @ApiPropertyOptional({ example: 'https://www.youtube.com/embed/...' })
  @IsString()
  @IsOptional()
  trailerUrl?: string;

  @ApiPropertyOptional({ example: 'CD PROJEKT RED' })
  @IsString()
  @IsOptional()
  developer?: string;

  @ApiPropertyOptional({ example: 'CD PROJEKT' })
  @IsString()
  @IsOptional()
  publisher?: string;

  @ApiPropertyOptional({ example: '2023-09-26' })
  @IsString()
  @IsOptional()
  releaseDate?: string;

  @ApiPropertyOptional({ example: 59.99 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 89 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  metacriticScore?: number;

  @ApiPropertyOptional({ example: 9.1 })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  userScore?: number;

  @ApiPropertyOptional({ enum: GameStatus, default: GameStatus.BACKLOG })
  @IsEnum(GameStatus)
  @IsOptional()
  status?: GameStatus;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @ApiPropertyOptional({ example: ['PC', 'PlayStation 5', 'Xbox Series X'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  platforms?: string[];

  @ApiPropertyOptional({ example: ['Action RPG', 'Open World', 'Cyberpunk'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @ApiPropertyOptional({ example: ['Story Rich', 'Atmospheric', 'Ray Tracing'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ example: 70.0 })
  @IsNumber()
  @IsOptional()
  installSizeGb?: number;

  @ApiPropertyOptional()
  @IsOptional()
  systemRequirements?: any;

  @ApiPropertyOptional({ example: [] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  screenshots?: string[];
}
