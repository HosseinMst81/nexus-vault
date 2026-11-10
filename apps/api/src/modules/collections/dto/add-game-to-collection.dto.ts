import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class AddGameToCollectionDto {
  @ApiProperty({ description: 'Game UUID to add to collection' })
  @IsUUID()
  gameId: string;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
