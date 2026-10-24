import { createReducer, on } from '@ngrx/store';
import { DiaryListActions } from './diary-list.actions';
import { DiaryListState } from './diary-list.state';

export const initialState: DiaryListState = {
  status: 'idle',
};

export const diaryListReducer = createReducer<DiaryListState>(
  initialState,
  on(DiaryListActions.fetchingData, () => {
    return { status: 'fetching' };
  }),
  on(DiaryListActions.fetchingSuccess, (_, { data }) => {
    return { status: 'fetching_success', data };
  }),
  on(DiaryListActions.fetchingFailure, (_, { error }) => {
    return { status: 'fetching_failure', error };
  }),
);
