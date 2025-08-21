import { Page, expect } from '@playwright/test';


export default class ItemSubGroupPage {
    readonly page: Page;
    readonly menu = '#menu';
    readonly inventoryMaster = '#menu-inventorymaster';
    readonly rmItemSubGroup = '#submenu-rmitemsubgroup';
    readonly addRmButton = '#AddRm-Button';
    readonly item = '#item';
    readonly itemgroup = '#item_group';
    readonly deleteRow = '#deleteItemMaster';

    readonly submit = '#submit';

    constructor(page: Page) {
        this.page = page;
    }

    async menuClick() {
        await expect(this.page.locator(this.menu)).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.page.click(this.menu);
    }

    async gotoSubGroup() {
        await expect(this.page.locator(this.inventoryMaster)).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.page.click(this.inventoryMaster);

        await expect(this.page.locator(this.rmItemSubGroup)).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.page.click(this.rmItemSubGroup);

    }
    async addItemSubGroup(value: string, group: string) {
        await expect(this.page.locator(this.addRmButton)).toBeVisible();
        await this.page.click(this.addRmButton);

        await this.page.fill(this.item, value);

        await this.page.click(this.itemgroup);
        await this.page.click(`ul[role="listbox"] >> text=${group}`);

        await this.page.check('input[name="is_taxable"]');
        await this.page.check('input[name="is_stockable"]');

        await this.page.check('input[name="status"][value="active"]');

        await this.page.click(this.submit);

    }


}