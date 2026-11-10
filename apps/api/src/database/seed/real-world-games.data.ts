import { GameStatus } from '../../modules/games/entities/game.entity';

export interface SeedAchievementData {
  title: string;
  description: string;
  rarityPercentage: number;
  points: number;
  isUnlocked: boolean;
}

export interface SeedReviewData {
  authorName: string;
  authorAvatar?: string;
  rating: number;
  recommended: boolean;
  title: string;
  content: string;
  hoursPlayed: number;
  helpfulVotes: number;
  pros: string[];
  cons: string[];
}

export interface SeedGameData {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverUrl: string;
  bannerUrl: string;
  trailerUrl: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  price: number;
  metacriticScore: number;
  userScore: number;
  playtimeMinutes: number;
  lastPlayedDaysAgo?: number;
  status: GameStatus;
  isFavorite: boolean;
  platforms: string[];
  genres: string[];
  tags: string[];
  installSizeGb: number;
  systemRequirements: {
    minimum: { os: string; cpu: string; ram: string; gpu: string; storage: string };
    recommended: { os: string; cpu: string; ram: string; gpu: string; storage: string };
  };
  screenshots: string[];
  dlcs: Array<{ id: string; title: string; price: number; releaseDate: string; installed: boolean }>;
  achievements: SeedAchievementData[];
  reviews: SeedReviewData[];
}

export const REAL_WORLD_GAMES: SeedGameData[] = [
  {
    title: 'Elden Ring: Shadow of the Erdtree',
    slug: 'elden-ring',
    shortDescription:
      'The definitive open-world dark fantasy action RPG by Hidetaka Miyazaki and George R. R. Martin.',
    description:
      'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. In the Land of Shadow, Miquella awaits the arrival of his promised Lord. A vast seamless world replete with towering dungeons, lethal demigods, and unprecedented tactical freedom.',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    releaseDate: '2022-02-25',
    price: 59.99,
    metacriticScore: 96,
    userScore: 9.3,
    playtimeMinutes: 8940,
    lastPlayedDaysAgo: 3,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Open World', 'Souls-like', 'Action RPG', 'Dark Fantasy'],
    tags: ['Open World', 'Souls-like', 'Difficult', 'Dark Fantasy', 'Masterpiece', 'Singleplayer'],
    installSizeGb: 60.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
        ram: '12 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB',
        storage: '60 GB available space',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-8700K / AMD Ryzen 5 3600X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1070 8GB / AMD Radeon RX Vega 56 8GB',
        storage: '60 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'elden-sote',
        title: 'Shadow of the Erdtree Expansion',
        price: 39.99,
        releaseDate: '2024-06-21',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'Elden Lord',
        description: 'Achieved the Elden Lord ending and repaired the Golden Order.',
        rarityPercentage: 27.8,
        points: 100,
        isUnlocked: true,
      },
      {
        title: 'Age of the Stars',
        description: 'Achieved the Age of the Stars ending alongside Lunar Princess Ranni.',
        rarityPercentage: 29.4,
        points: 100,
        isUnlocked: true,
      },
      {
        title: 'Shardbearer Malenia',
        description: 'Defeated Malenia, Blade of Miquella, at the roots of the Haligtree.',
        rarityPercentage: 34.2,
        points: 80,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'SunbroArtorias',
        rating: 5,
        recommended: true,
        title: 'A Generational Masterpiece',
        content:
          'FromSoftware delivered the most rewarding open world ever conceived. Every horizon leads to genuine discovery and harrowing challenges.',
        hoursPlayed: 148,
        helpfulVotes: 94,
        pros: ['Flawless art direction', 'Unrivaled combat depth', 'Endless build variety'],
        cons: ['Late-game damage spikes'],
      },
    ],
  },
  {
    title: 'Baldur’s Gate 3',
    slug: 'baldurs-gate-3',
    shortDescription:
      'Generational CRPG set in the D&D Forgotten Realms with unprecedented player autonomy and turn-based tactical combat.',
    description:
      'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities awaken inside you, drawn from a mind flayer parasite planted in your brain. Turn darkness against itself, or embrace corruption.',
    coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    releaseDate: '2023-08-03',
    price: 59.99,
    metacriticScore: 96,
    userScore: 9.7,
    playtimeMinutes: 7200,
    lastPlayedDaysAgo: 1,
    status: GameStatus.PLAYING,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['CRPG', 'Turn-Based RPG', 'Fantasy', 'Story Rich'],
    tags: ['Choices Matter', 'D&D', 'Co-op', 'Story Rich', 'Masterpiece', 'CRPG', 'Multiplayer'],
    installSizeGb: 122.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-4690 / AMD FX 8350',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GeForce GTX 970 / AMD Radeon RX 480 4GB',
        storage: '150 GB available space',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 2060 Super / AMD Radeon RX 5700 XT 8GB',
        storage: '150 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'bg3-deluxe',
        title: 'Digital Deluxe Upgrade & Bard Song Pack',
        price: 9.99,
        releaseDate: '2023-08-03',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'Descent From Avernus',
        description: 'Escape the nautiloid and survive crashing into the Sword Coast.',
        rarityPercentage: 88.5,
        points: 20,
        isUnlocked: true,
      },
      {
        title: 'Critical Success',
        description: 'Roll a Natural 20 on a high-stakes conversation DC check.',
        rarityPercentage: 74.2,
        points: 30,
        isUnlocked: true,
      },
      {
        title: 'Honor Mode Conqueror',
        description: 'Complete the entire campaign in single-save Honor Mode without dying.',
        rarityPercentage: 3.1,
        points: 150,
        isUnlocked: false,
      },
    ],
    reviews: [
      {
        authorName: 'ShadowheartFanatic',
        rating: 5,
        recommended: true,
        title: 'Peak RPG Craftsmanship',
        content:
          'Larian redefined narrative branching. Every choice cascades into meaningful world reactions. The voice acting is unmatched in gaming history.',
        hoursPlayed: 120,
        helpfulVotes: 87,
        pros: ['Infinite replayability', 'Brilliant character writing', 'Tactical combat depth'],
        cons: ['Act 3 performance in dense city streets'],
      },
    ],
  },
  {
    title: 'Cyberpunk 2077: Phantom Liberty',
    slug: 'cyberpunk-2077',
    shortDescription:
      'Open-world action RPG set in Night City. Take on spy-thriller espionage in the walled district of Dogtown.',
    description:
      'Cyberpunk 2077 is an open-world action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Phantom Liberty introduces a gripping spy-thriller expansion with Solomon Reed.',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-futuristic-robot-41584-large.mp4',
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT',
    releaseDate: '2020-12-10',
    price: 59.99,
    metacriticScore: 89,
    userScore: 9.1,
    playtimeMinutes: 4850,
    lastPlayedDaysAgo: 5,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Action RPG', 'Open World', 'Cyberpunk', 'Sci-Fi'],
    tags: ['Cyberpunk', 'Ray Tracing', 'Story Rich', 'Open World', 'FPS', 'Singleplayer'],
    installSizeGb: 78.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i7-6700 / AMD Ryzen 5 1600',
        ram: '12 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580',
        storage: '70 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 7800X3D',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 3080 / AMD Radeon RX 6800 XT',
        storage: '70 GB NVMe SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'cp2077-pl',
        title: 'Phantom Liberty Spy-Thriller Expansion',
        price: 29.99,
        releaseDate: '2023-09-26',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'The Sun',
        description: 'Become a legend of the Afterlife and conquer the Crystal Palace.',
        rarityPercentage: 18.2,
        points: 60,
        isUnlocked: true,
      },
      {
        title: 'All The President’s Men',
        description: 'Rescue President Rosalind Myers during the Dogtown crash.',
        rarityPercentage: 42.1,
        points: 40,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'V_Silverhand',
        rating: 5,
        recommended: true,
        title: 'Redemption of Night City',
        content:
          'With update 2.0 and Phantom Liberty, Cyberpunk 2077 became one of the greatest sci-fi shooters of all time. Path Tracing visuals are unmatched.',
        hoursPlayed: 81,
        helpfulVotes: 62,
        pros: ['Incredible gunplay and cyberware', 'Photorealistic visuals', 'Heartbreaking narrative'],
        cons: ['Hardware intensive on ultra settings'],
      },
    ],
  },
  {
    title: 'Red Dead Redemption 2',
    slug: 'red-dead-redemption-2',
    shortDescription:
      'America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run across the rugged heartland of America.',
    description:
      'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age. The most immersive frontier simulation ever created.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: '2018-10-26',
    price: 59.99,
    metacriticScore: 97,
    userScore: 9.8,
    playtimeMinutes: 9800,
    lastPlayedDaysAgo: 10,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Open World', 'Action-Adventure', 'Western', 'Story Rich'],
    tags: ['Masterpiece', 'Story Rich', 'Open World', 'Western', 'Atmospheric', 'Singleplayer'],
    installSizeGb: 120.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        cpu: 'Intel Core i5-2500K / AMD FX-6300',
        ram: '8 GB RAM',
        gpu: 'Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB',
        storage: '150 GB available space',
      },
      recommended: {
        os: 'Windows 11',
        cpu: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
        ram: '12 GB RAM',
        gpu: 'Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB',
        storage: '150 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'Redemption',
        description: 'Complete the story mission Red Dead Redemption.',
        rarityPercentage: 32.1,
        points: 100,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'ArthurMorganLegacy',
        rating: 5,
        recommended: true,
        title: 'A Watershed Moment in Interactive Storytelling',
        content:
          'Arthur Morgan is the most fully realized protagonist in video game history. The attention to physics, wildlife ecology, and lighting is timeless.',
        hoursPlayed: 163,
        helpfulVotes: 110,
        pros: ['Flawless emotional narrative', 'Living, breathing ecosystem', 'Soundtrack of the decade'],
        cons: ['Deliberate movement speed takes getting used to'],
      },
    ],
  },
  {
    title: 'The Witcher 3: Wild Hunt - Complete Edition',
    slug: 'the-witcher-3',
    shortDescription:
      'Geralt of Rivia tracks down Ciri across a war-torn Continent in one of the most celebrated RPGs in gaming history.',
    description:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT',
    releaseDate: '2015-05-18',
    price: 49.99,
    metacriticScore: 94,
    userScore: 9.6,
    playtimeMinutes: 8400,
    lastPlayedDaysAgo: 14,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
    genres: ['Open World', 'Action RPG', 'Fantasy', 'Story Rich'],
    tags: ['Masterpiece', 'Story Rich', 'Open World', 'Fantasy', 'Choices Matter', 'Singleplayer'],
    installSizeGb: 50.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-2500K / AMD Phenom II X4 940',
        ram: '6 GB RAM',
        gpu: 'Nvidia GeForce GTX 660 / AMD Radeon HD 7870',
        storage: '50 GB available space',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-3770 / AMD FX-8350',
        ram: '16 GB RAM',
        gpu: 'Nvidia GeForce RTX 3070 / AMD Radeon RX 6700 XT',
        storage: '50 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'w3-hos',
        title: 'Hearts of Stone Expansion',
        price: 9.99,
        releaseDate: '2015-10-13',
        installed: true,
      },
      {
        id: 'w3-baw',
        title: 'Blood and Wine Expansion',
        price: 19.99,
        releaseDate: '2016-05-31',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'Passed the Trial',
        description: 'Complete the game on any difficulty.',
        rarityPercentage: 35.8,
        points: 50,
        isUnlocked: true,
      },
      {
        title: 'Card Collector',
        description: 'Acquire all Gwent cards available in the base version of the game.',
        rarityPercentage: 7.9,
        points: 80,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'WhiteWolf12',
        rating: 5,
        recommended: true,
        title: 'The Benchmark for Side Quests',
        content:
          'Even small monster contracts turn into profound moral dilemmas. Hearts of Stone and Blood and Wine set the standard for DLC expansions.',
        hoursPlayed: 140,
        helpfulVotes: 73,
        pros: ['Bloody Baron questline is legendary', 'Gwent mini-game', 'Toussaint is gorgeous'],
        cons: ['Clunky horse navigation at times'],
      },
    ],
  },
  {
    title: 'Hades II',
    slug: 'hades-2',
    shortDescription:
      'Battle beyond the Underworld using dark sorcery to confront the Titan of Time in Supergiant’s spellbinding rogue-like.',
    description:
      'As Melinoë, the immortal Princess of the Underworld, explore a mythic world, vanquishing the forces of the Titan of Time with the full might of Olympus behind you in an ever-unfolding story filled with memorable characters.',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    releaseDate: '2024-05-06',
    price: 29.99,
    metacriticScore: 92,
    userScore: 9.4,
    playtimeMinutes: 3420,
    lastPlayedDaysAgo: 1,
    status: GameStatus.PLAYING,
    isFavorite: true,
    platforms: ['PC', 'Nintendo Switch'],
    genres: ['Roguelike', 'Action', 'Indie', 'Hack and Slash'],
    tags: ['Roguelike', 'Mythology', 'Fast-Paced', 'Great Soundtrack', 'Replay Value'],
    installSizeGb: 11.2,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Dual Core 2.4 GHz',
        ram: '8 GB RAM',
        gpu: 'GeForce GTX 950 / Radeon R7 360',
        storage: '15 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Quad Core 3.0 GHz',
        ram: '16 GB RAM',
        gpu: 'GeForce GTX 1060 / Radeon RX 580',
        storage: '15 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'Witchcraft Master',
        description: 'Awaken the Altar of the Arcana to maximum resonance.',
        rarityPercentage: 42.0,
        points: 35,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'MelinoeCoven',
        rating: 5,
        recommended: true,
        title: 'Supergiant Strikes Gold Again',
        content:
          'The witchy combat loop with channeling mana feels distinct from Zagreus. Darren Korb’s soundtrack is pure fire.',
        hoursPlayed: 57,
        helpfulVotes: 44,
        pros: ['Deep Arcana deckbuilding', 'Flawless art and voice work', 'Satisfying weapon aspects'],
        cons: ['Still in active Early Access roadmap'],
      },
    ],
  },
  {
    title: 'Black Myth: Wukong',
    slug: 'black-myth-wukong',
    shortDescription:
      'Action RPG rooted in Chinese mythology. Set forth as the Destined One across the legends of Journey to the West.',
    description:
      'Confront challenging mythical foes with an expansive staff combat system, shapeshifting transformations, and mystic spells in Unreal Engine 5 splendor.',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Game Science',
    publisher: 'Game Science',
    releaseDate: '2024-08-20',
    price: 59.99,
    metacriticScore: 82,
    userScore: 9.5,
    playtimeMinutes: 2450,
    lastPlayedDaysAgo: 4,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5'],
    genres: ['Action RPG', 'Mythology', 'Souls-like', 'Adventure'],
    tags: ['Mythology', 'Martial Arts', 'Boss Rush', 'Unreal Engine 5', 'Difficult'],
    installSizeGb: 130.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
        storage: '130 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-9700 / AMD Ryzen 5 5500',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700 XT',
        storage: '130 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'Staff of the Destined One',
        description: 'Master all three staff stances and unlock the 4th Focus point.',
        rarityPercentage: 22.5,
        points: 50,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'SunWukongAdherent',
        rating: 5,
        recommended: true,
        title: 'Stunning Visual Masterpiece and Boss Encounters',
        content:
          'Over 80 unique boss battles with distinct movesets. The transformations make every encounter feel like an epic mythical clash.',
        hoursPlayed: 41,
        helpfulVotes: 51,
        pros: ['Incredible boss diversity', 'Flawless Unreal Engine 5 graphics', 'Deep lore'],
        cons: ['Invisible walls in early chapters'],
      },
    ],
  },
  {
    title: 'Helldivers 2',
    slug: 'helldivers-2',
    shortDescription:
      'Join the galaxy’s last line of offense. Fast, frantic, and ferocious third-person co-op shooter against alien hordes.',
    description:
      'Freedom. Peace. Managed Democracy. Enlist in the Helldivers and fight for Super Earth in a chaotic third-person shooter featuring stratagem call-ins, friendly fire mayhem, and global galactic war campaigns.',
    coverUrl: 'https://images.unsplash.com/photo-1552824722-ddab137b4a6d?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-futuristic-robot-41584-large.mp4',
    developer: 'Arrowhead Game Studios',
    publisher: 'PlayStation Publishing LLC',
    releaseDate: '2024-02-08',
    price: 39.99,
    metacriticScore: 82,
    userScore: 8.7,
    playtimeMinutes: 4200,
    lastPlayedDaysAgo: 2,
    status: GameStatus.INSTALLED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5'],
    genres: ['Shooter', 'Co-op', 'Action', 'Sci-Fi'],
    tags: ['Co-op', 'Third-Person Shooter', 'Multiplayer', 'Satire', 'Sci-Fi'],
    installSizeGb: 72.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i7-4790K / AMD Ryzen 5 1500X',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1050 Ti 4GB',
        storage: '100 GB',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-9700K / AMD Ryzen 7 3700X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 6600 XT',
        storage: '100 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1552824722-ddab137b4a6d?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'For Super Earth!',
        description: 'Extract successfully from a Level 9 Helldive operation.',
        rarityPercentage: 14.5,
        points: 50,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'PatriotCommander',
        rating: 5,
        recommended: true,
        title: 'Sweet Liberty, What A Game!',
        content:
          'Pure co-op joy. Dropping a 500kg bomb on a Bile Titan while your squad scurries for extraction is peak multiplayer gaming.',
        hoursPlayed: 70,
        helpfulVotes: 59,
        pros: ['Peak co-op adrenaline', 'Hilarious satire', 'Constant galactic war updates'],
        cons: ['Occasional disconnects'],
      },
    ],
  },
  {
    title: 'Alan Wake 2',
    slug: 'alan-wake-2',
    shortDescription:
      'Mind-bending psychological survival horror with two playable protagonists unraveling a nightmare in the Pacific Northwest.',
    description:
      'Saga Anderson arrives to investigate ritualistic murders in Bright Falls. Alan Wake pens a dark story to rewrite the reality around him. A showcase of narrative bravura, live-action integration, and cutting-edge lighting.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Remedy Entertainment',
    publisher: 'Epic Games Publishing',
    releaseDate: '2023-10-27',
    price: 49.99,
    metacriticScore: 89,
    userScore: 9.1,
    playtimeMinutes: 1650,
    lastPlayedDaysAgo: 7,
    status: GameStatus.COMPLETED,
    isFavorite: false,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Survival Horror', 'Psychological', 'Action', 'Mystery'],
    tags: ['Atmospheric', 'Story Rich', 'Horror', 'Cinematic', 'Ray Tracing'],
    installSizeGb: 86.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10/11 64-bit',
        cpu: 'Intel i5-7600K or AMD equivalent',
        ram: '16 GB RAM',
        gpu: 'GeForce RTX 2060 / Radeon RX 6600',
        storage: '90 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel i7-10700K / Ryzen 7 3700X',
        ram: '16 GB RAM',
        gpu: 'GeForce RTX 3070 / Radeon RX 6700 XT',
        storage: '90 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'aw2-nightsprings',
        title: 'Night Springs Expansion',
        price: 19.99,
        releaseDate: '2024-06-08',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'Return to the Lake',
        description: 'Solve the case in Bright Falls and enter the Overlap.',
        rarityPercentage: 38.0,
        points: 30,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'OldGodsOfAsgard',
        rating: 5,
        recommended: true,
        title: 'Herald of Darkness is Unforgettable',
        content:
          'The musical sequence alone makes this game of the generation. Remedy created a surreal, disturbing, and profoundly inventive horror masterpiece.',
        hoursPlayed: 28,
        helpfulVotes: 39,
        pros: ['Herald of Darkness musical chapter', 'Stunning photorealistic art', 'Mind Palace mechanic'],
        cons: ['Linear pacing in certain investigations'],
      },
    ],
  },
  {
    title: 'Hollow Knight: Silksong',
    slug: 'hollow-knight-silksong',
    shortDescription:
      'Ascend to the peak of a haunted kingdom ruled by silk and song as Hornet in the sequel to the award-winning Metroidvania.',
    description:
      'Play as Hornet, princess-protector of Hallownest, captured and brought to the unfamiliar realm of Pharloom. Battle acrobatic foes, craft lethal traps, and unravel ancient mysteries in an expansive 2D hand-drawn kingdom.',
    coverUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    releaseDate: '2025-06-15',
    price: 24.99,
    metacriticScore: 95,
    userScore: 9.8,
    playtimeMinutes: 0,
    lastPlayedDaysAgo: undefined,
    status: GameStatus.WISHLIST,
    isFavorite: true,
    platforms: ['PC', 'Nintendo Switch', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Metroidvania', 'Souls-like', 'Indie', 'Platformer'],
    tags: ['Metroidvania', 'Difficult', '2D', 'Atmospheric', 'Great Soundtrack', 'Hyped'],
    installSizeGb: 9.5,
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        cpu: 'Intel Core i3',
        ram: '4 GB RAM',
        gpu: 'GeForce 9800GTX',
        storage: '9 GB available space',
      },
      recommended: {
        os: 'Windows 11',
        cpu: 'Intel Core i5',
        ram: '8 GB RAM',
        gpu: 'GeForce GTX 1050',
        storage: '9 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [],
    reviews: [],
  },
  {
    title: 'Final Fantasy VII Rebirth',
    slug: 'ff7-rebirth',
    shortDescription:
      'Cloud and comrades embark on an uncharted journey across the vast and vibrant planet outside Midgar pursuing Sephiroth.',
    description:
      'Sprint across grassy plains on Chocobos, delve into lush biodomes, challenge locals to Queen’s Blood card duels, and execute dynamic synergy attacks with party members in this ambitious sequel.',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-futuristic-robot-41584-large.mp4',
    developer: 'Square Enix',
    publisher: 'Square Enix',
    releaseDate: '2024-02-29',
    price: 69.99,
    metacriticScore: 92,
    userScore: 9.0,
    playtimeMinutes: 5200,
    lastPlayedDaysAgo: 8,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PlayStation 5', 'PC'],
    genres: ['JRPG', 'Action RPG', 'Fantasy', 'Adventure'],
    tags: ['JRPG', 'Party-Based', 'Story Rich', 'Masterpiece', 'Cinematic'],
    installSizeGb: 145.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 11',
        cpu: 'Core i7-10700K',
        ram: '16 GB',
        gpu: 'RTX 3060',
        storage: '150 GB SSD',
      },
      recommended: {
        os: 'Windows 11',
        cpu: 'Core i7-13700K',
        ram: '32 GB',
        gpu: 'RTX 4080',
        storage: '150 GB NVMe SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'Queen’s Blood Grandmaster',
        description: 'Defeat the Shadow Queen and claim the ultimate deck.',
        rarityPercentage: 16.3,
        points: 60,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'AerithProtectionSquad',
        rating: 5,
        recommended: true,
        title: 'The Golden Saucer is Heaven',
        content:
          'Combat synergy skills elevate this high above standard action JRPGs. The emotional weight of the ending hits like a freight train.',
        hoursPlayed: 86,
        helpfulVotes: 48,
        pros: ['Queen’s Blood is addictive', 'Phenomenal party synergy combat', 'Lush open regions'],
        cons: ['A few too many mini-games in Costa del Sol'],
      },
    ],
  },
  {
    title: 'Doom Eternal',
    slug: 'doom-eternal',
    shortDescription:
      'Hell’s armies have invaded Earth. Conquer demons across dimensions in the ultimate high-speed push-forward FPS.',
    description:
      'Armed with a shoulder-mounted flamethrower, retractable wrist blade, and upgraded guns, navigate intense resource-juggling combat arenas propelled by Mick Gordon’s industrial metal soundtrack.',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'id Software',
    publisher: 'Bethesda Softworks',
    releaseDate: '2020-03-20',
    price: 39.99,
    metacriticScore: 88,
    userScore: 8.9,
    playtimeMinutes: 2100,
    lastPlayedDaysAgo: 12,
    status: GameStatus.BACKLOG,
    isFavorite: false,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
    genres: ['FPS', 'Action', 'Gore', 'Fast-Paced'],
    tags: ['Fast-Paced', 'Heavy Metal', 'Demons', 'Gore', 'FPS', 'Singleplayer'],
    installSizeGb: 50.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5 @ 3.3 GHz / AMD Ryzen 3 @ 3.1 GHz',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1050Ti 4GB',
        storage: '50 GB',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-6700K / AMD Ryzen 7 1800X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1080 / AMD Radeon RX Vega 56',
        storage: '50 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'doom-ancient-gods-1',
        title: 'The Ancient Gods - Part One',
        price: 19.99,
        releaseDate: '2020-10-20',
        installed: true,
      },
    ],
    achievements: [],
    reviews: [],
  },
  {
    title: 'Armored Core VI: Fires of Rubicon',
    slug: 'armored-core-vi',
    shortDescription:
      'Omnidirectional high-speed mech combat on the desolate frontier planet Rubicon 3 by FromSoftware.',
    description:
      'Assemble and pilot your custom mech with 3D maneuverability, dynamic weapon combinations, and punishing boss fights against massive military installations.',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-futuristic-robot-41584-large.mp4',
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    releaseDate: '2023-08-25',
    price: 59.99,
    metacriticScore: 86,
    userScore: 9.0,
    playtimeMinutes: 2800,
    lastPlayedDaysAgo: 6,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Mecha', 'Action', 'Sci-Fi', 'Difficult'],
    tags: ['Mecha', 'Customization', 'Fast-Paced', 'Sci-Fi', 'Difficult'],
    installSizeGb: 60.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        cpu: 'Intel Core i7-4790K / AMD Ryzen 5 2600',
        ram: '12 GB RAM',
        gpu: 'GeForce GTX 1650 4GB / Radeon RX 480 4GB',
        storage: '60 GB',
      },
      recommended: {
        os: 'Windows 11',
        cpu: 'Intel Core i7-7700K / AMD Ryzen 7 3800X',
        ram: '16 GB RAM',
        gpu: 'GeForce GTX 1060 6GB / Radeon RX 590 8GB',
        storage: '60 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'Fires of Raven',
        description: 'Reach the Fires of Raven conclusion.',
        rarityPercentage: 24.1,
        points: 80,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'RavenPilot621',
        rating: 5,
        recommended: true,
        title: 'The Pinnacle of Mech Combat',
        content:
          'Tinkering in the garage to counter specific boss mechanics is so satisfying. The verticality and thrust physics feel responsive and punchy.',
        hoursPlayed: 46,
        helpfulVotes: 37,
        pros: ['Infinite mech customization', 'Incredible boss encounters', 'High framerate stability'],
        cons: ['Story is mostly delivered through radio comms'],
      },
    ],
  },
  {
    title: 'Resident Evil 4 (Remake)',
    slug: 'resident-evil-4',
    shortDescription:
      'Survival is just the beginning. Leon S. Kennedy tracks the US President’s kidnapped daughter to a secluded European village.',
    description:
      'Rebuilt from the ground up with modernized gameplay, a reimagined storyline, and vivid detailed graphics powered by the RE Engine.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'Capcom',
    publisher: 'Capcom',
    releaseDate: '2023-03-24',
    price: 39.99,
    metacriticScore: 93,
    userScore: 9.4,
    playtimeMinutes: 1920,
    lastPlayedDaysAgo: 11,
    status: GameStatus.COMPLETED,
    isFavorite: false,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Survival Horror', 'Action', 'Zombies', 'Shooter'],
    tags: ['Zombies', 'Horror', 'Action', 'Third-Person Shooter', 'Atmospheric'],
    installSizeGb: 67.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'AMD Ryzen 3 1200 / Intel Core i5-7500',
        ram: '8 GB RAM',
        gpu: 'AMD Radeon RX 560 4GB / NVIDIA GeForce GTX 1050 Ti 4GB',
        storage: '70 GB',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'AMD Ryzen 5 3600 / Intel Core i7 8700',
        ram: '16 GB RAM',
        gpu: 'AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070',
        storage: '70 GB SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 're4-separate-ways',
        title: 'Separate Ways (Ada Wong Campaign)',
        price: 9.99,
        releaseDate: '2023-09-21',
        installed: true,
      },
    ],
    achievements: [],
    reviews: [],
  },
  {
    title: 'Chronos: Cyber Legacy',
    slug: 'chronos-cyber-legacy',
    shortDescription:
      'High-octane cyberpunk action RPG set in Neo-Kyoto 2099. Master cybernetic enhancements and pulse weaponry.',
    description:
      'Chronos: Cyber Legacy drops you into the neon-drenched dystopian streets of Neo-Kyoto 2099. Play as Ren, an ex-black-ops operative whose neural cortex holds the encryption keys to an AI revolution.',
    coverUrl: '/art/chronos.jpg',
    bannerUrl: '/art/chronos.jpg',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-futuristic-robot-41584-large.mp4',
    developer: 'Nexus Hyperlight Studios',
    publisher: 'Nexus Interactive',
    releaseDate: '2024-10-18',
    price: 69.99,
    metacriticScore: 94,
    userScore: 9.3,
    playtimeMinutes: 2840,
    lastPlayedDaysAgo: 0,
    status: GameStatus.PLAYING,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Action RPG', 'Sci-Fi', 'Cyberpunk', 'Hack and Slash'],
    tags: ['Cyberpunk', 'Ray Tracing', 'Story Rich', 'Atmospheric', 'Original Concept'],
    installSizeGb: 74.5,
    systemRequirements: {
      minimum: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i5-10400 / AMD Ryzen 5 3600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700',
        storage: '80 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-13700K / AMD Ryzen 7 7800X3D',
        ram: '32 GB RAM',
        gpu: 'NVIDIA GeForce RTX 4080 / AMD Radeon RX 7900 XTX',
        storage: '80 GB NVMe Gen4 SSD',
      },
    },
    screenshots: [
      '/art/chronos.jpg',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'dlc-syndicate',
        title: 'Underground Syndicate Protocol',
        price: 19.99,
        releaseDate: '2025-02-14',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'Neural Overclock',
        description: 'Execute a 25-hit fluid blade combo while bullet-time is active.',
        rarityPercentage: 18.2,
        points: 40,
        isUnlocked: true,
      },
      {
        title: 'City of Glass & Shadow',
        description: 'Discover all 12 hidden data caches in the Upper Spire district.',
        rarityPercentage: 8.7,
        points: 60,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'Kira "Glitch" Thorne',
        rating: 5,
        recommended: true,
        title: 'The Cyberpunk Action Game We Deserve',
        content:
          'The blade parry mechanics combined with vertical grapple maneuvers in Neo-Kyoto is peak adrenaline. Ray tracing performance is buttery smooth.',
        hoursPlayed: 54,
        helpfulVotes: 32,
        pros: ['Sublime combat system', 'Unmatched cyberpunk aesthetic', 'Deep progression trees'],
        cons: ['Camera clipping in tight alleyways'],
      },
    ],
  },
  {
    title: 'Eldritch Eclipse: Lord of Cinders',
    slug: 'eldritch-eclipse',
    shortDescription:
      'Dark fantasy souls-like set beneath a shattered apocalyptic blood moon. Ruthless combat and forgotten cosmic lore.',
    description:
      'Ascend through the crumbling citadel of Lothar where the heavens bleed and ancient primordial lords awaken. Eldritch Eclipse tests timing, stance-breaking parries, and eldritch sorceries in a seamless gothic open world.',
    coverUrl: '/art/eldritch.jpg',
    bannerUrl: '/art/eldritch.jpg',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fire-and-sparks-flying-in-a-dark-room-41618-large.mp4',
    developer: 'FromCinder Works',
    publisher: 'Bandai Vanguard',
    releaseDate: '2024-03-22',
    price: 59.99,
    metacriticScore: 96,
    userScore: 9.6,
    playtimeMinutes: 4920,
    lastPlayedDaysAgo: 1,
    status: GameStatus.COMPLETED,
    isFavorite: true,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    genres: ['Souls-like', 'Dark Fantasy', 'Action RPG', 'Difficult'],
    tags: ['Souls-like', 'Dark Fantasy', 'Atmospheric', 'Difficult', 'Lore-Rich', 'Masterpiece'],
    installSizeGb: 62.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
        ram: '12 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580',
        storage: '65 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 5 7600X',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6700 XT',
        storage: '65 GB SSD',
      },
    },
    screenshots: [
      '/art/eldritch.jpg',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [
      {
        id: 'dlc-cinder-abyss',
        title: 'The Crimson Abyss Expansion',
        price: 24.99,
        releaseDate: '2024-11-01',
        installed: true,
      },
    ],
    achievements: [
      {
        title: 'Slayer of the Blood Archon',
        description: 'Vanquish the Archon of Cinders without summoning spirits.',
        rarityPercentage: 11.4,
        points: 80,
        isUnlocked: true,
      },
      {
        title: 'Bearer of the Golden Flame',
        description: 'Reignite the celestial forge at the zenith of the Citadel.',
        rarityPercentage: 14.9,
        points: 50,
        isUnlocked: true,
      },
    ],
    reviews: [
      {
        authorName: 'LordOfCinders',
        rating: 5,
        recommended: true,
        title: 'Masterclass in Environmental Storytelling',
        content:
          'From the moment you step out onto the terrace overlooking the eclipse, you realize this is something special. Every boss demands full concentration.',
        hoursPlayed: 82,
        helpfulVotes: 58,
        pros: ['Rewarding difficulty', 'Stunning art direction', 'Epic orchestral score'],
        cons: ['Camera on giant boss encounters'],
      },
    ],
  },
  {
    title: 'Astral Odyssey: Deep Horizon',
    slug: 'astral-odyssey',
    shortDescription:
      'Interstellar exploration sandbox. Chart uncharted star systems and build orbital mega-structures.',
    description:
      'Chart seamless planetary landings on simulated atmospheric worlds, pilot modular deep-space explorers, extract dark matter minerals, and construct orbital space stations.',
    coverUrl: '/art/astral.jpg',
    bannerUrl: '/art/astral.jpg',
    trailerUrl: 'https://assets.mixkit.co/videos/preview/mixkit-space-travel-through-a-nebula-41662-large.mp4',
    developer: 'Vanguard Orbital Games',
    publisher: 'Starlight Interactive',
    releaseDate: '2024-07-12',
    price: 49.99,
    metacriticScore: 91,
    userScore: 8.9,
    playtimeMinutes: 1980,
    lastPlayedDaysAgo: 2,
    status: GameStatus.INSTALLED,
    isFavorite: false,
    platforms: ['PC', 'PlayStation 5'],
    genres: ['Space Sim', 'Open World', 'Sci-Fi', 'Exploration'],
    tags: ['Space', 'Sci-Fi', 'Sandbox', 'Exploration', 'Base Building', 'Multiplayer'],
    installSizeGb: 92.4,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-10600K',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce RTX 2070',
        storage: '100 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'AMD Ryzen 7 7800X3D',
        ram: '32 GB RAM',
        gpu: 'NVIDIA GeForce RTX 4070 Ti Super',
        storage: '100 GB NVMe SSD',
      },
    },
    screenshots: [
      '/art/astral.jpg',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop',
    ],
    dlcs: [],
    achievements: [
      {
        title: 'First Light Beyond Orion',
        description: 'Execute a hyperspace jump beyond known coordinates.',
        rarityPercentage: 35.0,
        points: 25,
        isUnlocked: true,
      },
    ],
    reviews: [],
  },
];
