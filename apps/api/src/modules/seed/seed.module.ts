import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../games/entities/game.entity';
import { Achievement } from '../games/entities/achievement.entity';
import { Collection } from '../collections/entities/collection.entity';
import { CollectionItem } from '../collections/entities/collection-item.entity';
import { Review } from '../reviews/entities/review.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      Achievement,
      Collection,
      CollectionItem,
      Review,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
