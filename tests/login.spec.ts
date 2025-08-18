import { test, expect } from '@playwright/test';

test("valid Login", async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('#username', 'a');
    await page.waitForTimeout(1000);
    await page.fill('#password', 'a');
    await page.waitForTimeout(1000);
    await page.click('#username');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Control+A');
    await page.fill('#username', 'b');
    await page.waitForTimeout(1000);

    await page.click('#password');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Control+A');
    await page.fill('#password', 'c');

    await page.click('button:has-text("Login")');

    await page.click('#password');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Control+A');
    await page.fill('#password', 'b');

    await page.click('button:has-text("Login")');

    await page.waitForURL('**/dashboard');

    await expect(page.locator('[data-testid="dashboard-container"]')).toBeVisible({ timeout: 15000 });

    await expect(page).toHaveURL(/dashboard/);

    
});
