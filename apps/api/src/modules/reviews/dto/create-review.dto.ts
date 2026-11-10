import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Target Game ID' })
  @IsUUID()
  gameId: string;

  @ApiPropertyOptional({ example: 'GhostRider99' })
  @IsString()
  @IsOptional()
  authorName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorAvatar?: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  recommended: boolean;

  @ApiProperty({ example: 'Absolute Masterpiece of World-Building' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'The combat fluidity and breathtaking graphics keep you hooked for 100+ hours.' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 45 })
  @IsInt()
  @Min(0)
  @IsOptional()
  hoursPlayed?: number;

  @ApiPropertyOptional({ example: ['Stunning ray tracing', 'Incredible OST'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  pros?: string[];

  @ApiPropertyOptional({ example: ['Minor UI clutter'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  cons?: string[];
}
