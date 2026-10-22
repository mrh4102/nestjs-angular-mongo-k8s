import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Mocked } from 'vitest';
import { Diary } from '../../models/diary';
import { DiaryApi } from '../../services/diary-api';
import { DiaryListPage } from './diary-list-page';

const mockDiaryApi = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

describe('DiaryListPage', () => {
  const diary: Diary = {
    _id: '507f1f77bcf86cd799439011',
    title: 'A Quiet Evening',
    content: 'Tonight, I just want to slow down and enjoy the silence',
    mood: 'calm',
  };
  let diaryApi: Mocked<DiaryApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryListPage],
      providers: [
        provideRouter([]),
        {
          provide: DiaryApi,
          useValue: mockDiaryApi,
        },
      ],
    }).compileComponents();
    diaryApi = TestBed.inject(DiaryApi) as Mocked<DiaryApi>;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DiaryListPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('state', () => {
    it('should set idle state', () => {
      const fixture = TestBed.createComponent(DiaryListPage);
      const component = fixture.componentInstance;
      expect(component.state()).toEqual({ status: 'idle' });
    });

    it('should set fetching state', () => {
      diaryApi.findAll.mockReturnValueOnce(NEVER);

      const fixture = TestBed.createComponent(DiaryListPage);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.state()).toEqual({ status: 'fetching' });
      expect(diaryApi.findAll).toHaveBeenCalledOnce();
    });

    it('should set fetching_success state', () => {
      diaryApi.findAll.mockReturnValueOnce(of([diary]));

      const fixture = TestBed.createComponent(DiaryListPage);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.state()).toEqual({
        status: 'fetching_success',
        data: [diary],
      });
      expect(diaryApi.findAll).toHaveBeenCalledOnce();
    });

    it('should set fetching_failure state', () => {
      diaryApi.findAll.mockReturnValueOnce(
        throwError(
          () =>
            new HttpErrorResponse({
              error: { message: 'Internal Server Error' },
            }),
        ),
      );

      const fixture = TestBed.createComponent(DiaryListPage);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.state()).toEqual({
        status: 'fetching_failure',
        error: 'Internal Server Error',
      });
      expect(diaryApi.findAll).toHaveBeenCalledOnce();
    });

    it('should not make another request while already fetching', () => {
      diaryApi.findAll.mockReturnValue(NEVER);

      const fixture = TestBed.createComponent(DiaryListPage);
      const component = fixture.componentInstance;
      component.loadDiaryList();
      component.loadDiaryList();

      expect(component.state()).toEqual({ status: 'fetching' });
      expect(diaryApi.findAll).toHaveBeenCalledTimes(1);
    });

    it('should allow fetching when previous request succeeds', () => {
      diaryApi.findAll.mockReturnValue(of([diary]));

      const fixture = TestBed.createComponent(DiaryListPage);
      const component = fixture.componentInstance;
      component.loadDiaryList();
      component.loadDiaryList();

      expect(component.state()).toEqual({
        status: 'fetching_success',
        data: [diary],
      });
      expect(diaryApi.findAll).toHaveBeenCalledTimes(2);
    });
  });

  describe('ui', () => {
    it('should render header elements', () => {
      diaryApi.findAll.mockReturnValueOnce(of([diary]));

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const header = hostElement.querySelector('[data-testid="header"]');
      const subheader = hostElement.querySelector('[data-testid="subheader"]');

      expect(header?.textContent).toContain('Diary entries');
      expect(header?.textContent).toContain('fetching_success');
      expect(subheader?.textContent).toContain('Manage your diary entries');
      expect(subheader?.textContent).toContain('+ Add entry');
    });

    it('should render fetching state', () => {
      diaryApi.findAll.mockReturnValueOnce(NEVER);

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const loadingBox = hostElement.querySelector('[data-testid="loading-box"]');

      expect(loadingBox?.textContent).toContain('Loading entries...');
      expect(loadingBox?.textContent).toContain('Please wait while we retrieve your entries.');
    });

    it('should render fetching_success state', () => {
      diaryApi.findAll.mockReturnValueOnce(of([diary]));

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const diaryList = hostElement.querySelector('app-diary-list');

      expect(diaryList).toBeDefined();
    });

    it('should render fetching_failure state', () => {
      diaryApi.findAll.mockReturnValueOnce(
        throwError(
          () =>
            new HttpErrorResponse({
              error: { message: 'Internal Server Error' },
            }),
        ),
      );

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const errorBox = hostElement.querySelector('[data-testid="error-box"]');

      expect(errorBox?.textContent).toContain("Couldn't load entries");
      expect(errorBox?.textContent).toContain('Internal Server Error');
    });
  });
});
