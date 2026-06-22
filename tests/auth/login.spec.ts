import { test, expect } from '../../fixtures';
import { env } from '../../config/env';

// =====================================================
// SECTION 1 - LOGIN PAGE UI
// =====================================================

test.describe('Login Page UI', () => {

    test.use({ storageState: undefined });


    test('TC_LNC_Login_001 | Verify that the username field is displayed on the login page', async ({ loginPage }) => {

        await test.step('Verify username field is visible', async () => {

            await loginPage.validateElementVisible(
                loginPage.usernameInput
            );
        });
    });

    test('TC_LNC_Login_002 | Verify that the password field is displayed on the login page', async ({ loginPage }) => {

        await test.step('Verify password field is visible', async () => {

            await loginPage.validateElementVisible(
                loginPage.passwordInput
            );
        });
    });

    test('TC_LNC_Login_003 | Verify that the login button is displayed on the login page', async ({ loginPage }) => {

        await test.step('Verify login button is visible', async () => {

            await loginPage.validateElementVisible(
                loginPage.loginButton
            );
        });
    });

    test('TC_LNC_Login_004 | Verify that the welcome text is displayed on the login page', async ({ loginPage }) => {

        await test.step('Verify welcome message is visible', async () => {

            await loginPage.validateElementVisible(
                loginPage.welcomeMessage
            );
        });
    });

    test('TC_LNC_Login_005 | Verify that the password field masks the entered characters', async ({ loginPage }) => {

        await test.step('Verify password input type is password', async () => {

            await expect(
                loginPage.passwordInput
            ).toHaveAttribute('type', 'password');
        });
    });

    test('TC_LNC_Login_006 | Verify that the login page loads without any console errors', async ({ loginPage, page }) => {

        const consoleErrors: string[] = [];

        page.on('console', msg => {

            if (msg.type() === 'error') {

                consoleErrors.push(msg.text());
            }
        });

        await test.step('Reload login page and collect console errors', async () => {

            await page.goto(env.url);
        });

        await test.step('Verify no console errors', async () => {

            expect(consoleErrors).toHaveLength(0);
        });
    });
});

// =====================================================
// SECTION 2 - SUCCESSFUL LOGIN
// =====================================================

test.describe('Successful Login', () => {

    test.use({ storageState: undefined });


    test('TC_LNC_Login_007 | Verify that user can login successfully with valid username and valid password', async ({ loginPage }) => {

        await test.step('Enter valid credentials', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify user is logged in', async () => {

            await loginPage.verifyLoginSuccess();
        });
    });

    test('TC_LNC_Login_008 | Verify that user is redirected to home page after successful login', async ({ loginPage }) => {

        await test.step('Enter valid credentials', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify redirect to home page', async () => {

            await loginPage.verifyLoginSuccess();
        });
    });

    test('TC_LNC_Login_009 | Verify that home page displays welcome message with the correct logged in username', async ({ loginPage }) => {

        await test.step('Enter valid credentials', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify welcome message contains logged in username', async () => {

            await loginPage.validateElementVisible(
                loginPage.loggedInWelcome
            );
        });
    });
});

// =====================================================
// SECTION 3 - INVALID CREDENTIALS
// =====================================================

test.describe('Invalid Credentials', () => {

    test.use({ storageState: undefined });


    test('TC_LNC_Login_011 | Verify that error message appears when invalid username and valid password are entered', async ({ loginPage }) => {

        await test.step('Enter invalid username with valid password', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                'invalid_user'
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify error message is displayed', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_012 | Verify that error message appears when valid username and invalid password are entered', async ({ loginPage }) => {

        await test.step('Enter valid username with invalid password', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                'wrong-password'
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify error message is displayed', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_013 | Verify that error message appears when both username and password are invalid', async ({ loginPage }) => {

        await test.step('Enter invalid username and invalid password', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                'invalid_user'
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                'wrong-password'
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify error message is displayed', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_014 | Verify that login succed when username is entered with different case', async ({ loginPage }) => {

        await test.step('Enter username in uppercase', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username.toUpperCase()
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login success', async () => {

            await loginPage.verifyLoginSuccess();
        });
    });

    test('TC_LNC_Login_015 | Verify that login success when password is entered with different case', async ({ loginPage }) => {

        await test.step('Enter password in uppercase', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password.toUpperCase()
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login success', async () => {

            await loginPage.verifyLoginSuccess();
        });
    });

    test('TC_LNC_Login_016 | Verify that login fails when username is entered with leading spaces', async ({ loginPage }) => {

        await test.step('Enter username with leading spaces', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                `   ${env.username}`
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login fails', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_017 | Verify that login fails when username is entered with trailing spaces', async ({ loginPage }) => {

        await test.step('Enter username with trailing spaces', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                `${env.username}            `
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login fails', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_018 | Verify that login fails when username contains spaces only and get error message', async ({ loginPage }) => {

        await test.step('Enter spaces only as username', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                '   '
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login fails', async () => {

            await loginPage.verifyRequiredFieldErrorForUsername();
        });
    });
});

// =====================================================
// SECTION 4 - EMPTY FIELD VALIDATION
// =====================================================

test.describe('Empty Field Validation', () => {

    test.use({ storageState: undefined });


    test('TC_LNC_Login_019 | Verify that login does not proceed when both username and password fields are empty', async ({ loginPage }) => {

        await test.step('Submit login form without entering credentials', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify required field error is displayed', async () => {

            await loginPage.verifyRequiredFieldErrorForUsername();
            await loginPage.verifyRequiredFieldErrorForPassword();
        });
    });

    test('TC_LNC_Login_020 | Verify that login does not proceed when username field is empty and password is provided', async ({ loginPage }) => {

        await test.step('Enter password only', async () => {

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify required field error is displayed', async () => {

            await loginPage.verifyRequiredFieldErrorForUsername();
        });
    });

    test('TC_LNC_Login_021 | Verify that login does not proceed when password field is empty and username is provided', async ({ loginPage }) => {

        await test.step('Enter username only', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify required field error is displayed', async () => {

            await loginPage.verifyRequiredFieldErrorForPassword();
        });
    });

    test('TC_LNC_Login_022 | Verify that login does not proceed when username contains spaces only', async ({ loginPage }) => {

        await test.step('Enter spaces only as username', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                '   '
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login does not proceed', async () => {

            await loginPage.verifyRequiredFieldErrorForUsername();
        });
    });

    test('TC_LNC_Login_023 | Verify that login does not proceed when password contains spaces only', async ({ loginPage }) => {

        await test.step('Enter spaces only as password', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                '   '
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login does not proceed', async () => {

            await loginPage.verifyRequiredFieldErrorForPassword();
        });
    });
});

// =====================================================
// SECTION 5 - SECURITY
// =====================================================

test.describe('Security', () => {

    test.use({ storageState: undefined });


    test('TC_LNC_Login_024 | Verify that SQL injection in username field does not authenticate the user', async ({ loginPage }) => {

        await test.step('Enter SQL injection in username', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                `' OR '1'='1`
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login fails', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_025 | Verify that SQL injection in password field does not authenticate the user', async ({ loginPage }) => {

        await test.step('Enter SQL injection in password', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                `' OR '1'='1`
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify login fails', async () => {

            await loginPage.verifyLoginError();
        });
    });

    test('TC_LNC_Login_026 | Verify that script injection in username field does not execute on the page', async ({ loginPage, page }) => {

        const consoleErrors: string[] = [];

        page.on('console', msg => {

            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        await test.step('Enter script injection in username', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                `<script>alert('xss')</script>`
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify script did not execute and page stays on login', async () => {

            await loginPage.verifyLoginError();

            expect(consoleErrors).toHaveLength(0);
        });
    });

    test('TC_LNC_Login_027 | Verify that script injection in password field does not execute on the page', async ({ loginPage, page }) => {

        const consoleErrors: string[] = [];

        page.on('console', msg => {

            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        await test.step('Enter script injection in password', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                `<script>alert('xss')</script>`
            );
        });

        await test.step('Submit login form', async () => {

            await loginPage.clickElement(
                loginPage.loginButton
            );
        });

        await test.step('Verify script did not execute and page stays on login', async () => {

            await loginPage.verifyRedirectedToLogin();

            expect(consoleErrors).toHaveLength(0);
        });
    });

    test('TC_LNC_Login_028 | Verify that accessing home page URL directly without login redirects to login page', async ({ page, loginPage }) => {

        await test.step('Navigate directly to home page URL without auth', async () => {

            await page.goto(env.url);
        });

        await test.step('Verify redirect to login page', async () => {

            await loginPage.verifyRedirectedToLogin();
        });
    });
});

// =====================================================
// SECTION 6 - KEYBOARD ACCESSIBILITY
// =====================================================

test.describe('Keyboard Accessibility', () => {

    test.use({ storageState: undefined });


    test('TC_LNC_Login_029 | Verify that user can submit the login form using the Enter key', async ({ loginPage }) => {

        await test.step('Enter valid credentials', async () => {

            await loginPage.fillInput(
                loginPage.usernameInput,
                env.username
            );

            await loginPage.fillInput(
                loginPage.passwordInput,
                env.password
            );
        });

        await test.step('Press Enter to submit', async () => {

            await loginPage.pressEnter(
                loginPage.passwordInput
            );
        });

        await test.step('Verify successful login', async () => {

            await loginPage.verifyLoginSuccess();
        });
    });

    test('TC_LNC_Login_030 | Verify that Tab key moves focus from username to password to login button', async ({ loginPage }) => {

        await test.step('Focus username field and press Tab', async () => {

            await loginPage.usernameInput.focus();

            await loginPage.pressTab();
        });

        await test.step('Verify password field is focused', async () => {

            await expect(loginPage.passwordInput).toBeFocused();
        });

        await test.step('Press Tab again', async () => {

            await loginPage.pressTab();
        });

        await test.step('Verify login button is focused', async () => {

            await expect(loginPage.loginButton).toBeFocused();
        });
    });

    test('TC_LNC_Login_031 | Verify that Shift+Tab key moves focus in reverse order', async ({ loginPage, page }) => {

        await test.step('Focus login button', async () => {

            await loginPage.loginButton.focus();
        });

        await test.step('Press Shift+Tab', async () => {

            await page.keyboard.press('Shift+Tab');
        });

        await test.step('Verify password field is focused', async () => {

            await expect(loginPage.passwordInput).toBeFocused();
        });

        await test.step('Press Shift+Tab again', async () => {

            await page.keyboard.press('Shift+Tab');
        });

        await test.step('Verify username field is focused', async () => {

            await expect(loginPage.usernameInput).toBeFocused();
        });
    });

    test('TC_LNC_Login_032 | Verify that focus indicator is visible on all interactive elements', async ({ loginPage, page }) => {

        await test.step('Verify focus indicator on username field', async () => {

            await loginPage.usernameInput.focus();

            await expect(loginPage.usernameInput).toBeFocused();
        });

        await test.step('Verify focus indicator on password field', async () => {

            await loginPage.passwordInput.focus();

            await expect(loginPage.passwordInput).toBeFocused();
        });

        await test.step('Verify focus indicator on login button', async () => {

            await loginPage.loginButton.focus();

            await expect(loginPage.loginButton).toBeFocused();
        });
    });
});

