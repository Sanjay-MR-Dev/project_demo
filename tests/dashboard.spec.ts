import { test, expect } from '@playwright/test';


test("DashBoard", async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');

    await expect(page.locator('#account-button')).toBeVisible({timeout : 15000});
    await page.waitForTimeout(1000);

    await page.click('#account-button');

    await expect(page.locator('text=Logout')).toBeVisible({timeout : 5000});
    await page.waitForTimeout(1000);
    await page.click('text=Logout');

    await page.waitForURL("**/login");

    await expect(page.locator('[data-testid="login-container"]')).toBeVisible({ timeout: 15000 });

    await expect(page).toHaveURL(/login/);

});
