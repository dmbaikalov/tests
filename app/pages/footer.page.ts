import {  Locator } from '@playwright/test';
import { BasePage } from './abstract.classes';

export class FooterPage extends BasePage {

   readonly footerContainer: Locator = this.page.locator('footer.footer');
   readonly twitterLink: Locator = this.page.locator('a[href*="twitter.com"]');
   readonly facebookLink: Locator = this.page.locator('a[href*="facebook.com"]');
   readonly linkedinLink: Locator = this.page.locator('a[href*="linkedin.com"]');

  async clickFooterIcon(iconName: string): Promise<void> {
    switch (iconName) {
      case 'Twitter':
        await this.twitterLink.click();
        break;
      case 'Facebook':
        await this.facebookLink.click();
        break;
      case 'LinkedIn':
        await this.linkedinLink.click();
        break;
      default:
        throw new Error(`Unknown footer icon: ${iconName}`);
    }
  }
}