import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
    
  // Locators
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.btnLogin = page.getByRole('button', { name: 'Sign In' });
  }

  // Navigate to URL
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  // Fill username
  async enterUsername(user: string): Promise<void> {
    await this.username.fill(user);
  }

  // Fill password
  async enterPassword(pass: string): Promise<void> {
    await this.password.fill(pass);
  }

  // Click login button
  async clickLogin(): Promise<void> {
    await this.btnLogin.click();
  }

  // Full login action
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // Assertions
  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.btnLogin).toBeVisible();
  }

  // Example: verify successful login (adjust selector)
  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard|home/i);
  }

  // Example: verify login failure message (adjust selector/text)
  async verifyLoginError(): Promise<void> {
    const errorMsg = this.page.locator('text=Invalid username or password');
    await expect(errorMsg).toBeVisible();
  }
}