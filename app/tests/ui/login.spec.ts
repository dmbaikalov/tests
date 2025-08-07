import { test, expect } from "../../fixtures/fixtures";
import { testData } from "../../testdata/user.credentials";


test.describe('SauceDemo Functionality', () => {

    test('User is able to login with valid credentials', async({ app }) => {
        const userData = testData.users.standard;
        await app.login.open();
        await app.login.login(userData.username, userData.password);
        await expect(app.products.headerTitle).toHaveText('Products');
    })
    test('User is not able to login with invalid credentials', async({ app }) => {       
        const user = testData.users.locked;
        await app.login.open()
        await app.login.login(user.username, user.wrong_password);
        await expect(app.login.errorMessage).toHaveText(/Username and password do not match any user/);
    })

})