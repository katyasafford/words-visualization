import { browser, element , by } from 'protractor';

import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a word cloud with 20 words', () => {
      page.navigateToHomeRoute();

      let topWords = element.all(by.css('angular-tag-cloud span'));
      expect(topWords.count()).toEqual(20);
  });

  it('should display 100 mat-cards with tweets content', () => {
    page.navigateToHomeRoute();

    let tweetCards = element.all(by.css('mat-card'));
    let tweetCardContent = element.all(by.css('mat-card-content p'));

    expect(tweetCards.count()).toEqual(100);
    expect(tweetCardContent.getText()).not.toBeNull();
  });

});
