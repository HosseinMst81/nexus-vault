import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Achievement } from './achievement.entity';
import { Review } from '../../reviews/entities/review.entity';
import { CollectionItem } from '../../collections/entities/collection-item.entity';

export enum GameStatus {
  INSTALLED = 'INSTALLED',
  PLAYING = 'PLAYING',
  BACKLOG = 'BACKLOG',
  COMPLETED = 'COMPLETED',
  WISHLIST = 'WISHLIST',
  DROPPED = 'DROPPED',
}

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'text', default: '' })
  shortDescription: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'varchar', length: 1000 })
  coverUrl: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  bannerUrl: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  trailerUrl: string;

  @Column({ type: 'varchar', length: 255, default: 'Independent' })
  developer: string;

  @Column({ type: 'varchar', length: 255, default: 'Self-published' })
  publisher: string;

  @Column({ type: 'varchar', length: 50, default: '2024' })
  releaseDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 85 })
  metacriticScore: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 9.0 })
  userScore: number;

  @Column({ type: 'int', default: 0 })
  playtimeMinutes: number;

  @Column({ type: 'timestamp', nullable: true })
  lastPlayedAt: Date;

  @Index()
  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.BACKLOG,
  })
  status: GameStatus;

  @Index()
  @Column({ type: 'boolean', default: false })
  isFavorite: boolean;

  @Column('simple-array')
  platforms: string[];

  @Column('simple-array')
  genres: string[];

  @Column('simple-array')
  tags: string[];

  @Column({ type: 'decimal', precision: 6, scale: 1, default: 25.0 })
  installSizeGb: number;

  @Column({ type: 'jsonb', nullable: true })
  systemRequirements: {
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
  };

  @Column('simple-array', { nullable: true })
  screenshots: string[];

  @Column({ type: 'jsonb', nullable: true })
  dlcs: Array<{
    id: string;
    title: string;
    price: number;
    releaseDate: string;
    installed: boolean;
  }>;

  @OneToMany(() => Achievement, (achievement) => achievement.game, {
    cascade: true,
  })
  achievements: Achievement[];

  @OneToMany(() => Review, (review) => review.game, {
    cascade: true,
  })
  reviews: Review[];

  @OneToMany(() => CollectionItem, (item) => item.game)
  collectionItems: CollectionItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
