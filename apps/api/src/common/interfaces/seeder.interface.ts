/**
 * Interface Segregation Principle (ISP):
 * Standard contract for modular database seeders.
 */
export interface ISeeder {
  readonly seederName: string;
  seed(fresh?: boolean): Promise<SeedResult>;
}

export interface SeedResult {
  gamesCount: number;
  achievementsCount: number;
  collectionsCount: number;
  reviewsCount: number;
  durationMs: number;
}
