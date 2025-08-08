import { test, expect } from "../../fixtures/fixtures";
import { userData } from "../../testdata/user.credentials";

test.describe('SauceDemo Functionality', () => {

  test('User is able to purchase a product', async ({ app, page }) => {
    const usersData = userData.users.standard;

    await test.step('Login to the application', async () => {
      await app.login.open();
      await app.login.login(usersData.username, usersData.password);
      await expect(app.products.headerTitle).toHaveText('Products');
    });

    await test.step('Add an item and proceed to checkout', async () => {
      await app.products.addProductToCart('Sauce Labs Backpack');
      await expect(app.products.shoppingCartBadge).toHaveText('1');
      await app.products.clickCartIcon();
      await expect(page).toHaveURL(/.*cart.html/);
    });

    await test.step('Verify item total and enter user info', async () => {
      const itemPrices = await app.cart.getIndividualItemPrices();
      expect(itemPrices.length).toBeGreaterThan(0);
      await app.cart.clickCheckoutButton();
      await expect(page).toHaveURL(/.*checkout-step-one.html/);
      await app.checkout.enterInformation('John', 'Doe', '12345');
    });

    await test.step('Verify final total with tax', async () => {
      await expect(page).toHaveURL(/.*checkout-step-two.html/);
      const subtotal = await app.checkout.getSubtotal();
      const tax = await app.checkout.getTaxAmount();
      const total = await app.checkout.getTotalAmount();
      
      const expectedTax = parseFloat((subtotal * 0.08).toFixed(2));
      const expectedTotal = subtotal + expectedTax;

      expect(tax).toBe(expectedTax);
      expect(total).toBe(expectedTotal);
    });

    await test.step('Finish the purchase', async () => {
      await app.checkout.clickFinishButton();
      await expect(page).toHaveURL(/.*checkout-complete.html/);
      await expect(app.checkout.checkoutBanner).toHaveText('Thank you for your order!');
    });
  });

});