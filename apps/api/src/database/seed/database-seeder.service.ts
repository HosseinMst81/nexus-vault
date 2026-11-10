import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../../modules/games/entities/game.entity';
import { Achievement } from '../../modules/games/entities/achievement.entity';
import { Collection } from '../../modules/collections/entities/collection.entity';
import { CollectionItem } from '../../modules/collections/entities/collection-item.entity';
import { Review } from '../../modules/reviews/entities/review.entity';
import { REAL_WORLD_GAMES } from './real-world-games.data';
import { REAL_WORLD_COLLECTIONS } from './real-world-collections.data';
import { ISeeder, SeedResult } from '../../common/interfaces/seeder.interface';

@Injectable()
export class DatabaseSeederService implements ISeeder {
  readonly seederName = 'DatabaseSeederService';
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,
    @InjectRepository(Achievement)
    private readonly achievementRepo: Repository<Achievement>,
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
    @InjectRepository(CollectionItem)
    private readonly itemRepo: Repository<CollectionItem>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async seed(fresh: boolean = false): Promise<SeedResult> {
    const startTime = Date.now();
    this.logger.log(`Starting database seed process (fresh: ${fresh})...`);

    if (fresh) {
      await this.truncateAll();
    } else {
      const existingCount = await this.gameRepo.count();
      if (existingCount > 0) {
        this.logger.log(
          `Database already populated with ${existingCount} games. Pass --fresh to reseed. Skipping...`,
        );
        return {
          gamesCount: existingCount,
          achievementsCount: await this.achievementRepo.count(),
          collectionsCount: await this.collectionRepo.count(),
          reviewsCount: await this.reviewRepo.count(),
          durationMs: Date.now() - startTime,
        };
      }
    }

    let gamesCreated = 0;
    let achievementsCreated = 0;
    let reviewsCreated = 0;
    let collectionsCreated = 0;

    const gameMap = new Map<string, Game>();

    // 1. Seed Games
    for (const gData of REAL_WORLD_GAMES) {
      const { achievements, reviews, lastPlayedDaysAgo, ...gameFields } = gData;

      const lastPlayedAt =
        lastPlayedDaysAgo !== undefined
          ? new Date(Date.now() - lastPlayedDaysAgo * 86400 * 1000)
          : null;

      const gameEntity = this.gameRepo.create({
        ...gameFields,
        lastPlayedAt,
      });

      const savedGame = await this.gameRepo.save(gameEntity);
      gameMap.set(savedGame.slug, savedGame);
      gamesCreated++;

      // Seed Achievements
      if (achievements && achievements.length > 0) {
        for (const ach of achievements) {
          const achEntity = this.achievementRepo.create({
            ...ach,
            gameId: savedGame.id,
            unlockedAt: ach.isUnlocked ? new Date() : null,
          });
          await this.achievementRepo.save(achEntity);
          achievementsCreated++;
        }
      }

      // Seed Reviews
      if (reviews && reviews.length > 0) {
        for (const rev of reviews) {
          const revEntity = this.reviewRepo.create({
            ...rev,
            gameId: savedGame.id,
            authorAvatar:
              rev.authorAvatar ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                rev.authorName,
              )}`,
          });
          await this.reviewRepo.save(revEntity);
          reviewsCreated++;
        }
      }
    }

    // 2. Seed Collections & Map Games
    for (const colData of REAL_WORLD_COLLECTIONS) {
      const { gameSlugs, ...colFields } = colData;
      const colEntity = this.collectionRepo.create(colFields);
      const savedCol = await this.collectionRepo.save(colEntity);
      collectionsCreated++;

      for (let order = 0; order < gameSlugs.length; order++) {
        const slug = gameSlugs[order];
        const game = gameMap.get(slug);
        if (game) {
          const item = this.itemRepo.create({
            collectionId: savedCol.id,
            gameId: game.id,
            sortOrder: order,
          });
          await this.itemRepo.save(item);
        }
      }
    }

    const durationMs = Date.now() - startTime;
    this.logger.log('====================================================');
    this.logger.log(`✅ Seed Complete in ${durationMs}ms`);
    this.logger.log(`🎮 Games Seeded: ${gamesCreated}`);
    this.logger.log(`🏆 Achievements Seeded: ${achievementsCreated}`);
    this.logger.log(`💬 Community Reviews Seeded: ${reviewsCreated}`);
    this.logger.log(`📁 Curated Collections Seeded: ${collectionsCreated}`);
    this.logger.log('====================================================');

    return {
      gamesCount: gamesCreated,
      achievementsCount: achievementsCreated,
      collectionsCount: collectionsCreated,
      reviewsCount: reviewsCreated,
      durationMs,
    };
  }

  private async truncateAll(): Promise<void> {
    this.logger.warn('Truncating existing database tables...');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.query(
        'TRUNCATE TABLE reviews, collection_items, achievements, collections, games CASCADE;',
      );
      this.logger.log('Tables truncated successfully.');
    } finally {
      await queryRunner.release();
    }
  }
}
