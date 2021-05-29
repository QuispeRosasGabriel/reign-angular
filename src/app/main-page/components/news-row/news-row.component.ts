import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Story } from '../../models/story.model';

@Component({
  selector: 'news-row',
  templateUrl: './news-row.component.html',
  styleUrls: ['./news-row.component.scss']
})
export class NewsRowComponent implements OnInit {

  @Input() story: Story
  @Input() index: number
  @Output() deleteStory: EventEmitter<number> = new EventEmitter<number>()
  deleteSelected: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  goToUrl(): void {
    if (!this.deleteSelected) {
      window.open(this.story.url, "")
    }
    this.deleteSelected = false
  }

  deleteRow(): void {
    this.deleteSelected = true
    this.deleteStory.emit(this.index)
  }
}
