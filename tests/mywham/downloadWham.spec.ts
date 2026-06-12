import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Download WHAM — assertions in the spec. Download tests assert a real
 * download event fired and produced a filename (the genuine outcome).
 */
test.describe("Download WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Download button is disabled on initial load", async () => {

        await expect(myWhamPage.table.downloadButton).toBeDisabled();
    });

    test("Download button enables after selecting a single row", async () => {

        await test.step("Select the first row", async () => {
            await myWhamPage.table.selectFirstRow();
        });

        await expect(myWhamPage.table.downloadButton).toBeEnabled();
    });

    test("Download button enables after selecting multiple rows", async () => {

        await test.step("Select two rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });

        await expect(myWhamPage.table.downloadButton).toBeEnabled();
    });

    test("Single-row download produces a file", async ({ authenticatedPage }) => {

        await myWhamPage.table.selectFirstRow();

        const downloadPromise = authenticatedPage.waitForEvent("download");
        await test.step("Click download", async () => {
            await myWhamPage.table.clickDownload();
        });
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Multi-row download produces a file", async ({ authenticatedPage }) => {

        await myWhamPage.table.selectFirstRow();
        await myWhamPage.table.selectSecondRow();

        const downloadPromise = authenticatedPage.waitForEvent("download");
        await test.step("Click download", async () => {
            await myWhamPage.table.clickDownload();
        });
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Select-all download produces a file", async ({ authenticatedPage }) => {

        await myWhamPage.table.selectAllRows();

        const downloadPromise = authenticatedPage.waitForEvent("download");
        await test.step("Click download", async () => {
            await myWhamPage.table.clickDownload();
        });
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Download works after search filtering", async ({ authenticatedPage }) => {

        await test.step("Filter the results", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
        });
        await expect(myWhamPage.table.searchResultsTable).toBeVisible();

        await myWhamPage.table.selectFirstRow();
        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Download works after advanced filtering", async ({ authenticatedPage }) => {

        await test.step("Apply advanced filters", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
        });

        await myWhamPage.table.selectFirstRow();
        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Confidential records can be downloaded", async ({ authenticatedPage }) => {

        await test.step("Search confidential records", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
        });
        await expect(myWhamPage.table.confidentialBadge.first()).toBeVisible();

        await myWhamPage.table.selectFirstRow();
        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Download works after sorting", async ({ authenticatedPage }) => {

        await test.step("Sort the table", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
        });

        await myWhamPage.table.selectFirstRow();
        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("Deselecting all rows disables the download button", async () => {

        await test.step("Select two rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });
        await expect(myWhamPage.table.downloadButton).toBeEnabled();

        await test.step("Deselect both rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });

        await expect(myWhamPage.table.downloadButton).toBeDisabled();
    });

    test("Download works after a reset", async ({ authenticatedPage }) => {

        await test.step("Search then reset", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });
        await expect(myWhamPage.search.messageTextbox).toHaveValue("");

        await myWhamPage.table.selectFirstRow();
        const downloadPromise = authenticatedPage.waitForEvent("download");
        await myWhamPage.table.clickDownload();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).not.toBe("");
    });

    test("No-records search keeps the download button disabled", async () => {

        await test.step("Search for a non-existent message", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.invalidMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.noRecordsFoundMessage).toBeVisible();
        await expect(myWhamPage.table.downloadButton).toBeDisabled();
    });

    test("Download remains stable across repeated downloads", async ({ authenticatedPage }) => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Download iteration ${index}`, async () => {
                await myWhamPage.table.selectFirstRow();
                const downloadPromise = authenticatedPage.waitForEvent("download");
                await myWhamPage.table.clickDownload();
                const download = await downloadPromise;
                expect(download.suggestedFilename()).not.toBe("");
            });
        }
    });
});
