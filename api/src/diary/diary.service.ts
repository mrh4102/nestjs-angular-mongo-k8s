import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiaryDto } from './dto/create-diary.dto.js';
import { UpdateDiaryDto } from './dto/update-diary.dto.js';
import { Diary } from './schemas/diary.schema.js';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name)
    private diaryModel: Model<Diary>,
  ) {}

  async create(dto: CreateDiaryDto): Promise<Diary> {
    return this.diaryModel.create(dto);
  }

  async findAll(): Promise<Diary[]> {
    return this.diaryModel.find().exec();
  }

  async findOne(id: string): Promise<Diary> {
    const entry = await this.diaryModel.findById(id).exec();
    if (!entry) {
      throw new NotFoundException();
    }
    return entry;
  }

  async update(id: string, dto: UpdateDiaryDto): Promise<Diary> {
    const entry = await this.diaryModel
      .findByIdAndUpdate(id, dto, {
        returnDocument: 'after',
        runValidators: true,
      })
      .exec();
    if (!entry) {
      throw new NotFoundException();
    }
    return entry;
  }

  async remove(id: string): Promise<Diary> {
    const entry = await this.diaryModel.findByIdAndDelete(id).exec();
    if (!entry) {
      throw new NotFoundException();
    }
    return entry;
  }
}
