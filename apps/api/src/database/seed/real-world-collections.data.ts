export interface SeedCollectionData {
  name: string;
  description: string;
  coverUrl: string;
  colorGradient: string;
  isPublic: boolean;
  gameSlugs: string[];
}

export const REAL_WORLD_COLLECTIONS: SeedCollectionData[] = [
  {
    name: 'Hall of Fame: 90+ Masterpieces',
    description: 'Critically acclaimed generational titans with Metacritic scores of 90 and above.',
    coverUrl: '/art/chronos.jpg',
    colorGradient: 'from-amber-500/40 to-purple-900/50',
    isPublic: true,
    gameSlugs: [
      'elden-ring',
      'baldurs-gate-3',
      'red-dead-redemption-2',
      'the-witcher-3',
      'eldritch-eclipse',
      'chronos-cyber-legacy',
      'ff7-rebirth',
      'hades-2',
    ],
  },
  {
    name: 'Punishing Souls-likes & Dark RPGs',
    description: 'Relentless combat timing, intricate level geometry, and somber atmospheric lore.',
    coverUrl: '/art/eldritch.jpg',
    colorGradient: 'from-rose-600/40 to-slate-950/60',
    isPublic: true,
    gameSlugs: [
      'eldritch-eclipse',
      'elden-ring',
      'black-myth-wukong',
      'armored-core-vi',
      'hollow-knight-silksong',
    ],
  },
  {
    name: 'High-Tech Cyberpunk & Dystopias',
    description: 'Megacorporation espionage, cybernetic implants, and neon-lit rainy megalopolises.',
    coverUrl: '/art/chronos.jpg',
    colorGradient: 'from-cyan-500/40 to-blue-950/60',
    isPublic: true,
    gameSlugs: [
      'chronos-cyber-legacy',
      'cyberpunk-2077',
      'astral-odyssey',
      'armored-core-vi',
    ],
  },
  {
    name: 'Tactical Squad & Co-op Operations',
    description: 'Coordinated firepower, orbital stratagems, and chaotic multiplayer campaigns.',
    coverUrl: 'https://images.unsplash.com/photo-1552824722-ddab137b4a6d?q=80&w=900&auto=format&fit=crop',
    colorGradient: 'from-emerald-500/40 to-teal-950/60',
    isPublic: true,
    gameSlugs: ['helldivers-2', 'baldurs-gate-3', 'astral-odyssey'],
  },
  {
    name: 'Survival Horror & Psychological Thrillers',
    description: 'Resource management, claustrophobic encounters, and narrative dread.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
    colorGradient: 'from-purple-600/40 to-black/80',
    isPublic: true,
    gameSlugs: ['alan-wake-2', 'resident-evil-4', 'doom-eternal'],
  },
];
