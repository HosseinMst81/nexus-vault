import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from './modules/games/games.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { StatsModule } from './modules/stats/stats.module';
import { HealthModule } from './modules/health/health.module';
import { SeedModule } from './modules/seed/seed.module';
import { Game } from './modules/games/entities/game.entity';
import { Achievement } from './modules/games/entities/achievement.entity';
import { Collection } from './modules/collections/entities/collection.entity';
import { CollectionItem } from './modules/collections/entities/collection-item.entity';
import { Review } from './modules/reviews/entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', '127.0.0.1'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        username: config.get<string>('DB_USER', 'nexus'),
        password: config.get<string>('DB_PASSWORD', 'nexuspass'),
        database: config.get<string>('DB_NAME', 'nexus_vault'),
        entities: [Game, Achievement, Collection, CollectionItem, Review],
        synchronize: true,
        logging: false,
      }),
    }),
    GamesModule,
    CollectionsModule,
    ReviewsModule,
    StatsModule,
    HealthModule,
    SeedModule,
  ],
})
export class AppModule {}
