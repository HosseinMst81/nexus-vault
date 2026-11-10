import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FilterGamesDto } from './dto/filter-games.dto';
import { LogPlaytimeDto } from './dto/log-playtime.dto';
import { GameStatus } from './entities/game.entity';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'List and search games with filters, sorting, and pagination' })
  findAll(@Query() filterDto: FilterGamesDto) {
    return this.gamesService.findAll(filterDto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured/spotlight marquee games' })
  getFeatured() {
    return this.gamesService.getFeatured();
  }

  @Get('genres')
  @ApiOperation({ summary: 'Get list of available genres' })
  getGenres() {
    return this.gamesService.getGenres();
  }

  @Get('platforms')
  @ApiOperation({ summary: 'Get list of available platforms' })
  getPlatforms() {
    return this.gamesService.getPlatforms();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single game details with achievements and reviews' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get single game by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.gamesService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new game to library' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update game details' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a game from library' })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }

  @Patch(':id/favorite')
  @ApiOperation({ summary: 'Toggle game favorite status' })
  toggleFavorite(@Param('id') id: string) {
    return this.gamesService.toggleFavorite(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update game play status (BACKLOG, PLAYING, COMPLETED, etc)' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: GameStatus,
  ) {
    return this.gamesService.updateStatus(id, status);
  }

  @Post(':id/playtime')
  @ApiOperation({ summary: 'Log playtime session for a game' })
  logPlaytime(
    @Param('id') id: string,
    @Body() logPlaytimeDto: LogPlaytimeDto,
  ) {
    return this.gamesService.logPlaytime(id, logPlaytimeDto.additionalMinutes);
  }
}
