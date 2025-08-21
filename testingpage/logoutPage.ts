import { Page, expect } from '@playwright/test';

export default class logoutPage {
    readonly page: Page;
    readonly account = '#account-button'
    readonly logoutButton = 'text=logout';
    readonly container = '[data-testid="login-container"]';

    constructor(page: Page) {
        this.page = page;
    };

    async accountClick(){

        await expect(this.page.locator(this.account)).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.page.click(this.account);
        await expect(this.page.locator(this.logoutButton)).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.page.click(this.logoutButton);
    }

    async logoutNavigate()
    {
        await this.page.waitForURL('**/login');
        await expect(this.page.locator(this.container)).toBeVisible();
        await expect(this.page).toHaveURL('http://localhost:3000/login');
    }
};
