import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Diary } from '../../models/diary';

export const DiaryListActions = createActionGroup({
  source: 'Diary List',
  events: {
    'Fetching Data': emptyProps(),
    'Fetching Success': props<{ data: Diary[] }>(),
    'Fetching Failure': props<{ error: string }>(),
  },
});
