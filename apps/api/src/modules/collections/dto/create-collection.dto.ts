import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({ example: 'Souls-like Masterpieces' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Challenging action RPGs with deep lore and punishing combat.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-...' })
  @IsString()
  @IsOptional()
  coverUrl?: string;

  @ApiPropertyOptional({ example: 'from-amber-600 to-rose-900' })
  @IsString()
  @IsOptional()
  colorGradient?: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
