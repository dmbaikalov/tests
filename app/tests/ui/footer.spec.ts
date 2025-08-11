import { test, expect } from '../../fixtures/fixtures';
import { userData } from '../../testdata/user.credentials';
import { footerLinks } from '../../testdata/footer.links';

test.describe('Footer Scenarios', () => {

    test('Footer is not visible when logged out', async ({ app }) => {
        await test.step('Check that footer is not visible', async () => {
            await expect(app.footer.footerContainer).not.toBeVisible();
    });
  });

   test('Footer is visible when logged in', async ({ app }) => {
    const { username, password } = userData.users.standard
        await test.step('Login to the application', async () => {
            await app.login.open();
            await app.login.login(username, password);
            await expect(app.products.headerTitle).toHaveText('Products');
    });

        await test.step('Check that footer is visible', async () => {
            await expect(app.footer.footerContainer).toBeVisible();
    });
  });

    for (const { icon, tabName, expectedUrl } of footerLinks) {
        test(`Validating that clicking ${icon} icon in the Footer redirects to correct URL`, async ({ app, context }) => {
        
        await test.step('Login to the application', async () => {
            await app.login.open();
            await app.login.login('standard_user', 'secret_sauce');
            await expect(app.products.headerTitle).toHaveText('Products');
        });

        await test.step(`Click ${icon} icon in footer`, async () => {
            await app.footer.clickFooterIcon(icon);
        });

        await test.step(`Verify ${tabName} tab URL`, async () => {
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                app.footer.clickFooterIcon(icon),
                ]);
            await newPage.waitForLoadState('load');
            await expect(newPage).toHaveURL(expectedUrl);
        });
        });
  }
});