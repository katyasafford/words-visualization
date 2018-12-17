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
  private topWords;
  private topWordsSubscription: Subscription;

  private options: CloudOptions = {
    width : 1000,
    height : 400,
    randomizeAngle: true,
    overflow: true
  };

  private zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.5, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
  };

  constructor(private topWordsService: TopWordsService) {}

  ngOnInit() {
    this.topWordsSubscription = this.topWordsService.topWords.subscribe(value => {
      this.topWords = value;
      this.adjustKeyNames(this.topWords);
      //this.enlargeWordCloud(this.topWords);
      console.log('new topWords: ', this.topWords);
    });
  }

  private adjustKeyNames(topWordsData): void {
    topWordsData.forEach(data => {
      data.text = data.token;
      delete data.token;

      data.weight = data.count;
      delete data.count;
    });
  }


  private enlargeWordCloud(topWordsData): void {
    topWordsData.forEach(data => {
      data.weight = data.weight*5;
    })
  }

  ngOnDestroy() {
    if (this.topWordsSubscription) {
      this.topWordsSubscription.unsubscribe();
    }
  }

}
