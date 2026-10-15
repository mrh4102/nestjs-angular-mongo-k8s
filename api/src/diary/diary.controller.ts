import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiaryService } from './diary.service.js';
import { CreateDiaryDto } from './dto/create-diary.dto.js';
import { UpdateDiaryDto } from './dto/update-diary.dto.js';
import { Diary } from './schemas/diary.schema.js';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@Body() dto: CreateDiaryDto): Promise<Diary> {
    return this.diaryService.create(dto);
  }

  @Get()
  findAll(): Promise<Diary[]> {
    return this.diaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Diary> {
    return this.diaryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDiaryDto): Promise<Diary> {
    return this.diaryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Diary> {
    return this.diaryService.remove(id);
  }
}
