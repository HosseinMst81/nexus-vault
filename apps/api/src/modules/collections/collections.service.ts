import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionItem } from './entities/collection-item.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Game } from '../games/entities/game.entity';
import {
  CollectionNotFoundException,
  GameNotFoundException,
  GameAlreadyInCollectionException,
} from '../../common/exceptions/domain.exceptions';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
    @InjectRepository(CollectionItem)
    private readonly itemRepo: Repository<CollectionItem>,
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,
  ) {}

  async findAll() {
    return this.collectionRepo.find({
      relations: ['items', 'items.game'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const col = await this.collectionRepo.findOne({
      where: { id },
      relations: ['items', 'items.game', 'items.game.achievements'],
      order: {
        items: {
          sortOrder: 'ASC',
        },
      },
    });

    if (!col) {
      throw new CollectionNotFoundException(id);
    }

    return col;
  }

  async create(dto: CreateCollectionDto) {
    const col = this.collectionRepo.create(dto);
    return this.collectionRepo.save(col);
  }

  async update(id: string, dto: Partial<CreateCollectionDto>) {
    const col = await this.findOne(id);
    const merged = this.collectionRepo.merge(col, dto);
    return this.collectionRepo.save(merged);
  }

  async remove(id: string) {
    const col = await this.findOne(id);
    await this.collectionRepo.remove(col);
    return { success: true, id };
  }

  async addGame(collectionId: string, gameId: string, sortOrder = 0) {
    await this.findOne(collectionId);
    const game = await this.gameRepo.findOne({ where: { id: gameId } });
    if (!game) {
      throw new GameNotFoundException(gameId);
    }

    const existing = await this.itemRepo.findOne({
      where: { collectionId, gameId },
    });

    if (existing) {
      throw new GameAlreadyInCollectionException(collectionId, gameId);
    }

    const item = this.itemRepo.create({
      collectionId,
      gameId,
      sortOrder,
    });

    await this.itemRepo.save(item);
    return this.findOne(collectionId);
  }

  async removeGame(collectionId: string, gameId: string) {
    const item = await this.itemRepo.findOne({
      where: { collectionId, gameId },
    });

    if (!item) {
      throw new GameNotFoundException(`Game "${gameId}" is not in collection "${collectionId}"`);
    }

    await this.itemRepo.remove(item);
    return { success: true, collectionId, gameId };
  }
}
