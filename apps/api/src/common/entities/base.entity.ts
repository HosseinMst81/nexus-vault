import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Liskov Substitution Principle (LSP):
 * Base entity providing standard primary key identification and temporal audit columns.
 * Subclasses can seamlessly substitute this base type in generic operations.
 */
export abstract class AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
