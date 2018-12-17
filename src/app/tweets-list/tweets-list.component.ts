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
  public retrievedTweets;
  public topWords = [];

  constructor(public tweetsService: TweetsService,
              private topWordsService: TopWordsService) {}

  ngOnInit() {
    this.getTweets();
  }

  /** remove common words using common-words npm package */
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
    * so that we can get all common words out */
  public convertToLowerCase(words): string[] {
    return words.map(word => word.toLowerCase());
  }

  /** parse tweets, clean them up and get top words */
  public getTopWords(): void {
    let allTweetsText = '';
    let parsedTweets = [];
    let lowercaseParsedTweets = [];
    let noCommonWords = [];

    for (let i in this.retrievedTweets) {
      allTweetsText = allTweetsText.concat(this.retrievedTweets[i].text);
    }

    parsedTweets = allTweetsText.split(" ");
    lowercaseParsedTweets = this.convertToLowerCase(parsedTweets);
    noCommonWords = this.removeCommonWords(lowercaseParsedTweets);
    noCommonWords = this.doAdditionalCleanUp(noCommonWords);

    this.topWords = mostCommon(noCommonWords, 20);
    this.topWordsService.broadcast(this.topWords);
  }

  private doAdditionalCleanUp(words): string[] {
    for (let i in words) {
      if (words[i] !== -1) {
        if (this.isInvalid(words[i])) {
          words.splice(i, 1);
        }
      }
    }
    return words;
  }

  /** common-words package helped us get rid us of 100 most common words
  * but there are still additional symbols, hashtags and numbers we'll filter out */
  public isInvalid(word): boolean {
    let isUnacceptedValue = (word === '=' || word === '-' || word === 'it\'s'|| word === 'are'|| word === 'is'|| !isNaN(word));
    let startsWithIncorrectSymbol = (word.charAt(0) === '#' ||  word.charAt(0) === '&' || word.charAt(0) === '@');

    return isUnacceptedValue || startsWithIncorrectSymbol;
  }

  public getTweets(): void {
    this.tweetsService.getTweetsByHashtag()
      .subscribe(res => {
        this.retrievedTweets = res['statuses'];
        this.getTopWords();
      });
  }

}
