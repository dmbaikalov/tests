import { Page, Locator } from "@playwright/test";
import { BasePage } from "./abstract.classes";

export class CartPage extends BasePage {
    readonly checkoutButton: Locator = this.page.locator('[data-test="checkout"]');

    async getIndividualItemPrices(): Promise<number[]> {
        const pricesText = await this.page.locator('.inventory_item_price').allInnerTexts();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}