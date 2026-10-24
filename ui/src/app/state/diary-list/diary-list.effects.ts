import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DiaryApi } from '../../services/diary-api';
import { DiaryListActions } from './diary-list.actions';

@Injectable()
export class DiaryListEffects {
  private actions$ = inject(Actions);
  private diaryApi = inject(DiaryApi);

  loadDiaryList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiaryListActions.fetchingData),
      exhaustMap(() =>
        this.diaryApi.findAll().pipe(
          map((data) => {
            return DiaryListActions.fetchingSuccess({ data });
          }),
          catchError((e: HttpErrorResponse) => {
            const message: unknown = e.error?.message;
            const defaultMessage = 'An error occurred, please try again';
            return of(
              DiaryListActions.fetchingFailure({
                error: typeof message === 'string' ? message : defaultMessage,
              }),
            );
          }),
        ),
      ),
    );
  });
}
