import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Diary } from '../../models/diary';
import { DiaryListActions } from '../../state/diary-list/diary-list.actions';
import { selectDiaryListState } from '../../state/diary-list/diary-list.selectors';
import { DiaryListPage } from './diary-list-page';

describe('DiaryListPage', () => {
  const diary: Diary = {
    _id: '507f1f77bcf86cd799439011',
    title: 'A Quiet Evening',
    content: 'Tonight, I just want to slow down and enjoy the silence',
    mood: 'calm',
  };
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryListPage],
      providers: [provideRouter([]), provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DiaryListPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('init', () => {
    it('should dispatch fetchingData on initialization', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      store.overrideSelector(selectDiaryListState, {
        status: 'fetching_success',
        data: [diary],
      });

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      expect(dispatchSpy).toHaveBeenCalledWith(DiaryListActions.fetchingData());
    });
  });

  describe('ui', () => {
    it('should render header elements', () => {
      store.overrideSelector(selectDiaryListState, {
        status: 'fetching_success',
        data: [diary],
      });

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
      store.overrideSelector(selectDiaryListState, {
        status: 'fetching',
      });

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const loadingBox = hostElement.querySelector('[data-testid="loading-box"]');

      expect(loadingBox?.textContent).toContain('Loading entries...');
      expect(loadingBox?.textContent).toContain('Please wait while we retrieve your entries.');
    });

    it('should render fetching_success state', () => {
      store.overrideSelector(selectDiaryListState, {
        status: 'fetching_success',
        data: [diary],
      });

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const diaryList = hostElement.querySelector('app-diary-list');

      expect(diaryList).toBeDefined();
    });

    it('should render fetching_failure state', () => {
      store.overrideSelector(selectDiaryListState, {
        status: 'fetching_failure',
        error: 'Internal Server Error',
      });

      const fixture = TestBed.createComponent(DiaryListPage);
      fixture.detectChanges();

      const hostElement = fixture.nativeElement as HTMLElement;
      const errorBox = hostElement.querySelector('[data-testid="error-box"]');

      expect(errorBox?.textContent).toContain("Couldn't load entries");
      expect(errorBox?.textContent).toContain('Internal Server Error');
    });
  });
});
