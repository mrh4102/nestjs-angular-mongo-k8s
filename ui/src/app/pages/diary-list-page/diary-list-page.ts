import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { DiaryList } from '../../components/diary-list/diary-list';
import { DiaryListActions } from '../../state/diary-list/diary-list.actions';
import { selectDiaryListState } from '../../state/diary-list/diary-list.selectors';

@Component({
  imports: [RouterLink, DiaryList],
  selector: 'app-diary-list-page',
  styleUrl: './diary-list-page.css',
  templateUrl: './diary-list-page.html',
})
export class DiaryListPage implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly state = this.store.selectSignal(selectDiaryListState);

  ngOnInit(): void {
    this.store.dispatch(DiaryListActions.fetchingData());
  }

  handleItemClick(itemId: string) {
    this.router.navigate(['/', itemId]);
  }
}
