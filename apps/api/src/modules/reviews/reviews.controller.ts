import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('game/:gameId')
  @ApiOperation({ summary: 'Get all community reviews for a game' })
  findByGame(@Param('gameId') gameId: string) {
    return this.reviewsService.findByGame(gameId);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a new review for a game' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Patch(':id/helpful')
  @ApiOperation({ summary: 'Vote a review as helpful' })
  voteHelpful(@Param('id') id: string) {
    return this.reviewsService.voteHelpful(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
