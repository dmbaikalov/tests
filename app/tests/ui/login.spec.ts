import { test, expect } from "../../fixtures/fixtures";
import { userData } from "../../testdata/user.credentials";


test.describe('SauceDemo Functionality', () => {

    test('User is able to login with valid credentials', async({ app }) => {
        const usersData = userData.users.standard;
        await app.login.open();
        await app.login.login(usersData.username, usersData.password);
        await expect(app.products.headerTitle).toHaveText('Products');
    })
    test('User is not able to login with invalid credentials', async({ app }) => {       
        const user = userData.users.locked;
        await app.login.open()
        await app.login.login(user.username, user.wrong_password);
        await expect(app.login.errorMessage).toHaveText(/Username and password do not match any user/);
    })

})