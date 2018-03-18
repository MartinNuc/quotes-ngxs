import { AppPage } from './app.po';

describe('quotes-ngxs App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it(`should load quote and print it's author`, async () => {
    page.navigateTo();
    const author = await page.getAuthorText();
    expect(author.length).toBeGreaterThan(0);
  });
});
