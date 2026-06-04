import{test,expect,Locator} from "@playwright/test";
import { userData, WhamsearchData } from '../../testdata.ts';
test.describe.configure({ mode: 'serial' });

test('verify client portal sign in', async ({ page })=>{

    await page.goto(`${userData.url}`);
    await page.getByPlaceholder('Username').fill(`${userData.username}`);
    await page.getByPlaceholder('Password').fill(`${userData.password}`);
    await page.getByRole('button', { name: 'Sign In' }).click()
    const login=page.getByRole('heading', { name: `Welcome ${userData.username}` })
    if (login) {
        console.log("Login successful");
    } else {
        console.log("Login failed");
    }
     expect (login).toBeVisible
})
test('verify the My Wham page permission', async ({ page }) =>{
    await page.locator('span:has-text("My Wham")').click();
    const myWhamPage= page.getByRole('heading', { name: 'My Wham' });
    if (myWhamPage) {
        console.log("My Wham page is accessible");
    } else {
        console.log("My Wham page is not accessible");
    }
    expect(myWhamPage).toBeVisible
});
test('verify wham message search functionality using reminder date', async ({ page }) =>{
    await await page.getByRole('textbox', { name: 'Starting Reminder Date' }).fill(`${WhamsearchData.reminderstartDate}`);
    await page.getByRole('textbox', { name: 'Ending Reminder Date' }).fill(`${WhamsearchData.reminderendDate}`);
    await page.getByRole('button', { name: 'Search' }).click();
    const count = await page.locator('#myWhamSearchTable tbody tr').count();
    expect(count).toBeGreaterThan(0);
    console.log(`Search Results Found: ${count}`)

});
