export type GameStatus =
  | 'INSTALLED'
  | 'PLAYING'
  | 'BACKLOG'
  | 'COMPLETED'
  | 'WISHLIST'
  | 'DROPPED';

export interface SystemRequirements {
  minimum?: {
    os?: string;
    cpu?: string;
    ram?: string;
    gpu?: string;
    storage?: string;
  };
  recommended?: {
    os?: string;
    cpu?: string;
    ram?: string;
    gpu?: string;
    storage?: string;
  };
}

export interface DLCItem {
  id: string;
  title: string;
  price: number;
  releaseDate: string;
  installed: boolean;
}

export interface Achievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  iconUrl?: string;
  isUnlocked: boolean;
  unlockedAt?: string | null;
  rarityPercentage: number;
  points: number;
}

export interface Review {
  id: string;
  gameId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  recommended: boolean;
  title: string;
  content: string;
  hoursPlayed: number;
  helpfulVotes: number;
  pros?: string[];
  cons?: string[];
  createdAt: string;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  gameId: string;
  sortOrder: number;
  addedAt: string;
  game?: Game;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverUrl?: string;
  colorGradient?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  items?: CollectionItem[];
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverUrl: string;
  bannerUrl: string;
  trailerUrl?: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  price: number;
  metacriticScore: number;
  userScore: number;
  playtimeMinutes: number;
  lastPlayedAt?: string | null;
  status: GameStatus;
  isFavorite: boolean;
  platforms: string[];
  genres: string[];
  tags: string[];
  installSizeGb: number;
  systemRequirements?: SystemRequirements;
  screenshots?: string[];
  dlcs?: DLCItem[];
  achievements?: Achievement[];
  reviews?: Review[];
  collectionItems?: CollectionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterParams {
  search?: string;
  genre?: string;
  platform?: string;
  status?: GameStatus | 'ALL';
  isFavorite?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface LibraryStats {
  summary: {
    totalGames: number;
    totalPlaytimeMinutes: number;
    totalPlaytimeHours: number;
    completionRate: number;
    totalEstimatedValueUsd: number;
    totalStorageGb: number;
    achievements: {
      total: number;
      unlocked: number;
      percentage: number;
    };
  };
  statusDistribution: Record<GameStatus, number>;
  platformDistribution: Record<string, number>;
  topGenres: Array<{
    genre: string;
    count: number;
    hours: number;
  }>;
  topPlayed: Array<{
    id: string;
    title: string;
    coverUrl: string;
    bannerUrl: string;
    playtimeMinutes: number;
    playtimeHours: number;
    status: GameStatus;
  }>;
}
