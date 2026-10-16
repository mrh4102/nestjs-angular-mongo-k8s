import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiaryListPage } from './diary-list-page';

describe('DiaryListPage', () => {
  let component: DiaryListPage;
  let fixture: ComponentFixture<DiaryListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DiaryListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
