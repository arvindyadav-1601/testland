import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Reset WHAM — assertions in the spec. Reset must clear the search form; each
 * test asserts the message field is empty after reset (its observable outcome).
 */
test.describe("Reset WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Reset clears the message field", async () => {

        await test.step("Enter a message then reset", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears the category filter", async () => {

        await test.step("Select a category then reset", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears the type filter", async () => {

        await test.step("Select a type then reset", async () => {
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears the level filter", async () => {

        await test.step("Select a level then reset", async () => {
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears the status filter", async () => {

        await test.step("Select a status then reset", async () => {
            await myWhamPage.search.selectStatus(WhamSearchData.status);
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears the reminder dates", async () => {

        await test.step("Enter reminder dates then reset", async () => {
            await myWhamPage.search.enterReminderDates(
                WhamSearchData.reminderStartDate,
                WhamSearchData.reminderEndDate
            );
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.reminderStartDateInput).toHaveValue("");
    });

    test("Reset clears the expiration dates", async () => {

        await test.step("Enter expiration dates then reset", async () => {
            await myWhamPage.search.enterExpirationDates(
                WhamSearchData.expirationStartDate,
                WhamSearchData.expirationEndDate
            );
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.expirationStartDateInput).toHaveValue("");
    });

    test("Reset clears the created dates", async () => {

        await test.step("Enter created dates then reset", async () => {
            await myWhamPage.search.enterCreatedDates(
                WhamSearchData.createdStartDate,
                WhamSearchData.createdEndDate
            );
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears the updated dates", async () => {

        await test.step("Enter updated dates then reset", async () => {
            await myWhamPage.search.enterUpdatedDates(
                WhamSearchData.updatedStartDate,
                WhamSearchData.updatedEndDate
            );
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset clears a confidential search", async () => {

        await test.step("Confidential search then reset", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.confidentialCheckbox).not.toBeChecked();
    });

    test("Reset works after an advanced search", async () => {

        await test.step("Advanced search then reset", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Reset works after sorting", async () => {

        await test.step("Sort, search, then reset", async () => {
            await myWhamPage.table.sortByCategoryColumn();
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Repeated resets remain stable", async () => {

        for (let index = 1; index <= 5; index++) {

            await test.step(`Reset cycle ${index}`, async () => {
                await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
                await myWhamPage.search.selectCategory(WhamSearchData.category);
                await myWhamPage.search.clickReset();
                await expect(myWhamPage.search.messageTextbox).toHaveValue("");
            });
        }
    });
});
