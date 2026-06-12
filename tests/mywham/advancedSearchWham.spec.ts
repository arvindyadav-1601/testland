import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Advanced Search WHAM — assertions in the spec. Each search asserts the
 * results table re-renders; seed deterministic data to assert exact matches.
 */
test.describe("Advanced Search WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Search by category, type and level", async () => {

        await test.step("Apply category/type/level filters", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search by status", async () => {

        await test.step("Apply status filter", async () => {
            await myWhamPage.search.selectStatus(WhamSearchData.status);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search by message and category", async () => {

        await test.step("Apply message + category filters", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search by reminder date range", async () => {

        await test.step("Apply reminder date range", async () => {
            await myWhamPage.search.enterReminderDates(
                WhamSearchData.reminderStartDate,
                WhamSearchData.reminderEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search by expiration date range", async () => {

        await test.step("Apply expiration date range", async () => {
            await myWhamPage.search.enterExpirationDates(
                WhamSearchData.expirationStartDate,
                WhamSearchData.expirationEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search by created date range", async () => {

        await test.step("Apply created date range", async () => {
            await myWhamPage.search.enterCreatedDates(
                WhamSearchData.createdStartDate,
                WhamSearchData.createdEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search by updated date range", async () => {

        await test.step("Apply updated date range", async () => {
            await myWhamPage.search.enterUpdatedDates(
                WhamSearchData.updatedStartDate,
                WhamSearchData.updatedEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Advanced search works after sorting", async () => {

        await test.step("Sort, then apply filters", async () => {
            await myWhamPage.table.sortByCategoryColumn();
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Advanced search works after a reset", async () => {

        await test.step("Filter then reset", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });
        await expect(myWhamPage.search.messageTextbox).toHaveValue("");

        await test.step("Re-apply filters", async () => {
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Advanced search remains stable across repeated runs", async () => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Advanced search cycle ${index}`, async () => {
                await myWhamPage.search.selectCategory(WhamSearchData.category);
                await myWhamPage.search.selectType(WhamSearchData.type);
                await myWhamPage.search.clickSearch();
                await expect(myWhamPage.table.searchResultsTable).toBeVisible();
                await myWhamPage.search.clickReset();
            });
        }
    });
});
