import { TotePage } from './app.po';

describe('tote App', () => {
  let page: TotePage;

  beforeEach(() => {
    page = new TotePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Tote Betting!!');
  });
});
