import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectDiaryListState = createSelector(
  (state: AppState) => state.diaryList,
  (diaryList) => diaryList,
);
