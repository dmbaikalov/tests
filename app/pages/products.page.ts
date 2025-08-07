import {Locator } from "@playwright/test";
import { BasePage } from "./abstract.classes";

export class ProductsPage extends BasePage {
    readonly headerTitle: Locator = this.page.locator('.title');
    readonly productSortContainer: Locator = this.page.locator('[data-test="product-sort-container"]');
    readonly shoppingCartBadge: Locator = this.page.locator('.shopping_cart_badge');
    readonly shoppingCartLink: Locator = this.page.locator('.shopping_cart_link');


    async addProductToCart(productName: string) {
        // Playwright can create a dynamic locator to find the button next to the product name
        const productContainer = this.page.locator('.inventory_item').filter({ hasText: productName });
        await productContainer.locator('button', { hasText: 'Add to cart' }).click();
    }

    async sortProducts(option: 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)') {
        await this.productSortContainer.selectOption({ label: option });
    }

    async getProductNames(): Promise<string[]> {
        return this.page.locator('.inventory_item_name').allInnerTexts();
    }

    async getProductPrices(): Promise<number[]> {
        const pricesText = await this.page.locator('.inventory_item_price').allInnerTexts();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async clickCartIcon() {
        await this.shoppingCartLink.click();
    }
}