import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameStatus } from '../games/entities/game.entity';
import { Achievement } from '../games/entities/achievement.entity';
import { Collection } from '../collections/entities/collection.entity';
import { CollectionItem } from '../collections/entities/collection-item.entity';
import { Review } from '../reviews/entities/review.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
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

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.gameRepo.count();
    if (count > 0) {
      this.logger.log(`Database already seeded with ${count} games. Skipping...`);
      return;
    }

    this.logger.log('Seeding initial video game library data...');

    const initialGames = [
      {
        title: 'Chronos: Cyber Legacy',
        slug: 'chronos-cyber-legacy',
        shortDescription:
          'High-octane cyberpunk action RPG set in Neo-Kyoto 2099. Master cybernetic enhancements and pulse weaponry.',
        description:
          'Chronos: Cyber Legacy drops you into the neon-drenched dystopian streets of Neo-Kyoto 2099. Play as Ren, an ex-black-ops agent whose cerebral implants hold the encryption keys to an rogue AI revolution. Featuring lightning-fast directional melee combat, ray-traced reflections, customizable cyberware rigs, and deep moral branching choices across 60+ hours of gameplay.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 5),
        status: GameStatus.PLAYING,
        isFavorite: true,
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
        genres: ['Action RPG', 'Sci-Fi', 'Cyberpunk', 'Hack and Slash'],
        tags: ['Cyberpunk', 'Ray Tracing', 'Story Rich', 'Atmospheric', 'Character Customization'],
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
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
        ],
        dlcs: [
          {
            id: 'dlc-1',
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
          {
            title: 'Ghost in the Lattice',
            description: 'Complete the main infiltration without raising an alarm.',
            rarityPercentage: 4.1,
            points: 100,
            isUnlocked: false,
          },
        ],
      },
      {
        title: 'Eldritch Eclipse: Lord of Cinders',
        slug: 'eldritch-eclipse',
        shortDescription:
          'Dark fantasy souls-like set beneath a shattered apocalyptic blood moon. Ruthless combat and forgotten lore.',
        description:
          'Ascend through the crumbling citadel of Lothar where the heavens bleed and ancient primordial lords sleep no more. Eldritch Eclipse tests mastery of timing, stance-breaking parries, and eldritch sorceries. Journey through interconnected gothic crypts, sunken cathedrals, and towering spires in a seamless dark fantasy open world.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 18),
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
            gpu: 'NVIDIA GeForce GTX 1060 (3GB) / AMD Radeon RX 580',
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
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        ],
        dlcs: [
          {
            id: 'dlc-cinder',
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
          {
            title: 'All Runic Relics',
            description: 'Collect all 28 sacred talismans scattered across the realm.',
            rarityPercentage: 3.2,
            points: 100,
            isUnlocked: true,
          },
        ],
      },
      {
        title: 'Astral Odyssey: Deep Horizon',
        slug: 'astral-odyssey',
        shortDescription:
          'Next-generation interstellar exploration sandbox. Navigate uncharted star systems and build orbital mega-structures.',
        description:
          'Astral Odyssey sets a new standard for astronomical exploration. Chart seamless planetary landings onProcedurally simulated atmospheric worlds, pilot modular deep-space explorers, extract exotic dark matter minerals, engage in tactical fleet dogfights, and construct orbital space stations with players worldwide.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 48),
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
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
        ],
        achievements: [
          {
            title: 'First Light Beyond Orion',
            description: 'Execute a hyperspace jump beyond known jump gate coordinates.',
            rarityPercentage: 35.0,
            points: 25,
            isUnlocked: true,
          },
          {
            title: 'Orbital Architect',
            description: 'Construct a self-sustaining Tier 4 orbital research habitat.',
            rarityPercentage: 12.1,
            points: 75,
            isUnlocked: false,
          },
        ],
      },
      {
        title: 'Baldur’s Gate 3',
        slug: 'baldurs-gate-3',
        shortDescription:
          'The definitive generational RPG set in the D&D universe. Unparalleled player freedom, romance, and tactical turn-based combat.',
        description:
          'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 2),
        status: GameStatus.PLAYING,
        isFavorite: true,
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
        genres: ['CRPG', 'Turn-Based RPG', 'Fantasy', 'Story Rich'],
        tags: ['Choices Matter', 'D&D', 'Co-op', 'Story Rich', 'Masterpiece', 'CRPG'],
        installSizeGb: 122.0,
        systemRequirements: {
          minimum: {
            os: 'Windows 10 64-bit',
            cpu: 'Intel I5 4690 / AMD FX 8350',
            ram: '8 GB RAM',
            gpu: 'Nvidia GTX 970 / RX 480 (4GB+ of VRAM)',
            storage: '150 GB available space',
          },
          recommended: {
            os: 'Windows 10 / 11 64-bit',
            cpu: 'Intel i7 8700K / AMD r5 3600',
            ram: '16 GB RAM',
            gpu: 'Nvidia 2060 Super / RX 5700 XT (8GB+ of VRAM)',
            storage: '150 GB SSD',
          },
        },
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
            description: 'Complete the entire campaign in single-save Honor Mode.',
            rarityPercentage: 3.1,
            points: 150,
            isUnlocked: false,
          },
        ],
      },
      {
        title: 'Hades II',
        slug: 'hades-2',
        shortDescription:
          'Battle beyond the Underworld using dark sorcery to take on the Titan of Time in an enchanting rogue-like dungeon crawler.',
        description:
          'As Melinoë, the immortal Princess of the Underworld, you will explore a bigger, deeper mythic world, vanquishing the forces of the Titan of Time with the full might of Olympus behind you, in a sweeping story that continually unfolds through your every setback and accomplishment.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 24),
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
        },
        achievements: [
          {
            title: 'Witchcraft Master',
            description: 'Awaken the Altar of the Arcana to maximum resonance.',
            rarityPercentage: 42.0,
            points: 35,
            isUnlocked: true,
          },
          {
            title: 'Time Ceases',
            description: 'Defeat Chronos on Fear Level 16.',
            rarityPercentage: 9.8,
            points: 80,
            isUnlocked: false,
          },
        ],
      },
      {
        title: 'Black Myth: Wukong',
        slug: 'black-myth-wukong',
        shortDescription:
          'Action RPG rooted in Chinese mythology. Set forth as the Destined One to venture into the challenges and marvels ahead.',
        description:
          'Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to uncover the obscured truth beneath the veil of a glorious legend from the past.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 96),
        status: GameStatus.COMPLETED,
        isFavorite: true,
        platforms: ['PC', 'PlayStation 5'],
        genres: ['Action RPG', 'Mythology', 'Souls-like', 'Adventure'],
        tags: ['Mythology', 'Martial Arts', 'Boss Rush', 'Stunning Visuals', 'Unreal Engine 5'],
        installSizeGb: 130.0,
        systemRequirements: {
          minimum: {
            os: 'Windows 10 64-bit',
            cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
            ram: '16 GB RAM',
            gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
            storage: '130 GB SSD',
          },
        },
        achievements: [
          {
            title: 'Staff of the Destined One',
            description: 'Master all three staff stances and unlock the 4th Focus point.',
            rarityPercentage: 22.5,
            points: 50,
            isUnlocked: true,
          },
        ],
      },
      {
        title: 'Elden Ring: Shadow of the Erdtree',
        slug: 'elden-ring',
        shortDescription:
          'The definitive masterpiece of open-world dark fantasy by Hidetaka Miyazaki and George R. R. Martin.',
        description:
          'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Traverse breathtaking vistas, fight towering demigods, and decipher dense lore in the Land of Shadow.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 72),
        status: GameStatus.COMPLETED,
        isFavorite: true,
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
        genres: ['Open World', 'Souls-like', 'Action RPG', 'Dark Fantasy'],
        tags: ['Open World', 'Souls-like', 'Difficult', 'Dark Fantasy', 'Masterpiece'],
        installSizeGb: 60.0,
        systemRequirements: {
          minimum: {
            os: 'Windows 10',
            cpu: 'INTEL CORE I5-8400 or AMD RYZEN 3 3300X',
            ram: '12 GB RAM',
            gpu: 'NVIDIA GEFORCE GTX 1060 3 GB',
            storage: '60 GB available space',
          },
        },
        achievements: [
          {
            title: 'Elden Lord',
            description: 'Achieved the Elden Lord ending.',
            rarityPercentage: 27.8,
            points: 100,
            isUnlocked: true,
          },
        ],
      },
      {
        title: 'Helldivers 2',
        slug: 'helldivers-2',
        shortDescription:
          'Join the galaxy’s last line of offense. Enlist in fast, frantic third-person co-op shooter against alien menaces.',
        description:
          'Freedom. Peace. Managed Democracy. Your Super Earth-born rights. The key pillars of our civilization are under attack from deadly alien civilizations: the Terminids and Automaton hordes. Spread Managed Democracy with orbital strikes, heavy artillery, and 4-player co-op mayhem.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 12),
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
            gpu: 'NVIDIA GeForce GTX 1050 Ti',
            storage: '100 GB',
          },
        },
        achievements: [
          {
            title: 'For Super Earth!',
            description: 'Extract successfully from a Level 9 Helldive operation.',
            rarityPercentage: 14.5,
            points: 50,
            isUnlocked: true,
          },
        ],
      },
      {
        title: 'Alan Wake 2',
        slug: 'alan-wake-2',
        shortDescription:
          'Mind-bending psychological survival horror with two playable protagonists unraveling a ritualistic nightmare.',
        description:
          'Saga Anderson arrives to investigate ritualistic murders in a small town. Alan Wake pens a dark story to shape the reality around him. These two detectives are somehow connected. Can they break free of the horror story?',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 120),
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
        },
        achievements: [
          {
            title: 'Return to the Lake',
            description: 'Solve the case in Bright Falls and enter the Overlap.',
            rarityPercentage: 38.0,
            points: 30,
            isUnlocked: true,
          },
        ],
      },
      {
        title: 'Hollow Knight: Silksong',
        slug: 'hollow-knight-silksong',
        shortDescription:
          'Discover a vast, haunted kingdom in Hollow Knight: Silksong! The sequel to the award-winning action-adventure.',
        description:
          'Play as Hornet, princess-protector of Hallownest, and adventure through a whole new realm ruled by silk and song! Captured and brought to this unfamiliar world, Hornet must battle foes and solve mysteries as she ascends on a deadly pilgrimage to the kingdom’s peak.',
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
        lastPlayedAt: null,
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
            storage: '9 GB',
          },
        },
        achievements: [],
      },
      {
        title: 'Final Fantasy VII Rebirth',
        slug: 'ff7-rebirth',
        shortDescription:
          'Cloud and his comrades embark on an uncharted journey across the vast and vibrant planet outside Midgar.',
        description:
          'The unknown journey continues. Having escaped the dystopian city of Midgar, Cloud and his friends set out on a journey across the planet. New adventures await in a vibrant and vast world – sprint across grassy plains on a Chocobo and explore expansive environments.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 180),
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
        },
        achievements: [
          {
            title: 'Queen’s Blood Grandmaster',
            description: 'Defeat the Shadow Queen and claim the ultimate deck.',
            rarityPercentage: 16.3,
            points: 60,
            isUnlocked: true,
          },
        ],
      },
      {
        title: 'Doom Eternal',
        slug: 'doom-eternal',
        shortDescription:
          'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions.',
        description:
          'Experience the ultimate combination of speed and power in DOOM Eternal - the next leap in push-forward, first-person combat. Armed with a shoulder-mounted flamethrower, retractable wrist-mounted blade, upgraded guns and mods, and abilities, you’re faster, stronger, and more versatile than ever.',
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
        lastPlayedAt: new Date(Date.now() - 3600 * 1000 * 240),
        status: GameStatus.BACKLOG,
        isFavorite: false,
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
        genres: ['FPS', 'Action', 'Gore', 'Fast-Paced'],
        tags: ['Fast-Paced', 'Heavy Metal', 'Demons', 'Gore', 'FPS', 'Singleplayer'],
        installSizeGb: 50.0,
        systemRequirements: {
          minimum: {
            os: 'Windows 10 64-bit',
            cpu: 'Intel Core i5 @ 3.3 GHz or AMD Ryzen 3 @ 3.1 GHz',
            ram: '8 GB RAM',
            gpu: 'NVIDIA GeForce GTX 1050Ti (4GB)',
            storage: '50 GB',
          },
        },
        achievements: [],
      },
    ];

    const savedGames: Game[] = [];

    for (const gData of initialGames) {
      const { achievements, ...gameFields } = gData;
      const gameEntity = this.gameRepo.create(gameFields);
      const savedGame = await this.gameRepo.save(gameEntity);
      savedGames.push(savedGame);

      // Seed Achievements
      if (achievements && achievements.length > 0) {
        for (const ach of achievements) {
          const achEntity = this.achievementRepo.create({
            ...ach,
            gameId: savedGame.id,
            unlockedAt: ach.isUnlocked ? new Date() : null,
          });
          await this.achievementRepo.save(achEntity);
        }
      }

      // Seed initial community reviews for key games
      if (savedGame.slug === 'chronos-cyber-legacy') {
        await this.reviewRepo.save([
          this.reviewRepo.create({
            gameId: savedGame.id,
            authorName: 'Kira "Glitch" Thorne',
            authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kira',
            rating: 5,
            recommended: true,
            title: 'The Cyberpunk Action Game We Deserve',
            content:
              'The responsiveness of the blade parry mechanic combined with vertical grapple maneuvers in Neo-Kyoto is peak adrenaline. Ray tracing performance on modern GPUs is buttery smooth. Absolute must-play.',
            hoursPlayed: 54,
            helpfulVotes: 32,
            pros: ['Sublime combat system', 'Unmatched cyberpunk aesthetic', 'Deep progression trees'],
            cons: ['Occasional camera clipping in narrow alleyways'],
          }),
          this.reviewRepo.create({
            gameId: savedGame.id,
            authorName: 'ViperX9',
            authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Viper',
            rating: 5,
            recommended: true,
            title: 'Story writing will blow your mind',
            content:
              'I did not expect the philosophical depth concerning synthetic consciousness. The multiple endings actually matter and diverge drastically.',
            hoursPlayed: 41,
            helpfulVotes: 19,
            pros: ['Narrative depth', 'Insane synthwave soundtrack'],
            cons: ['Side quests could have more variety'],
          }),
        ]);
      } else if (savedGame.slug === 'eldritch-eclipse') {
        await this.reviewRepo.save([
          this.reviewRepo.create({
            gameId: savedGame.id,
            authorName: 'LordOfCinders',
            authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cinders',
            rating: 5,
            recommended: true,
            title: 'Masterclass in Environmental Storytelling',
            content:
              'From the moment you step out onto the terrace overlooking the eclipse, you realize this is something special. Every boss demands full concentration. The weapon arts feel impactful and heavy.',
            hoursPlayed: 82,
            helpfulVotes: 58,
            pros: ['Rewarding difficulty', 'Stunning art direction', 'Epic orchestral score'],
            cons: ['Camera on giant boss encounters'],
          }),
        ]);
      }
    }

    // Seed Collections
    const collectionsData = [
      {
        name: 'Hall of Fame: Masterpieces',
        description: 'Critically acclaimed 90+ Metacritic titans that redefined their genres.',
        coverUrl: '/art/chronos.jpg',
        colorGradient: 'from-amber-500/30 to-purple-900/40',
        gameIndices: [0, 1, 3, 4],
      },
      {
        name: 'Neon & Cyberpunk Worlds',
        description: 'Dystopian megacities, cybernetic augmentations, and high-tech combat.',
        coverUrl: '/art/chronos.jpg',
        colorGradient: 'from-cyan-500/30 to-blue-900/40',
        gameIndices: [0, 2],
      },
      {
        name: 'Dark Souls & Punishing RPGs',
        description: 'Unforgiving encounters, complex lore, and triumphant mastery.',
        coverUrl: '/art/eldritch.jpg',
        colorGradient: 'from-rose-600/30 to-slate-900/40',
        gameIndices: [1, 5, 6],
      },
      {
        name: 'Squad Co-op & Multiplayer',
        description: 'Rally your crew for chaotic firefights and coordinated tactical operations.',
        coverUrl: 'https://images.unsplash.com/photo-1552824722-ddab137b4a6d?q=80&w=900&auto=format&fit=crop',
        colorGradient: 'from-emerald-500/30 to-teal-950/40',
        gameIndices: [3, 7],
      },
    ];

    for (const cData of collectionsData) {
      const col = this.collectionRepo.create({
        name: cData.name,
        description: cData.description,
        coverUrl: cData.coverUrl,
        colorGradient: cData.colorGradient,
        isPublic: true,
      });
      const savedCol = await this.collectionRepo.save(col);

      for (let i = 0; i < cData.gameIndices.length; i++) {
        const gameIndex = cData.gameIndices[i];
        if (savedGames[gameIndex]) {
          await this.itemRepo.save(
            this.itemRepo.create({
              collectionId: savedCol.id,
              gameId: savedGames[gameIndex].id,
              sortOrder: i,
            }),
          );
        }
      }
    }

    this.logger.log('Database seeded successfully with video games, achievements, collections, and reviews!');
  }
}
