import { CharlotteTrafficAccidentsPage } from './app.po';

describe('charlotte-traffic-accidents App', function() {
  let page: CharlotteTrafficAccidentsPage;

  beforeEach(() => {
    page = new CharlotteTrafficAccidentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
