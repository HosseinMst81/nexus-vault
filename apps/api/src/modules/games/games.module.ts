import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Achievement } from './entities/achievement.entity';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Achievement])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService, TypeOrmModule],
})
export class GamesModule {}
