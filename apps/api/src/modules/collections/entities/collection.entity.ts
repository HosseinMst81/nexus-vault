import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CollectionItem } from './collection-item.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  coverUrl: string;

  @Column({ type: 'varchar', length: 100, default: 'from-violet-600 to-indigo-900' })
  colorGradient: string;

  @Column({ type: 'boolean', default: true })
  isPublic: boolean;

  @OneToMany(() => CollectionItem, (item) => item.collection, { cascade: true })
  items: CollectionItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
