import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Mocked } from 'vitest';
import { DiaryController } from './diary.controller.js';
import { DiaryService } from './diary.service.js';
import { CreateDiaryDto } from './dto/create-diary.dto.js';
import { UpdateDiaryDto } from './dto/update-diary.dto.js';
import { Diary } from './schemas/diary.schema.js';

const mockDiaryService = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

describe('DiaryController', () => {
  let diaryController: DiaryController;
  let diaryService: Mocked<DiaryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryController],
      providers: [
        {
          provide: DiaryService,
          useValue: mockDiaryService,
        },
      ],
    }).compile();

    diaryController = module.get(DiaryController);
    diaryService = module.get(DiaryService);
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
      diaryService.create.mockResolvedValueOnce(diary);

      const response = diaryController.create(dto);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryService.create).toHaveBeenCalledOnce();
    });
  });

  describe('findAll diary entries', () => {
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };

    it('should findAll diary entries', async () => {
      diaryService.findAll.mockResolvedValueOnce([diary]);

      const response = diaryController.findAll();
      const expected = [diary];

      await expect(response).resolves.toEqual(expected);
      expect(diaryService.findAll).toHaveBeenCalledOnce();
    });
  });

  describe('findOne diary entry', () => {
    const id = new Types.ObjectId().toString();
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };

    it('should findOne diary entry', async () => {
      diaryService.findOne.mockResolvedValueOnce(diary);

      const response = diaryController.findOne(id);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryService.findOne).toHaveBeenCalledOnce();
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

    it('should update diary entry', async () => {
      diaryService.update.mockResolvedValueOnce(diary);

      const response = diaryController.update(id, dto);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryService.update).toHaveBeenCalledOnce();
    });
  });

  describe('remove diary entry', () => {
    const id = new Types.ObjectId().toString();
    const diary: Diary = {
      title: 'A Quiet Evening',
      content: 'Tonight, I just want to slow down and enjoy the silence',
      mood: 'calm',
    };

    it('should remove diary entry', async () => {
      diaryService.remove.mockResolvedValueOnce(diary);

      const response = diaryController.remove(id);
      const expected = diary;

      await expect(response).resolves.toEqual(expected);
      expect(diaryService.remove).toHaveBeenCalledOnce();
    });
  });
});
