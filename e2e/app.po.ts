import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAuthorText() {
    return element(by.css('app-random-quote h1')).getText();
  }
}
