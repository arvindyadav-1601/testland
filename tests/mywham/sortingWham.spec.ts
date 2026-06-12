import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Sorting WHAM — assertions in the spec. Each sort asserts the results table
 * stays rendered after re-sorting; seed deterministic data to assert order.
 */
test.describe("Sorting WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Sort by To column", async () => {

        await test.step("Sort by To", async () => {
            await myWhamPage.table.sortByToColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Category column", async () => {

        await test.step("Sort by Category", async () => {
            await myWhamPage.table.sortByCategoryColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Level column", async () => {

        await test.step("Sort by Level", async () => {
            await myWhamPage.table.sortByLevelColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Type column", async () => {

        await test.step("Sort by Type", async () => {
            await myWhamPage.table.sortByTypeColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Properties column", async () => {

        await test.step("Sort by Properties", async () => {
            await myWhamPage.table.sortByPropertiesColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Creation Date column", async () => {

        await test.step("Sort by Creation Date", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Expiration Date column", async () => {

        await test.step("Sort by Expiration Date", async () => {
            await myWhamPage.table.sortByExpirationDateColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sort by Confidential column", async () => {

        await test.step("Sort by Confidential", async () => {
            await myWhamPage.table.sortByConfidentialColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sorting works with advanced search", async () => {

        await test.step("Filter, then sort", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.sortByCreationDateColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sorting works with the confidential workflow", async () => {

        await test.step("Confidential search, then sort", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.sortByCategoryColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Sorting supports the download workflow", async ({ authenticatedPage }) => {

        await test.step("Sort and select a row", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
            await myWhamPage.table.selectFirstRow();
        });

        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Sorting supports the delete workflow", async () => {

        await test.step("Sort, select and delete", async () => {
            await myWhamPage.table.sortByLevelColumn();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Sorting works after a reset", async () => {

        await test.step("Search, reset, then sort", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
            await myWhamPage.table.sortByTypeColumn();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Repeated sorting remains stable", async () => {

        for (let index = 1; index <= 5; index++) {

            await test.step(`Sorting cycle ${index}`, async () => {
                await myWhamPage.table.sortByCategoryColumn();
                await myWhamPage.table.sortByCreationDateColumn();
                await myWhamPage.table.sortByLevelColumn();
                await expect(myWhamPage.table.searchResultsTable).toBeVisible();
            });
        }
    });
});
