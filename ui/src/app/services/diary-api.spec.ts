import { TestBed } from '@angular/core/testing';
import { DiaryApi } from './diary-api';

describe('DiaryApi', () => {
  let service: DiaryApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
