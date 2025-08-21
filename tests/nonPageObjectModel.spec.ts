import { test, expect } from '@playwright/test';

test("valid Login", async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('#username', 'a');
    await page.waitForTimeout(1000);
    await page.fill('#password', 'a');
    await page.waitForTimeout(1000);

    await page.click('button:has-text("Login")');

    await page.waitForURL('**/dashboard');

    await expect(page.locator('[data-testid="dashboard-container"]')).toBeVisible();

    await expect(page).toHaveURL(/dashboard/);

    await expect(page.locator('#menu')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.click('#menu');

    const inventoryMaster = page.locator('#menu-inventorymaster');
    await expect(inventoryMaster).toBeVisible();
    await inventoryMaster.click();

    const rmItemGroup = page.locator('#submenu-rmitemgroup');
    await page.waitForTimeout(1000);
    await expect(rmItemGroup).toBeVisible();
    await rmItemGroup.click();

    await expect(page.locator('#AddRmGroup')).toBeVisible();
    await page.click('#AddRmGroup');

    await page.fill('#item_group', 'Spices');

    await page.click('#submit');


    await expect(page.locator('#menu')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.click('#menu');

    const inventoryMastersAgain = page.locator('#menu-inventorymaster');
    await expect(inventoryMastersAgain).toBeVisible();
    await inventoryMastersAgain.click();

    const rmItemSubGroup = page.locator('#submenu-rmitemsubgroup');
    await page.waitForTimeout(1000);
    await expect(rmItemSubGroup).toBeVisible();
    await rmItemSubGroup.click();

    const button = page.locator('#AddRm-Button');
    await expect(button).toBeVisible();
    await button.click();

    await page.fill('#item', 'pepper powder');

    await page.check('input[name="is_taxable"]');
    await page.check('input[name="is_stockable"]');

    await page.click('#item_group');
    await page.click('ul[role="listbox"] >> text=Spices');

    await page.check('input[name="status"][value="active"]');

    await page.click('#submit');

    await expect(page.locator('#account-button')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.click('#account-button');

    await expect(page.locator('text=Logout')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.click('text=Logout');

    await page.waitForURL("**/login");

    await expect(page.locator('[data-testid="login-container"]')).toBeVisible();

    await expect(page).toHaveURL(/login/);

});
