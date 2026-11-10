import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  gameId: string;

  @ManyToOne(() => Game, (game) => game.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @Column({ type: 'varchar', length: 150, default: 'Player' })
  authorName: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  authorAvatar: string;

  @Column({ type: 'int', default: 5 })
  rating: number; // 1 to 5

  @Column({ type: 'boolean', default: true })
  recommended: boolean;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 10 })
  hoursPlayed: number;

  @Column({ type: 'int', default: 0 })
  helpfulVotes: number;

  @Column('simple-array', { nullable: true })
  pros: string[];

  @Column('simple-array', { nullable: true })
  cons: string[];

  @CreateDateColumn()
  createdAt: Date;
}
