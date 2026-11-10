import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Game } from './game.entity';

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  gameId: string;

  @ManyToOne(() => Game, (game) => game.achievements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  iconUrl: string;

  @Column({ type: 'boolean', default: false })
  isUnlocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  unlockedAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 25.0 })
  rarityPercentage: number;

  @Column({ type: 'int', default: 20 })
  points: number;
}
