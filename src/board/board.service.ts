import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
  ) {}

  /**
   * @description 게시글 작성
   * @param data
   */
  async createArticle(data) {
    return await this.boardsRepository.save({
      version: data.version,
      title: data.title,
      content: data.content,
    });
  }

  /**
   * @description 전체 게시글 조회
   */
  async getArticles() {
    return await this.boardsRepository.find({
      where: { deletedAt: null },
      select: ['version', 'title', 'content', 'createdAt', 'updatedAt', 'id'],
    });
  }

  /**
   * @description id로 게시글 조회
   */
  async getArticleById(id) {
    return await this.boardsRepository.findOne({
      where: { id, deletedAt: null },
      select: ['version', 'title', 'content', 'createdAt', 'updatedAt', 'id'],
    });
  }

  /**
   * @description 게시글 수정
   */
  async updateArticle(id, data) {
    return await this.boardsRepository.update(id, data);
  }

  /**
   * @description 게시글 삭제
   */
  async deleteArticle(id) {
    return await this.boardsRepository.softDelete(id);
  }
}
