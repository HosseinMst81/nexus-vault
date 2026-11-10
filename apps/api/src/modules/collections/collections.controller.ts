import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { AddGameToCollectionDto } from './dto/add-game-to-collection.dto';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @ApiOperation({ summary: 'List all user collections' })
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single collection details with games' })
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game collection' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCollectionDto) {
    return this.collectionsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update collection metadata' })
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateCollectionDto>,
  ) {
    return this.collectionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a collection' })
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }

  @Post(':id/games')
  @ApiOperation({ summary: 'Add a game to a collection' })
  addGame(
    @Param('id') id: string,
    @Body() dto: AddGameToCollectionDto,
  ) {
    return this.collectionsService.addGame(id, dto.gameId, dto.sortOrder);
  }

  @Delete(':id/games/:gameId')
  @ApiOperation({ summary: 'Remove a game from a collection' })
  removeGame(
    @Param('id') id: string,
    @Param('gameId') gameId: string,
  ) {
    return this.collectionsService.removeGame(id, gameId);
  }
}
