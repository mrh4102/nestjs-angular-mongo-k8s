import { Controller } from '@nestjs/common';
import { DiaryService } from './diary.service.js';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}
}
