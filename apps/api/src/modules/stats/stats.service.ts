import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameStatus } from '../games/entities/game.entity';
import { Achievement } from '../games/entities/achievement.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,
    @InjectRepository(Achievement)
    private readonly achievementRepo: Repository<Achievement>,
  ) {}

  async getLibraryStats() {
    const games = await this.gameRepo.find({
      relations: ['achievements'],
    });

    const totalGames = games.length;
    let totalPlaytimeMinutes = 0;
    let totalValue = 0;
    let totalStorageGb = 0;

    const statusCounts: Record<string, number> = {
      [GameStatus.INSTALLED]: 0,
      [GameStatus.PLAYING]: 0,
      [GameStatus.BACKLOG]: 0,
      [GameStatus.COMPLETED]: 0,
      [GameStatus.WISHLIST]: 0,
      [GameStatus.DROPPED]: 0,
    };

    const platformDistribution: Record<string, number> = {};
    const genreDistribution: Record<string, { count: number; hours: number }> = {};

    let totalAchievements = 0;
    let unlockedAchievements = 0;

    games.forEach((g) => {
      totalPlaytimeMinutes += g.playtimeMinutes || 0;
      totalValue += Number(g.price) || 0;
      totalStorageGb += Number(g.installSizeGb) || 0;

      if (g.status && statusCounts[g.status] !== undefined) {
        statusCounts[g.status]++;
      }

      // Platforms
      if (Array.isArray(g.platforms)) {
        g.platforms.forEach((p) => {
          platformDistribution[p] = (platformDistribution[p] || 0) + 1;
        });
      }

      // Genres
      if (Array.isArray(g.genres)) {
        g.genres.forEach((gen) => {
          if (!genreDistribution[gen]) {
            genreDistribution[gen] = { count: 0, hours: 0 };
          }
          genreDistribution[gen].count += 1;
          genreDistribution[gen].hours += Math.round((g.playtimeMinutes || 0) / 60);
        });
      }

      // Achievements
      if (Array.isArray(g.achievements)) {
        totalAchievements += g.achievements.length;
        unlockedAchievements += g.achievements.filter((a) => a.isUnlocked).length;
      }
    });

    const completedCount = statusCounts[GameStatus.COMPLETED] || 0;
    const completionRate =
      totalGames > 0 ? Math.round((completedCount / totalGames) * 100) : 0;

    // Top played games
    const topPlayed = [...games]
      .sort((a, b) => (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0))
      .slice(0, 5)
      .map((g) => ({
        id: g.id,
        title: g.title,
        coverUrl: g.coverUrl,
        bannerUrl: g.bannerUrl,
        playtimeMinutes: g.playtimeMinutes,
        playtimeHours: Number(((g.playtimeMinutes || 0) / 60).toFixed(1)),
        status: g.status,
      }));

    // Top genres by playtime
    const topGenres = Object.entries(genreDistribution)
      .map(([genre, data]) => ({
        genre,
        count: data.count,
        hours: data.hours,
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 6);

    return {
      summary: {
        totalGames,
        totalPlaytimeMinutes,
        totalPlaytimeHours: Math.round(totalPlaytimeMinutes / 60),
        completionRate,
        totalEstimatedValueUsd: Math.round(totalValue),
        totalStorageGb: Math.round(totalStorageGb),
        achievements: {
          total: totalAchievements,
          unlocked: unlockedAchievements,
          percentage:
            totalAchievements > 0
              ? Math.round((unlockedAchievements / totalAchievements) * 100)
              : 0,
        },
      },
      statusDistribution: statusCounts,
      platformDistribution,
      topGenres,
      topPlayed,
    };
  }
}
