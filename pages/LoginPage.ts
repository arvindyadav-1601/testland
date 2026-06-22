import {Page, Locator, expect} from "@playwright/test";


import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    // =====================================================
    // LOGIN LOCATORS
    // =====================================================

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    readonly loginButton: Locator;

    readonly loginErrorMessage: Locator;

    readonly welcomeMessage: Locator;

    readonly pageTitle: Locator;

    readonly loginSubtitle: Locator;

    readonly requiredFieldErrorForUsername: Locator;

    readonly requiredFieldErrorForPassword: Locator;

    readonly loggedInWelcome: Locator;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // USERNAME INPUT
        // =================================================

        this.usernameInput =
            page.getByRole(
                "textbox",
                { name: "Username" }
            );

        // =================================================
        // PASSWORD INPUT
        // =================================================

        this.passwordInput =
            page.getByRole(
                "textbox",
                { name: "Password" }
            );

        // =================================================
        // LOGIN BUTTON
        // =================================================

        this.loginButton =
            page.getByRole(
                "button",
                { name: "Sign In" }
            );

        // =================================================
        // LOGIN ERROR MESSAGE
        // =================================================

        this.loginErrorMessage =
        page.getByText(
            "Username or password is incorrect."
        );

        // =================================================
        // WELCOME MESSAGE
        // =================================================

        this.welcomeMessage = 
        page.getByRole(
            "heading", { name: "Welcome to Catalis" }
        );

        this.pageTitle = page.getByRole(
            "heading", { name: "Sign In To Account" }
        );

        this.loginSubtitle =
            page.getByText(
                "Login to begin"
            );

        // =================================================
        // REQUIRED FIELD ERROR
        // =================================================

        this.requiredFieldErrorForUsername =
            page.locator('li')
                .filter({ 
                    hasText: 'This value is required.' 
                }).first();

        this.requiredFieldErrorForPassword =
            page.locator('li')
                .filter({
                     hasText: 'This value is required.'
                 }).last();
            

        // =================================================
        // LOGGED IN WELCOME MESSAGE
        // =================================================

        this.loggedInWelcome =
            page.getByText(
                'Welcome GCS',
                { exact: false }
            );
    }

//Methods
    
    async verifyLoginPageLoaded(): Promise<void> {

        await expect(
            this.welcomeMessage
        ).toBeVisible();
    
        await expect(
            this.pageTitle
        ).toBeVisible();

        await expect(
            this.loginSubtitle
        ).toBeVisible();
    
        await expect(
            this.usernameInput
        ).toBeVisible();
    
        await expect(
            this.passwordInput
        ).toBeVisible();
    
        await expect(
            this.loginButton
        ).toBeVisible();
    }

    async verifyLoginError(): Promise<void> {

        await this.validateElementVisible(
            this.loginErrorMessage
        );
    }

    async verifyLoginSuccess(): Promise<void> {

        await expect(
            this.loggedInWelcome
        ).toBeVisible({
            timeout: 30_000
        });
    
    }

    async verifyRedirectedToLogin(): Promise<void> {

        await this.waitForUrlToMatch(
            /\/login\/index/i,
            10_000
        );
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.fillInput(
            this.usernameInput,
            username
        );

        await this.fillInput(
            this.passwordInput,
            password
        );

        await this.clickElement(
            this.loginButton
        );

        await this.verifyLoginSuccess();
    }

    async verifyRequiredFieldErrorForUsername(): Promise<void> {

        await this.validateElementVisible(
            this.requiredFieldErrorForUsername
        );
    }
    async verifyRequiredFieldErrorForPassword(): Promise<void> {
        await this.validateElementVisible(
            this.requiredFieldErrorForPassword
        );
    }    
    

}

/** 
    // =====================================================
    // PAGE NAVIGATION
    // =====================================================

    async goto(
        url: string
    ): Promise<void> {

        await this.navigateTo(url);
    }

    // =====================================================
    // LOGIN ACTIONS
    // =====================================================

    async enterUsername(
        username: string
    ): Promise<void> {

        await this.fillInput(
            this.usernameInput,
            username
        );
    }

    async enterPassword(
        password: string
    ): Promise<void> {

        await this.fillInput(
            this.passwordInput,
            password
        );
    }

    async clickLoginButton(): Promise<void> {

        await this.clickElement(
            this.loginButton
        );
    }

    

    // =====================================================
    // COMPLETE LOGIN FLOW
    // =====================================================

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.logStep(
            "Entering username"
        );

        await this.enterUsername(
            username
        );

        await this.logStep(
            "Entering password"
        );

        await this.enterPassword(
            password
        );

        await this.logStep(
            "Clicking login button"
        );

        await this.clickLoginButton();
    }

    async loginAndValidate(
        username: string,
        password: string
    ): Promise<void> {

        await this.login(
            username,
            password
        );

        await this.verifyLoginSuccess();
    }

    // =====================================================
    // VALIDATION METHODS
    // =====================================================

    async verifyLoginPageLoaded(): Promise<void> {

        await this.validateElementVisible(
            this.usernameInput
        );

        await this.validateElementVisible(
            this.passwordInput
        );

        await this.validateElementVisible(
            this.loginButton
        );
    }

    async verifyLoginSuccess(): Promise<void> {

        await this.waitForPageLoad();

        await this.validateUrl(
            /dashboard|home/i
        );
    }

    async verifyLoginError(): Promise<void> {

        await this.validateElementVisible(
            this.loginErrorMessage
        );
    }

    // =====================================================
    // FIELD VALIDATIONS
    // =====================================================

    async validateUsernameFieldVisible(): Promise<void> {

        await this.validateElementVisible(
            this.usernameInput
        );
    }

    async validatePasswordFieldVisible(): Promise<void> {

        await this.validateElementVisible(
            this.passwordInput
        );
    }

    async validateLoginButtonVisible(): Promise<void> {

        await this.validateElementVisible(
            this.loginButton
        );
    }

    // =====================================================
    // VALUE VALIDATIONS
    // =====================================================

    async validateUsernameValue(
        expectedValue: string
    ): Promise<void> {

        await this.validateValue(
            this.usernameInput,
            expectedValue
        );
    }

    async validatePasswordValue(
        expectedValue: string
    ): Promise<void> {

        await this.validateValue(
            this.passwordInput,
            expectedValue
        );
    }
}

**/