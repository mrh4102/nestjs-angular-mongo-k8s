import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { Mocked } from 'vitest';
import { Diary } from '../../models/diary';
import { DiaryApi } from '../../services/diary-api';
import { DiaryListActions } from './diary-list.actions';
import { DiaryListEffects } from './diary-list.effects';

describe('DiaryListEffects', () => {
  const diary: Diary = {
    _id: '507f1f77bcf86cd799439011',
    title: 'A Quiet Evening',
    content: 'Tonight, I just want to slow down and enjoy the silence',
    mood: 'calm',
  };
  let diaryListEffects: DiaryListEffects;
  let actions$: Observable<any>;
  let diaryApi: Mocked<DiaryApi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DiaryListEffects,
        provideMockActions(() => actions$),
        {
          provide: DiaryApi,
          useValue: {
            create: vi.fn(),
            findAll: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    });
    diaryListEffects = TestBed.inject(DiaryListEffects);
    actions$ = TestBed.inject(Actions);
    diaryApi = TestBed.inject(DiaryApi) as Mocked<DiaryApi>;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(diaryListEffects).toBeTruthy();
  });

  it('should dispatch fetchingSuccess when API call succeeds', () => {
    diaryApi.findAll.mockReturnValueOnce(of([diary]));
    actions$ = of(DiaryListActions.fetchingData());

    diaryListEffects.loadDiaryList$.subscribe((result) => {
      expect(result).toEqual(
        DiaryListActions.fetchingSuccess({
          data: [diary],
        }),
      );
    });

    expect(diaryApi.findAll).toHaveBeenCalledOnce();
  });

  it('should dispatch fetchingFailure when API call fails', () => {
    diaryApi.findAll.mockReturnValueOnce(
      throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'Internal Server Error' },
          }),
      ),
    );
    actions$ = of(DiaryListActions.fetchingData());

    diaryListEffects.loadDiaryList$.subscribe((result) => {
      expect(result).toEqual(
        DiaryListActions.fetchingFailure({
          error: 'Internal Server Error',
        }),
      );
    });

    expect(diaryApi.findAll).toHaveBeenCalledOnce();
  });

  it('should not make another request while already fetching', () => {
    diaryApi.findAll.mockReturnValueOnce(NEVER);
    actions$ = of(
      DiaryListActions.fetchingData(),
      DiaryListActions.fetchingData(),
      DiaryListActions.fetchingData(),
    );

    diaryListEffects.loadDiaryList$.subscribe();

    expect(diaryApi.findAll).toHaveBeenCalledOnce();
  });

  it('should allow fetching when previous request succeeds', () => {
    diaryApi.findAll.mockReturnValue(of([diary]));
    actions$ = of(
      DiaryListActions.fetchingData(),
      DiaryListActions.fetchingData(),
      DiaryListActions.fetchingData(),
    );

    diaryListEffects.loadDiaryList$.subscribe();

    expect(diaryApi.findAll).toHaveBeenCalledTimes(3);
  });
});
