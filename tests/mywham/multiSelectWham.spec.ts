import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Multi-Select WHAM — assertions in the spec. Selecting rows should enable the
 * action buttons; deselecting should disable them.
 */
test.describe("Multi Select WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Single row selection enables the action buttons", async () => {

        await test.step("Select the first row", async () => {
            await myWhamPage.table.selectFirstRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
        await expect(myWhamPage.table.downloadButton).toBeEnabled();
    });

    test("Multi-row selection enables the action buttons", async () => {

        await test.step("Select two rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
        await expect(myWhamPage.table.downloadButton).toBeEnabled();
    });

    test("Select-all enables the action buttons", async () => {

        await test.step("Select all rows", async () => {
            await myWhamPage.table.selectAllRows();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
        await expect(myWhamPage.table.downloadButton).toBeEnabled();
    });

    test("Deselecting all rows disables the action buttons", async () => {

        await test.step("Select two rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });
        await expect(myWhamPage.table.deleteButton).toBeEnabled();

        await test.step("Deselect both rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeDisabled();
        await expect(myWhamPage.table.downloadButton).toBeDisabled();
    });

    test("Selection works after search filtering", async () => {

        await test.step("Filter the results", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
        });
        await expect(myWhamPage.table.searchResultsTable).toBeVisible();

        await test.step("Select a filtered row", async () => {
            await myWhamPage.table.selectFirstRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });

    test("Multi-select works after sorting", async () => {

        await test.step("Sort, then select two rows", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });

    test("Select-all works after advanced filtering", async () => {

        await test.step("Apply advanced filters, then select all", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectAllRows();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });

    test("Confidential rows support multi-selection", async () => {

        await test.step("Search confidential, then select a row", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectFirstRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });

    test("Row count is unchanged by sorting", async () => {

        await myWhamPage.table.selectFirstRow();

        const beforeSortCount = await myWhamPage.table.getSearchResultCount();

        await test.step("Sort the table", async () => {
            await myWhamPage.table.sortByToColumn();
        });

        const afterSortCount = await myWhamPage.table.getSearchResultCount();

        expect(afterSortCount).toBe(beforeSortCount);
    });

    test("Select-all toggles button state on and off", async () => {

        await test.step("Select all rows", async () => {
            await myWhamPage.table.selectAllRows();
        });
        await expect(myWhamPage.table.deleteButton).toBeEnabled();

        await test.step("Deselect all rows", async () => {
            await myWhamPage.table.selectAllRows();
        });
        await expect(myWhamPage.table.deleteButton).toBeDisabled();
    });

    test("Selection works after a reset", async () => {

        await test.step("Search then reset", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });
        await expect(myWhamPage.search.messageTextbox).toHaveValue("");

        await test.step("Select a row", async () => {
            await myWhamPage.table.selectFirstRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });
});
