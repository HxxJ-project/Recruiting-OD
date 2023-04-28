import { BoardService } from './board.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UserAuthGuard } from './strategy/user-access.strategy';
import { AuthGuard } from './strategy/me-access.strategy';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  async createArticle(@Body() data: CreateArticleDto) {
    if (!data || !data.version || !data.title || !data.content) {
      throw new BadRequestException();
    }
    return await this.boardService.createArticle(data);
  }

  @Get()
  async getArticles() {
    return await this.boardService.getArticles();
  }

  @Get('/:id')
  async getArticleById(@Param('id') id: number) {
    return await this.boardService.getArticleById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateArticle(@Param('id') id: number, @Body() data: UpdateArticleDto) {
    return await this.boardService.updateArticle(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteArticle(@Param('id') id: number) {
    return await this.boardService.deleteArticle(id);
  }
}
