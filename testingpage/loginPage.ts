import { Page, expect } from '@playwright/test';

export default class LoginPage {
    readonly page: Page;
    readonly username = '#username';
    readonly password = '#password';
    readonly loginButton = 'button:has-text("Login")';
    readonly container = '[data-testid="dashboard-container"]';

    
    constructor(page: Page) {
        this.page = page;
    };

    async goto() {
        await this.page.goto('http://localhost:3000/login');
    }

    async loginData(user : string, pass : string){
        await this.page.fill(this.username,user);
        await this.page.waitForTimeout(1000);
        await this.page.fill(this.password,pass);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.loginButton);
    }

    async loginNavigate()
    {
        await this.page.waitForURL('**/dashboard');
        await expect(this.page.locator(this.container)).toBeVisible();
        await expect(this.page).toHaveURL('http://localhost:3000/dashboard');
    }
};
