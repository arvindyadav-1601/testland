import { test,Expect,Locator, expect } from "@playwright/test";

test('verify public sign in', async ({ page })=>{

    await page.goto("https://dev-qa2-pp.test.landnav.com/");
    await page.locator('[name="Username"]').fill("GCS");
    await page.locator('input[name="Password"]').fill("GCSPASSWORD");
    await page.getByText('Sign In', { exact: true }).click()
    const login=await page.getByRole('heading', { name: 'Welcome GCS' })
    expect (login).toBeVisible
})
/*
test('verify real estate search', async ({ page }) => {
    await page.locator("div[class='col-md-10 col-12'] input[name='LastName']").fill("smith");
*/