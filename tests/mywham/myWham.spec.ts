import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

/**
 * Smoke tests for the My WHAM module shell — confirms the page loads and its
 * key regions render after navigation. Deeper behaviour lives in the
 * feature specs (addWham, searchWham, deleteWham, ...).
 */
test.describe("My WHAM Smoke Tests", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
    });

    test("My WHAM page is reachable from the sidebar", async () => {

        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Search section is displayed", async () => {

        await expect(myWhamPage.search.searchButton).toBeVisible();
        await expect(myWhamPage.search.messageTextbox).toBeVisible();
    });

    test("Result table is displayed", async () => {

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });
});
