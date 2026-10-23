import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { DiaryList } from '../../components/diary-list/diary-list';
import { Diary } from '../../models/diary';
import { DiaryApi } from '../../services/diary-api';
import { DiaryListActions } from '../../state/diary-list/diary-list.actions';
import { selectDiaryListState } from '../../state/diary-list/diary-list.selectors';

@Component({
  imports: [RouterLink, DiaryList],
  selector: 'app-diary-list-page',
  styleUrl: './diary-list-page.css',
  templateUrl: './diary-list-page.html',
})
export class DiaryListPage implements OnInit {
  private readonly diaryApi = inject(DiaryApi);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly state = this.store.selectSignal(selectDiaryListState);

  ngOnInit(): void {
    this.loadDiaryList();
  }

  loadDiaryList(): void {
    const current = this.state();

    if (current.status === 'fetching') {
      return;
    }

    this.store.dispatch(DiaryListActions.fetchingData());

    this.diaryApi.findAll().subscribe({
      next: (data: Diary[]) => {
        this.store.dispatch(DiaryListActions.fetchingSuccess({ data }));
      },
      error: (e: HttpErrorResponse) => {
        const message: unknown = e.error?.message;
        const defaultMessage = 'An error occurred, please try again';
        const error = typeof message === 'string' ? message : defaultMessage;
        this.store.dispatch(DiaryListActions.fetchingFailure({ error }));
      },
    });
  }

  handleItemClick(itemId: string) {
    this.router.navigate(['/', itemId]);
  }
}
