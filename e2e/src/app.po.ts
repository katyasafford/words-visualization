import { browser, by, element } from 'protractor';

export class AppPage {

  navigateToHomeRoute() {
    return browser.get('/');
  }
  
}
