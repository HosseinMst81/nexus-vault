import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Collection } from './collection.entity';
import { Game } from '../../games/entities/game.entity';

@Entity('collection_items')
@Unique(['collectionId', 'gameId'])
export class CollectionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  collectionId: string;

  @Column({ type: 'uuid' })
  gameId: string;

  @ManyToOne(() => Collection, (col) => col.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'collectionId' })
  collection: Collection;

  @ManyToOne(() => Game, (game) => game.collectionItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  addedAt: Date;
}
