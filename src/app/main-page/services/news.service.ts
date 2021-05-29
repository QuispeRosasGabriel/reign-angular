import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Story } from "../models/story.model";

@Injectable() export class NewsService {

    constructor(private http: HttpClient) { }

    getNews(page: number): Observable<Story[]> {
        return this.http.get<Story[]>(`/story?take=${page}&limit=20`).pipe(
            map((response: Story[]) => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                throw new Error(error.error.toString())
            })
        )
    }

    getNumberOfStories(): Observable<string> {
        return this.http.get<string>(`/story/countDocuments`).pipe(
            map((response: string) => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                throw new Error(error.error.toString())
            })
        )
    }

    deleteStory(id: string): Observable<any> {
        return this.http.patch("/story/" + id, {active:0}).pipe(
            catchError((error: HttpErrorResponse) => {
                throw new Error(error.error.toString())
            })
        )
    }
}