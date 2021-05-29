import { Component, OnInit } from '@angular/core';
import { ModalService } from '../delete-modal/delete-modal.service';
import { Story } from './models/story.model';
import { MainPagePresenter } from './presenter/main-page.presenter';
import { NewsService } from './services/news.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  pageArray = [1, 2, 3, 4, 5]
  currentIndex: number
  today: Date = new Date()
  page: number = 1
  pages: number
  showNext: boolean = true
  constructor(public presenter: MainPagePresenter,
    private newsService: NewsService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.newsService.getNumberOfStories().subscribe(numberOfStories => {
      this.pages = Math.ceil(Number(numberOfStories)/20)
      this.goToPage(1)
    })
  }

  getNews(): void {
    this.newsService.getNews(this.page).subscribe(newsResponse => {
      newsResponse.map((story: Story) => {
        var s = new Story()
        s._id = story._id
        s.author = story.author
        s.title = story.title
        s.url = story.url
        s.createdAt = this.getDateFormat(story.createdAt)
        this.presenter.addStory(s)
      })
    },
      (err: Error) => {
        console.log(err)
      }
    )
  }

  getDateFormat(dateString: string): string {
    var date = new Date(dateString)

    var dd = date.getDate()
    var mm = date.toLocaleString('default', { month: 'short' });
    var yyyy = date.getFullYear()

    var ddToday = this.today.getDate()
    var mmToday = this.today.toLocaleString('default', { month: 'short' });
    var yyyyToday = this.today.getFullYear()

    if (yyyy !== yyyyToday) {
      return mm + " " + String(dd).padStart(2, '0') + ", " + yyyy
    } else if (mm !== mmToday) {
      return mm + " " + String(dd).padStart(2, '0')
    } else if (dd !== ddToday) {
      if (ddToday - dd == 1) {
        return "Yesterday"
      } else {
        return mm + " " + String(dd).padStart(2, '0')
      }
    } else {
      var hour = date.getHours()
      var ampm = "am"
      if (hour >= 12) {
        ampm = "pm"
        if (hour > 12) {
          hour = hour - 12
        }
      }
      return hour.toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + " " + ampm
    }
  }

  deleteStory() {
    this.newsService.deleteStory(this.presenter.news[this.currentIndex]._id).subscribe(() => {
      this.presenter.deleteStory(this.currentIndex)
      this.closeModal()
      this.presenter.reset()
      this.getNews()
    })
  }

  openModal(index: number) {
    this.modalService.open('delete-modal')
    this.currentIndex = index
  }

  closeModal() {
    this.modalService.close('delete-modal')
  }

  goToPage(num: number) {
    this.showNext = true
    if (num >= this.pages) {
      this.showNext = false
    }
    this.pageArray = []
    var init = num > 3 ? num - 2 : 1
    var end = num > 3 ? num + 2 : 5
    for (let i = init; i < end; i++) {
      if (i <= this.pages && i >= 1) {
        this.pageArray.push(i)
      }
    }
    this.page = num
    this.presenter.reset()
    this.getNews()

  }


}
