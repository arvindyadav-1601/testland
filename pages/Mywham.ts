import { Page, expect, Locator } from '@playwright/test';

export class HomePage {

    private readonly page: Page;
    //locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;


    //constructor
    constructor(page: Page) {

        this.page = page;
        this.lnkMyAccount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('#search button[type="button"]');

    }

    //action methods

    // Check if HomePage exists
    async isHomePageExists() {

        let title: string = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }

    // Click "My Account" link
    async clickMyAccount() {
        try {
            await this.lnkMyAccount.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    // Click "Register" link
    async clickRegister() {
        try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Register': ${error}`);
            throw error;
        }
    }

    // Click "Login" link
    async clickLogin() {
        try {
            await this.linkLogin.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Login': ${error}`);
            throw error;
        }
    }

    // Enter product name in the search box
    async enterProductName(pName: string) {
        try {
            await this.txtSearchbox.fill(pName);
        } catch (error) {
            console.log(`Exception occurred while entering product name: ${error}`);
            throw error;
        }
    }

    // Click the search button
    async clickSearch() {
        try {
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Search': ${error}`);
            throw error;
        }
    }


}

export class Mywham {
    private readonly page: Page;
    //Locators
    private readonly reminderstartdate: Locator;
    private readonly reminderenddate: Locator;
    private readonly expirationstartdate: Locator;
    private readonly expirationenddate: Locator;
    private readonly createdonstartdate: Locator;
    private readonly createdonenddate: Locator;
    private readonly updatedonstartdate:Locator;
    private readonly updatedonenddate:Locator;

    //cunstroctor
    constructor(page:Page){
        this.page=page;
        this.reminderstartdate=page.getByRole('textbox', { name: 'Starting Reminder Date' });
        this.reminderenddate=page.getByRole('textbox', { name: 'Ending Reminder Date' });
        this.expirationstartdate=page.getByRole('textbox', { name: 'Starting Expiration Date' });
        this.expirationenddate=page.getByRole('textbox', { name: 'Ending Expiration Date' });
        this.createdonstartdate=page.getByRole('textbox', { name: 'Starting Created on Date' });
        this.createdonenddate=page.getByRole('textbox', { name: 'Ending Created on Date' });
        this.updatedonstartdate=page.getByRole('textbox', { name: 'Starting Updated on Date' });
        this.updatedonenddate=page.getByRole('textbox', { name: 'Ending Updated on Date' });

        this.page.getByRole('textbox', { name: 'Ending Reminder Date' })
    }

}