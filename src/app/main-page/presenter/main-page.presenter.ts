import { Injectable } from "@angular/core";
import { Story } from "../models/story.model";

@Injectable() export class MainPagePresenter {
    private _news: Story[] = []

    get news(): Story[] {
        return this._news
    }

    addStory(story: Story) {
        this._news.push(story)
    }

    deleteStory(index: number) {
        this._news.splice(index, 1)
    }

    reset() {
        this._news = []
    }

}