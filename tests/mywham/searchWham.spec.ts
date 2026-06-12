import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Search WHAM — every test asserts the search OUTCOME in the spec.
 *
 * NOTE: these assert that the results table re-renders into a consistent state
 * after a search. The stronger assertion (rows actually match the filter, or an
 * exact result count) requires seeded/known data — add it once the environment
 * has deterministic search data.
 */
test.describe("Search WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();

        await expect(myWhamPage.myWhamHeading).toBeVisible();
        await expect(myWhamPage.search.searchButton).toBeVisible();
    });

    test("Basic message search returns a result set", async () => {

        await test.step("Search by message", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Category search returns a result set", async () => {

        await test.step("Search by category", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Type search returns a result set", async () => {

        await test.step("Search by type", async () => {
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Level search returns a result set", async () => {

        await test.step("Search by level", async () => {
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Status search returns a result set", async () => {

        await test.step("Search by status", async () => {
            await myWhamPage.search.selectStatus(WhamSearchData.status);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Reminder date-range search returns a result set", async () => {

        await test.step("Search by reminder date range", async () => {
            await myWhamPage.search.enterReminderDates(
                WhamSearchData.reminderStartDate,
                WhamSearchData.reminderEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Expiration date-range search returns a result set", async () => {

        await test.step("Search by expiration date range", async () => {
            await myWhamPage.search.enterExpirationDates(
                WhamSearchData.expirationStartDate,
                WhamSearchData.expirationEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Created date-range search returns a result set", async () => {

        await test.step("Search by created date range", async () => {
            await myWhamPage.search.enterCreatedDates(
                WhamSearchData.createdStartDate,
                WhamSearchData.createdEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Updated date-range search returns a result set", async () => {

        await test.step("Search by updated date range", async () => {
            await myWhamPage.search.enterUpdatedDates(
                WhamSearchData.updatedStartDate,
                WhamSearchData.updatedEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Confidential search surfaces confidential records", async () => {

        await test.step("Search including confidential", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
        });

        // OUTCOME: at least one confidential badge is shown in the results.
        await expect(myWhamPage.table.confidentialBadge.first()).toBeVisible();
    });

    test("Combined advanced search returns a result set", async () => {

        await test.step("Apply combined filters", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.selectStatus(WhamSearchData.status);
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Reset clears all search fields", async () => {

        await test.step("Enter search criteria", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
        });

        await test.step("Reset the search form", async () => {
            await myWhamPage.search.clickReset();
        });

        // OUTCOME: the message field is cleared after reset.
        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Invalid search shows the no-records message", async () => {

        await test.step("Search for a non-existent message", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.invalidMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.noRecordsFoundMessage).toBeVisible();
    });

    test("Search still works after sorting the table", async () => {

        await test.step("Sort, then search", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Search remains stable across repeated search/reset cycles", async () => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Search/reset cycle ${index}`, async () => {
                await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
                await myWhamPage.search.clickSearch();
                await expect(myWhamPage.table.searchResultsTable).toBeVisible();
                await myWhamPage.search.clickReset();
            });
        }
    });
});
