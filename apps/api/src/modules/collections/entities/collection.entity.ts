import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { AbstractBaseEntity } from '../../../common/entities/base.entity';
import { CollectionItem } from './collection-item.entity';

@Entity('collections')
export class Collection extends AbstractBaseEntity {
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
}
