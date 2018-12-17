import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material';
import { TagCloudModule } from 'angular-tag-cloud-module';

import { AppComponent } from './app.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { TweetsListComponent } from './tweets-list/tweets-list.component';
import { TweetCardComponent } from './tweets-list/tweet-card/tweet-card.component';
import { TweetsService } from './tweets-list/tweets.service';
import { TopWordsService } from './top-words/top-words.service';

@NgModule({
  declarations: [
    AppComponent,
    WordCloudComponent,
    TweetsListComponent,
    TweetCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    TagCloudModule
  ],
  providers: [
    TweetsService,
    TopWordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
