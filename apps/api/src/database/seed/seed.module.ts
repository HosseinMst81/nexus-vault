import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../../modules/games/entities/game.entity';
import { Achievement } from '../../modules/games/entities/achievement.entity';
import { Collection } from '../../modules/collections/entities/collection.entity';
import { CollectionItem } from '../../modules/collections/entities/collection-item.entity';
import { Review } from '../../modules/reviews/entities/review.entity';
import { DatabaseSeederService } from './database-seeder.service';

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
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService],
})
export class SeedModule {}
