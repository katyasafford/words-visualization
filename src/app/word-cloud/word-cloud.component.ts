import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { Subscription } from 'rxjs';

import { TopWordsService } from '../top-words/top-words.service';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  public topWords;
  private topWordsSubscription: Subscription;

  private options: CloudOptions = {
    width : 1000,
    height : 400,
    randomizeAngle: true,
    overflow: true
  };

  private zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.5,
    transitionTime: 1.2
  };

  constructor(private topWordsService: TopWordsService) {}

  ngOnInit() {
    this.topWordsSubscription = this.topWordsService.topWords.subscribe(value => {
      this.topWords = value;
      this.adjustKeyNames(this.topWords);
    });
  }

  /** common-words package gave us words in a format that
    * angular-tag-cloud package doesn't recognize
    * let's adjust it here */
  public adjustKeyNames(topWordsData): void {
    topWordsData.forEach(data => {
      data.text = data.token;
      delete data.token;

      data.weight = data.count;
      delete data.count;
    });
  }

  ngOnDestroy() {
    if (this.topWordsSubscription) {
      this.topWordsSubscription.unsubscribe();
    }
  }

}
