import { Component, input, output } from '@angular/core';
import { Diary } from '../../models/diary';

@Component({
  imports: [],
  selector: 'app-diary-list',
  styleUrl: './diary-list.css',
  templateUrl: './diary-list.html',
})
export class DiaryList {
  data = input.required<Diary[]>();
  itemClicked = output<string>();

  handleItemClick(item: Diary) {
    this.itemClicked.emit(item._id);
  }
}
