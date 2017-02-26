import { Ng2HangmanPage } from './app.po';

describe('Ng2 Hangman App', () => {
  let page: Ng2HangmanPage;

  beforeEach(() => {
    page = new Ng2HangmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
