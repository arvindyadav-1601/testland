import { test, expect } from '../../fixtures';
import { env } from '../../config/env';
import { HomePage } from '../../pages/HomePage';

// =====================================================
// SECTION 2 (partial) - SESSION PERSISTENCE
// =====================================================

// TC-A010 uses saved auth — no login needed, just reload
test.describe('Session Persistence', () => {

    test('TC_LNC_Login_010 | Verify that browser refresh on home page keeps the user logged in', async ({ authenticatedPage }) => {

        await test.step('Refresh the home page', async () => {

            await authenticatedPage.reload();
        });

        await test.step('Verify user is still logged in after refresh', async () => {

            await expect(
                authenticatedPage.getByRole('link', { name: /Welcome/i })
            ).toBeVisible();
        });
    });
});

// =====================================================
// SECTION 7 - LOGOUT
// =====================================================

// TC-A033 — starts from an authenticated session (chrome project auth).
// No fresh login needed — the saved auth state is the starting point.
test.describe('Logout - From Authenticated Session', () => {

    test('TC_LNC_Login_033 | Verify that user can successfully logout from the application', async ({ homePage, page }) => {

        await test.step('Click logout', async () => {

            await homePage.logout();
        });

        await test.step('Verify user is on login page', async () => {

            await expect(page).toHaveURL(/login/i);
        });
    });
});

// TC-A034 to A037 — each test performs a fresh login before testing logout behaviour.
// Reason: logging out invalidates the server-side session token in user.json.
// If saved auth were reused across tests, subsequent tests would fail because
// the server no longer recognises the invalidated token.
// storageState: { cookies: [], origins: [] } — explicit empty state that correctly
// overrides the chrome project's AUTH_FILE (storageState: undefined does not work
// in Playwright 1.61 — undefined is dropped during option merging and project value wins).
test.describe('Logout - Session Behaviour', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    test('TC_LNC_Login_034 | Verify that user is redirected to login page after logout', async ({ loginPage, page }) => {

        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                env.username,
                env.password
            );
        });

        await test.step('Click logout', async () => {

            await new HomePage(page).logout();
        });

        await test.step('Verify redirect to login page', async () => {

            await expect(page).toHaveURL(/login/i);
        });
    });

    test('TC_LNC_Login_035 | Verify that accessing home page URL directly after logout redirects to login page', async ({ loginPage, page }) => {

        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                env.username,
                env.password
            );
        });

        await test.step('Click logout', async () => {

            await new HomePage(page).logout();
        });

        await test.step('Navigate directly to home URL', async () => {

            await page.goto(env.url);
        });

        await test.step('Verify redirect to login page', async () => {

            await expect(page).toHaveURL(/login/i);
        });
    });

    test('TC_LNC_Login_036 | Verify that browser back button after logout does not grant access to home page', async ({ loginPage, page }) => {

        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                env.username,
                env.password
            );
        });

        await test.step('Click logout', async () => {

            await new HomePage(page).logout();
        });

        await test.step('Press browser back button', async () => {

            await page.goBack();
        });

        await test.step('Verify user is not granted access', async () => {

            await expect(page).toHaveURL(/login/i);
        });
    });

    test('TC_LNC_Login_037 | Verify that browser refresh after logout keeps user on login page', async ({ loginPage, page }) => {

        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                env.username,
                env.password
            );
        });

        await test.step('Click logout', async () => {

            await new HomePage(page).logout();
        });

        await test.step('Refresh the page', async () => {

            await page.reload();
        });

        await test.step('Verify user remains on login page', async () => {

            await expect(page).toHaveURL(/login/i);
        });
    });
});
