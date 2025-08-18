import { test, expect } from '@playwright/test';


test("Inventory-Group" ,async({page}) => {
    await page.goto('http://localhost:3000/inventory/rm-group-master');

    await expect(page.locator('#AddRm-Button')).toBeVisible({timeout : 15000});
    await page.click('#AddRm-Button');

    const modal = page.locator('#AddRm-Modal');
    await expect(modal).toBeVisible({timeout : 150000});

    await page.fill('#item','Testing');
    await page.selectOption('#item_group',{label : 'Vegetable' });

    await page.check('input[name="is_taxable"]');
    await page.check('input[name="is_stockable"]');

    await page.check('input[name="status][value="active"]');

    await page.click('button:has-text("Submit")');

    await expect(modal).toBeHidden({timeout : 5000});

});