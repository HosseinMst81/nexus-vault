import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Game } from '../games/entities/game.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,
  ) {}

  async findByGame(gameId: string) {
    return this.reviewRepo.find({
      where: { gameId },
      order: { helpfulVotes: 'DESC', createdAt: 'DESC' },
    });
  }

  async create(dto: CreateReviewDto) {
    const game = await this.gameRepo.findOne({ where: { id: dto.gameId } });
    if (!game) {
      throw new NotFoundException(`Game with ID "${dto.gameId}" was not found.`);
    }

    const review = this.reviewRepo.create({
      ...dto,
      authorName: dto.authorName || 'Verified Vault Gamer',
      authorAvatar:
        dto.authorAvatar ||
        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
          dto.authorName || 'Gamer',
        )}`,
      helpfulVotes: 0,
    });

    const saved = await this.reviewRepo.save(review);

    // Update game userScore
    const allReviews = await this.reviewRepo.find({
      where: { gameId: dto.gameId },
    });
    if (allReviews.length > 0) {
      const avg =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      // Convert 5-star scale to 10-scale score
      game.userScore = parseFloat((avg * 2).toFixed(1));
      await this.gameRepo.save(game);
    }

    return saved;
  }

  async voteHelpful(id: string) {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" was not found.`);
    }

    review.helpfulVotes += 1;
    return this.reviewRepo.save(review);
  }

  async remove(id: string) {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" was not found.`);
    }

    await this.reviewRepo.remove(review);
    return { success: true, id };
  }
}
