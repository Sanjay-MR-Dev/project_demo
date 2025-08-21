import { Page, expect } from '@playwright/test';


export class ItemGroupPage {
    readonly page: Page;
    readonly menu = '#menu';
    readonly inventoryMaster = '#menu-inventorymaster';
    readonly rmItemGroup = '#submenu-rmitemgroup';
    readonly addRmGroup = '#AddRmGroup';
    readonly itemgroup = '#item_group';
    readonly deleteRow = '#deleteItemGroup';
    readonly delete = '#delete';
    readonly editRow = '#editItemGroup';
    readonly submit = '#submit';

    constructor(page: Page) {
        this.page = page;
    }

    async menuClick() {
        await expect(this.page.locator(this.menu)).toBeVisible();
        await this.page.click(this.menu);
    }


    async gotoSubGroup() {

        await expect(this.page.locator(this.inventoryMaster)).toBeVisible();
        await this.page.click(this.inventoryMaster);

        await expect(this.page.locator(this.rmItemGroup)).toBeVisible();
        await this.page.click(this.rmItemGroup);

    }
    async addItemGroup(name: string) {
        await expect(this.page.locator(this.addRmGroup)).toBeVisible();
        await this.page.click(this.addRmGroup);

        await this.page.fill(this.itemgroup, name);

        await this.page.click(this.submit);

    }

    async deleteItemGroup(row: number) {

        const deleteButtons = this.page.locator(this.deleteRow);
        await expect(deleteButtons.nth(row)).toBeVisible();
        await deleteButtons.nth(row).click();

        await this.page.click(this.delete);

    };

    async editItemGroup(row : number,name : string){
        const editButtons = this.page.locator(this.editRow);
        await expect(editButtons.nth(row)).toBeVisible();
        await editButtons.nth(row).click();

        await this.page.fill(this.itemgroup,name);
        await expect(this.page.locator(this.submit)).toBeVisible();
        await this.page.click(this.submit);
    }

}