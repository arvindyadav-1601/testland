import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Confidential WHAM — assertions in the spec. Confidential searches assert the
 * confidential badge appears in the results where that is the point of the test.
 */
test.describe("Confidential WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Confidential checkbox can be enabled", async () => {

        await test.step("Enable the confidential filter", async () => {
            await myWhamPage.search.enableConfidential();
        });

        await expect(
            myWhamPage.search.confidentialCheckbox
        ).toBeChecked();
    });

    test("Confidential search returns a result set", async () => {

        await test.step("Run a confidential search", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Confidential records display the badge", async () => {

        await test.step("Run a confidential search", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.confidentialBadge.first()).toBeVisible();
    });

    test("Confidential search with category filter", async () => {

        await test.step("Confidential + category", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Confidential search with type filter", async () => {

        await test.step("Confidential + type", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Confidential search with level filter", async () => {

        await test.step("Confidential + level", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Confidential search with message filter", async () => {

        await test.step("Confidential + message", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Confidential workflow works after sorting", async () => {

        await test.step("Sort, then confidential search", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.confidentialBadge.first()).toBeVisible();
    });

    test("Confidential workflow works after a reset", async () => {

        await test.step("Confidential search then reset", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });

        await expect(myWhamPage.search.messageTextbox).toHaveValue("");
    });

    test("Confidential record can be downloaded", async ({ authenticatedPage }) => {

        await test.step("Confidential search and select a row", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectFirstRow();
        });

        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Confidential record opens the delete popup", async () => {

        await test.step("Confidential search, select and delete", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Confidential advanced-search combination", async () => {

        await test.step("Confidential + category/type/level", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Repeated confidential searches remain stable", async () => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Confidential search cycle ${index}`, async () => {
                await myWhamPage.search.enableConfidential();
                await myWhamPage.search.clickSearch();
                await expect(myWhamPage.table.searchResultsTable).toBeVisible();
                await myWhamPage.search.clickReset();
            });
        }
    });
});
