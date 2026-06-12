import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Delete WHAM — assertions live in the spec; page objects only act/read.
 *
 * These tests verify the delete *interaction* (button enablement + the
 * confirmation dialog) but deliberately do NOT confirm a real delete, because
 * the suite runs against shared data and a confirmed delete would mutate it.
 * A full "confirm delete -> row removed" test should run against seeded data
 * created (and torn down) by the test itself.
 */
test.describe("Delete WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Delete button is disabled on initial load", async () => {

        await expect(myWhamPage.table.deleteButton).toBeDisabled();
    });

    test("Delete button enables after selecting a single row", async () => {

        await test.step("Select the first row", async () => {
            await myWhamPage.table.selectFirstRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });

    test("Delete button enables after selecting multiple rows", async () => {

        await test.step("Select two rows", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
        });

        await expect(myWhamPage.table.deleteButton).toBeEnabled();
    });

    test("Delete confirmation popup opens", async () => {

        await test.step("Select a row and click delete", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Delete popup closes via Cancel", async () => {

        await test.step("Open the delete popup", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });
        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();

        await test.step("Cancel the popup", async () => {
            await myWhamPage.deletePopup.clickCancel();
        });

        await expect(myWhamPage.deletePopup.popupContainer).not.toBeVisible();
    });

    test("Delete popup closes via the X icon", async () => {

        await test.step("Open the delete popup", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });
        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();

        await test.step("Close the popup with the X icon", async () => {
            await myWhamPage.deletePopup.clickCloseIcon();
        });

        await expect(myWhamPage.deletePopup.popupContainer).not.toBeVisible();
    });

    test("Delete popup opens for a filtered result", async () => {

        await test.step("Filter, then delete", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Delete popup opens after advanced filtering", async () => {

        await test.step("Apply advanced filters, then delete", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.selectType(WhamSearchData.type);
            await myWhamPage.search.selectLevel(WhamSearchData.level);
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Delete popup opens after sorting", async () => {

        await test.step("Sort, then delete", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Confidential records support the delete workflow", async () => {

        await test.step("Search confidential, then delete", async () => {
            await myWhamPage.search.enableConfidential();
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Multi-select delete opens the confirmation popup", async () => {

        await test.step("Select two rows and delete", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.selectSecondRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Deselecting all rows disables the delete button", async () => {

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
    });

    test("Delete workflow works after a reset", async () => {

        await test.step("Search then reset", async () => {
            await myWhamPage.search.enterMessage(WhamSearchData.validMessage);
            await myWhamPage.search.clickSearch();
            await myWhamPage.search.clickReset();
        });
        await expect(myWhamPage.search.messageTextbox).toHaveValue("");

        await test.step("Select a row and delete", async () => {
            await myWhamPage.table.selectFirstRow();
            await myWhamPage.table.clickDelete();
        });

        await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
    });

    test("Delete popup stays stable across repeated open/close cycles", async () => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Open/cancel cycle ${index}`, async () => {
                await myWhamPage.table.selectFirstRow();
                await myWhamPage.table.clickDelete();
                await expect(myWhamPage.deletePopup.popupContainer).toBeVisible();
                await myWhamPage.deletePopup.clickCancel();
                await expect(
                    myWhamPage.deletePopup.popupContainer
                ).not.toBeVisible();
            });
        }
    });
});
