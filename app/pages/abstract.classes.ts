import { Page, expect, Locator } from "@playwright/test";

export abstract class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class BasePage extends PageHolder {
  public pagePath: string = `${process.env.BASE_URL}`;

  async open(path: string = '/', anotherPath?: string) {
    await this.page.goto(anotherPath || path);
  }

  async isOpen(expected_url?: string) {
    expect(this.page.url()).toBe(
      expected_url || `${process.env.BASE_URL}${this.pagePath}`
    );
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async wait(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async isElementsVisible(selector: Locator) {
    await expect(selector).toBeVisible();
  }

  async isElementNotVisible(selector: Locator) {
    expect(selector).toBeHidden();
  }
}