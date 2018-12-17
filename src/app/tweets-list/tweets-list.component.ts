import { Component, OnInit } from '@angular/core';
import commonWords from 'common-words';
import mostCommon from 'most-common';

import { TweetsService } from './tweets.service';
import { TopWordsService } from '../top-words/top-words.service';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {
  private hashtag = 'IoT';
  private limit = 100;
  private resultType = 'recent';

  public retrievedTweets;
  //public parsedTweets = [];
  public topWords = [];

  constructor(private tweetsService: TweetsService,
              private topWordsService: TopWordsService) {}

  //try to send request in server.js like I did here - using headers etc and not twitter package
  ngOnInit() {
    this.getTweets();
  }

  public removeCommonWords(words): string[] {
    let filteredWords = [];
    commonWords.forEach(obj => {
      let commonWord = obj.word;
      while (words.includes(commonWord)) {
        words = words.filter(word => word !== commonWord);
      }
    });

    return words;
  };

  /** let's convert all words to lower case
  * so that we can get all common words out*/
  public convertToLowerCase(words): string[] {
    return words.map(word => word.toLowerCase());
  }

  public parseAllTweetsIntoWords(): void {
    let allTweetsText = '';
    let parsedTweets = [];
    let lowercaseParsedTweets = [];
    let noCommonWords = [];

    for (let i in this.retrievedTweets) {
      allTweetsText = allTweetsText.concat(this.retrievedTweets[i].text);
    }

    parsedTweets = allTweetsText.split(" ");
    console.log('parsedTweets: ', parsedTweets);
    lowercaseParsedTweets = this.convertToLowerCase(parsedTweets);
    noCommonWords = this.removeCommonWords(lowercaseParsedTweets);
    //console.log('noCommonWords: ', noCommonWords);
    noCommonWords = this.doAdditionalCleanUp(noCommonWords);
    this.topWords = mostCommon(noCommonWords, 20);
    this.topWordsService.broadcast(this.topWords);
    //console.log(this.topWords);
  }

  /** common-words package helped us get rid us of 100 most common words
  * but there are still additional symbols, hashtags and numbers we'll filter out */
  public doAdditionalCleanUp(words): string[] {
    for (let i in words) {
      if (words[i] !== -1) {
        if (this.isInvalid(words[i])) {
          words.splice(i, 1);
        }
      }
    }
    return words;
  }

  private isInvalid(word): boolean {
    let isUnacceptedValue = (word === '=' || word === '-' || word === 'it\'s'|| word === 'are'|| word === 'is'|| !isNaN(word));
    let startsWithIncorrectSymbol = (word.charAt(0) === '#' ||  word.charAt(0) === '&' || word.charAt(0) === '@');

    return isUnacceptedValue || startsWithIncorrectSymbol;
  }

  private getTweets(): void {
    this.tweetsService.getTweetsByHashtag(this.hashtag, this.limit, this.resultType)
      .subscribe(res => {
        //console.log('res: ', res);
        this.retrievedTweets = res['statuses'];
        this.parseAllTweetsIntoWords();
      });

    //this.tweetsService.user().subscribe(user => console.log('user: ', user));
  }

}
