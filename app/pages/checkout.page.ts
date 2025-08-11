import { Page, Locator } from "@playwright/test";
import { BasePage } from "./abstract.classes";

export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator = this.page.locator('[data-test="firstName"]');
    readonly lastNameInput: Locator = this.page.locator('[data-test="lastName"]');
    readonly postalCodeInput: Locator = this.page.locator('[data-test="postalCode"]');
    readonly continueButton: Locator = this.page.locator('[data-test="continue"]');
    readonly finishButton: Locator = this.page.locator('[data-test="finish"]');
    readonly subtotalLabel: Locator = this.page.locator('.summary_subtotal_label');
    readonly taxLabel: Locator = this.page.locator('.summary_tax_label');
    readonly totalLabel: Locator = this.page.locator('.summary_total_label');
    readonly checkoutBanner: Locator = this.page.locator('.complete-header');

    async enterUserInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(zipCode);
        await this.continueButton.click();
    }
    
    private async getAmountFromLabel(locator: Locator): Promise<number> {
        const text = await locator.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    async getSubtotal(): Promise<number> {
        return this.getAmountFromLabel(this.subtotalLabel);
    }
    
    async getTaxAmount(): Promise<number> {
        return this.getAmountFromLabel(this.taxLabel);
    }

    async getTotalAmount(): Promise<number> {
        return this.getAmountFromLabel(this.totalLabel);
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}