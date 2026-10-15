import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { Mocked } from 'vitest';
import { DiaryService } from './diary.service.js';
import { CreateDiaryDto } from './dto/create-diary.dto.js';
import { UpdateDiaryDto } from './dto/update-diary.dto.js';
import { Diary } from './schemas/diary.schema.js';

const mockDiaryModel = {
  create: vi.fn(),
  find: vi.fn(),
  findById: vi.fn(),
  findByIdAndUpdate: vi.fn(),
  findByIdAndDelete: vi.fn(),
};

describe('DiaryService', () => {
  let diaryService: DiaryService;
  let diaryModel: Mocked<Model<Diary>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryService,
        {
          provide: getModelToken(Diary.name),
          useValue: mockDiaryModel,
        },
      ],
    }).compile();

    diaryService = module.get(DiaryService);
    diaryModel = module.get(getModelToken(Diary.name));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create diary entry', () => {
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };
    const dto: CreateDiaryDto = {
      title: diary.title,
      content: diary.content,
      mood: diary.mood,
    };

    it('should create diary entry', async () => {
      diaryModel.create.mockResolvedValueOnce(diary as any);

      const response = diaryService.create(dto);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryModel.create).toHaveBeenCalledOnce();
    });
  });

  describe('findAll diary entries', () => {
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };

    it('should findAll diary entries', async () => {
      diaryModel.find.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce([diary]),
      } as any);

      const response = diaryService.findAll();
      const expected = [diary];

      await expect(response).resolves.toEqual(expected);
      expect(diaryModel.find).toHaveBeenCalledOnce();
    });
  });

  describe('findOne diary entry', () => {
    const id = new Types.ObjectId().toString();
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };

    it('should throw not found exception', async () => {
      diaryModel.findById.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce(null),
      } as any);

      const response = diaryService.findOne(id);
      const expected = NotFoundException;

      await expect(response).rejects.toBeInstanceOf(expected);
      expect(diaryModel.findById).toHaveBeenCalledOnce();
    });

    it('should findOne diary entry', async () => {
      diaryModel.findById.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce(diary),
      } as any);

      const response = diaryService.findOne(id);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryModel.findById).toHaveBeenCalledOnce();
    });
  });

  describe('update diary entry', () => {
    const id = new Types.ObjectId().toString();
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };
    const dto: UpdateDiaryDto = {
      title: diary.title,
      content: diary.content,
      mood: diary.mood,
    };

    it('should throw not found exception', async () => {
      diaryModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce(null),
      } as any);

      const response = diaryService.update(id, dto);
      const expected = NotFoundException;

      await expect(response).rejects.toBeInstanceOf(expected);
      expect(diaryModel.findByIdAndUpdate).toHaveBeenCalledOnce();
    });

    it('should update diary entry', async () => {
      diaryModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce(diary),
      } as any);

      const response = diaryService.update(id, dto);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryModel.findByIdAndUpdate).toHaveBeenCalledOnce();
    });
  });

  describe('remove diary entry', () => {
    const id = new Types.ObjectId().toString();
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };

    it('should throw not found exception', async () => {
      diaryModel.findByIdAndDelete.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce(null),
      } as any);

      const response = diaryService.remove(id);
      const expected = NotFoundException;

      await expect(response).rejects.toBeInstanceOf(expected);
      expect(diaryModel.findByIdAndDelete).toHaveBeenCalledOnce();
    });

    it('should remove diary entry', async () => {
      diaryModel.findByIdAndDelete.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValueOnce(diary),
      } as any);

      const response = diaryService.remove(id);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryModel.findByIdAndDelete).toHaveBeenCalledOnce();
    });
  });
});
