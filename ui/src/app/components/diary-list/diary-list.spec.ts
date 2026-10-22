import { TestBed } from '@angular/core/testing';
import { Diary } from '../../models/diary';
import { DiaryList } from './diary-list';

describe('DiaryList', () => {
  const diary: Diary = {
    _id: '507f1f77bcf86cd799439011',
    title: 'A Quiet Evening',
    content: 'Tonight, I just want to slow down and enjoy the silence',
    mood: 'calm',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryList],
    }).compileComponents();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DiaryList);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the diary list', () => {
    const fixture = TestBed.createComponent(DiaryList);
    fixture.componentRef.setInput('data', [diary]);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const diaryList = hostElement.querySelector('[data-testid="diary-list"]');
    const diaryItems = diaryList?.querySelectorAll('li');

    expect(diaryList).toBeDefined();
    expect(diaryItems?.length).toEqual(1);
    expect(diaryItems?.[0].textContent).toContain(diary.title);
  });

  it('should render the empty state', () => {
    const fixture = TestBed.createComponent(DiaryList);
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const diaryEmpty = hostElement.querySelector('[data-testid="diary-empty"]');

    expect(diaryEmpty).toBeDefined();
    expect(diaryEmpty?.textContent).toContain('No entries yet');
    expect(diaryEmpty?.textContent).toContain('Start writing your diary today');
  });

  it('should emit id on item click', () => {
    const fixture = TestBed.createComponent(DiaryList);
    fixture.componentRef.setInput('data', [diary]);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const diaryList = hostElement.querySelector('[data-testid="diary-list"]');
    const diaryItem = diaryList?.querySelector('li');

    const callback = vi.fn();
    fixture.componentInstance.itemClicked.subscribe(callback);
    diaryItem?.click();

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(diary._id);
  });
});
