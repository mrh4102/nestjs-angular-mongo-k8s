import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { diaryListReducer } from './diary-list/diary-list.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  diaryList: diaryListReducer,
};
