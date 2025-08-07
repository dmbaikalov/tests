import { test, expect } from "../../fixtures/fixtures";
import { testData } from "../../testdata/user.credentials";

test.describe('SauceDemo Products sorting functionality', () => {

    test('User is able to sort the product by Price', async ({ app }) => {
        const userData = testData.users.standard;

        await test.step('Login to the application', async () => {
            await app.login.open();
            await app.login.login(userData.username, userData.password);
            await expect(app.products.headerTitle).toHaveText('Products');
    });

        await test.step('Sorting the products by Price (low to high)', async () => {
            await app.products.sortProducts('Price (low to high)');
     });

        await test.step('Validating that products is sorted correctly', async () => {
            let prices = await app.products.getProductPrices();
            expect(prices).toEqual([...prices].sort((a, b) => a - b));
     });
  });   

  test('User is able to sort the product by Name', async ({ app }) => {
        const userData = testData.users.standard;

        await test.step('Login to the application', async () => {
            await app.login.open();
            await app.login.login(userData.username, userData.password);
            await expect(app.products.headerTitle).toHaveText('Products');
    });

        await test.step('Sorting the products by Name (Z to A)', async () => {
            await app.products.sortProducts('Name (Z to A)');
     })

        await test.step('Validating that products is sorted correctly', async () => {
            let names = await app.products.getProductNames();
            expect(names).toEqual([...names].sort().reverse());
     });
    
  });
 })