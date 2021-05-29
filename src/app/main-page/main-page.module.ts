
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MainWrapperComponent } from './components/main-wrapper/main-wrapper.component';
import { MainPageComponent } from './main-page.component';
import { NewsRowComponent } from './components/news-row/news-row.component';
import { CommonModule } from '@angular/common';
import { MainPagePresenter } from './presenter/main-page.presenter';
import { NewsService } from './services/news.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalModule } from '../delete-modal/delete-modal.module';

@NgModule({
  declarations: [
    MainPageComponent,
    MainWrapperComponent,
    NewsRowComponent
  ],
  imports: [CommonModule, HttpClientModule, ModalModule],
  providers: [MainPagePresenter, NewsService, HttpClient],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainPageModule { }
