import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Diary } from '../../models/diary';
import { DiaryApi } from '../../services/diary-api';

type PageState<T> =
  | { status: 'idle' }
  | { status: 'fetching' }
  | { status: 'fetching_success'; data: T }
  | { status: 'fetching_failure'; error: string };

@Component({
  imports: [RouterLink],
  selector: 'app-diary-list-page',
  styleUrl: './diary-list-page.css',
  templateUrl: './diary-list-page.html',
})
export class DiaryListPage implements OnInit {
  private readonly diaryApi = inject(DiaryApi);

  readonly state = signal<PageState<Diary[]>>({ status: 'idle' });

  ngOnInit(): void {
    this.loadDiaryList();
  }

  loadDiaryList(): void {
    const current = this.state();

    if (current.status === 'fetching') {
      return;
    }

    this.state.set({ status: 'fetching' });

    this.diaryApi.findAll().subscribe({
      next: (data: Diary[]) => {
        this.state.set({
          status: 'fetching_success',
          data: data,
        });
      },
      error: (e: HttpErrorResponse) => {
        this.state.set({
          status: 'fetching_failure',
          error: e.error?.message ?? 'An error occurred, please try again',
        });
      },
    });
  }
}
