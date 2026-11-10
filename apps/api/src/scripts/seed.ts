import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { DatabaseSeederService } from '../database/seed/database-seeder.service';

/**
 * Senior-level Database Seeder CLI Script
 *
 * Usage:
 *   npm run seed          # Seeds database if empty
 *   npm run seed:fresh    # Drops existing records and reseeds full real-world dataset
 *
 * Flags:
 *   --fresh, -f           # Truncate all tables before seeding
 */
async function runSeed() {
  const logger = new Logger('DatabaseSeedScript');
  logger.log('Initializing standalone NestJS application context for seeding...');

  const isFresh =
    process.argv.includes('--fresh') ||
    process.argv.includes('-f') ||
    process.env.SEED_FRESH === 'true';

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  try {
    const seeder = app.get(DatabaseSeederService);
    const result = await seeder.seed(isFresh);

    logger.log(`Seeding executed successfully in ${result.durationMs}ms.`);
    await app.close();
    process.exit(0);
  } catch (error) {
    logger.error('Critical failure during database seeding:', error);
    await app.close();
    process.exit(1);
  }
}

runSeed();
