import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class LogPlaytimeDto {
  @ApiProperty({ description: 'Additional minutes played', example: 45 })
  @IsInt()
  @Min(1)
  additionalMinutes: number;
}
