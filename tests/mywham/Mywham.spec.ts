/* import{test,expect,Locator} from "@playwright/test";
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
*/
import { test, expect } from "../../fixtures/index";

import { MyWhamPage } from "../../pages/MyWhamPage";

import { WhamsearchData } from "../../testdata/myWhamData";



test.describe("My WHAM Test Suite", () => {
    

  let myWhamPage: MyWhamPage;

  test.beforeEach(async ({ authenticatedPage }) => {

    await authenticatedPage.locator('a.kt-menu__link').locator('span').nth(0).click();

    myWhamPage = new MyWhamPage(authenticatedPage);

    await myWhamPage.openMyWhamPage();
  });

  // ==================================================
  // Verify My WHAM Page Access
  // ==================================================

  test("Verify My WHAM page is accessible", async () => {

    await expect(myWhamPage.myWhamHeading).toBeVisible();

    console.log("My WHAM Page Accessible");
  });

  // ==================================================
  // Search using Reminder Dates
  // ==================================================

  test("Verify search functionality using reminder dates", async () => {

    await myWhamPage.searchUsingReminderDates(
      WhamsearchData.reminderStartDate,
      WhamsearchData.reminderEndDate
    );

    await myWhamPage.validateSearchResults();
  });

  // ==================================================
  // Search using Dropdown Filters
  // ==================================================

  test("Verify search functionality using dropdown filters", async () => {

    await myWhamPage.selectCategory(    
      WhamsearchData.category
    );

    await myWhamPage.selectType(
      WhamsearchData.type
    );

    await myWhamPage.selectLevel(
      WhamsearchData.level
    );

    await myWhamPage.selectStatus(
      WhamsearchData.status
    );

    await myWhamPage.searchButton.click();

    await myWhamPage.validateSearchResults();
  });

  // ==================================================
  // Verify Download/Delete Buttons
  // ==================================================

  test("Verify download and delete buttons enabled after checkbox selection", async () => {

    await myWhamPage.searchUsingReminderDates(
      WhamsearchData.reminderStartDate,
      WhamsearchData.reminderEndDate
    );

    await myWhamPage.validateSearchResults();

    await myWhamPage.selectFirstRowCheckbox();

    await myWhamPage.validateActionButtonsEnabled();

    console.log("Download/Delete Buttons Enabled");
  });

  // ==================================================
  // Verify No Records Found
  // ==================================================

  test("Verify no records found message", async () => {

    await myWhamPage.searchUsingReminderDates(
      WhamsearchData.reminderStartDate,
      WhamsearchData.reminderEndDate
    );

    const rowCount = await myWhamPage.tableRows.count();

    if (rowCount === 0) {

      await myWhamPage.validateNoRecordsFound();
    }
  });
});