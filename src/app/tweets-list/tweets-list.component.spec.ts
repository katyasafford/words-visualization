import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { TweetsListComponent } from './tweets-list.component';
import { TweetCardComponent } from './tweet-card/tweet-card.component';
import { TweetsService } from './tweets.service';
import { TopWordsService } from '../top-words/top-words.service';

describe('TweetsListComponent', () => {
  let component: TweetsListComponent;
  let fixture: ComponentFixture<TweetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TweetsListComponent,
        TweetCardComponent
      ],
      imports: [ MatCardModule ],
      providers: [
        TweetsService,
        TopWordsService,
        { provide: HttpClient, deps: [MockBackend] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTweets() should be called when component is created', () => {
    spyOn(component, 'getTweets');
    expect(component.getTweets).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(component.getTweets).toHaveBeenCalledTimes(1);
  });

  it('getTweets() should call getTopWords()', () => {
    spyOn(component.tweetsService, 'getTweetsByHashtag').and.returnValue(of({}));

    expect(component.tweetsService.getTweetsByHashtag).not.toHaveBeenCalled();
    component.getTweets();
    expect(component.tweetsService.getTweetsByHashtag).toHaveBeenCalledTimes(1);
  });

  it('isInvalid() should return true if word starts with & symbol', () => {
    expect(component.isInvalid('&test')).toBe(true);
  });

  it('isInvalid() should return true "is"', () => {
    expect(component.isInvalid('is')).toBe(true);
  });

  it('isInvalid() should return false for "anteater"', () => {
    expect(component.isInvalid('anteater')).toBe(false);
  });

  it('removeCommonWords() should remove common words provided by common-words npm package', () => {
    let testWords = ['I', 'be', 'will', 'anteater', 'honey', 'badger'];
    let expectedResult = ['anteater', 'honey', 'badger'];

    expect(component.removeCommonWords(testWords)).toEqual(expectedResult);
  });

  it('convertToLowerCase() should convert words to lower case', () => {
    let testWords = ['I', 'Baked', 'Cookies', 'today'];
    let expectedResult = ['i', 'baked', 'cookies', 'today'];

    expect(component.convertToLowerCase(testWords)).toEqual(expectedResult);
  })

});
