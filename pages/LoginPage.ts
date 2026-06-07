import {
    Page,
    Locator
} from "@playwright/test";

import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    // =====================================================
    // LOGIN LOCATORS
    // =====================================================

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    readonly loginButton: Locator;

    readonly loginErrorMessage: Locator;

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
            page.locator(
                "text=Invalid username or password"
            );
    }

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
    // CLEAR METHODS
    // =====================================================

    async clearUsername(): Promise<void> {

        await this.clearAndFill(
            this.usernameInput,
            ""
        );
    }

    async clearPassword(): Promise<void> {

        await this.clearAndFill(
            this.passwordInput,
            ""
        );
    }

    async clearLoginFields(): Promise<void> {

        await this.clearUsername();

        await this.clearPassword();
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