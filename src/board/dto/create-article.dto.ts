import { PickType } from '@nestjs/mapped-types';
import { Board } from '../board.entity';

export class CreateArticleDto extends PickType(Board, [
  'version',
  'title',
  'content',
]) {}
