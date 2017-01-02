import { CloudFrontendPage } from './app.po';

describe('cloud-frontend App', function() {
  let page: CloudFrontendPage;

  beforeEach(() => {
    page = new CloudFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
