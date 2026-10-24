import { Diary } from '../../models/diary';

export type DiaryListState =
  | { status: 'idle' }
  | { status: 'fetching' }
  | { status: 'fetching_success'; data: Diary[] }
  | { status: 'fetching_failure'; error: string };
