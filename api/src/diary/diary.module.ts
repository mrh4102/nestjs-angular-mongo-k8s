import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiaryController } from './diary.controller.js';
import { DiaryService } from './diary.service.js';
import { Diary, DiarySchema } from './schemas/diary.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Diary.name,
        schema: DiarySchema,
      },
    ]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
