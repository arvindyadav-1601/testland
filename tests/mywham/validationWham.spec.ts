import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamValidationData }
    from "../../testdata/mywham/whamValidationData";

/**
 * Validation WHAM — assertions in the spec. An inverted date range
 * (start after end) must raise the validation popup.
 */
test.describe("Validation WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    const { invalidRangeStartDate, invalidRangeEndDate } = WhamValidationData;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Invalid reminder date range raises the validation popup", async () => {

        await test.step("Search with an inverted reminder range", async () => {
            await myWhamPage.search.enterReminderDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.validation.validationPopupTitle).toBeVisible();
    });

    test("Invalid expiration date range raises the validation popup", async () => {

        await test.step("Search with an inverted expiration range", async () => {
            await myWhamPage.search.enterExpirationDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.validation.validationPopupTitle).toBeVisible();
    });

    test("Invalid created date range raises the validation popup", async () => {

        await test.step("Search with an inverted created range", async () => {
            await myWhamPage.search.enterCreatedDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.validation.validationPopupTitle).toBeVisible();
    });

    test("Invalid updated date range raises the validation popup", async () => {

        await test.step("Search with an inverted updated range", async () => {
            await myWhamPage.search.enterUpdatedDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.validation.validationPopupTitle).toBeVisible();
    });

    test("Validation popup closes via its close button", async () => {

        await test.step("Trigger the validation popup", async () => {
            await myWhamPage.search.enterExpirationDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickSearch();
        });
        await expect(myWhamPage.validation.validationPopupTitle).toBeVisible();

        await test.step("Close the popup", async () => {
            await myWhamPage.validation.closeValidationPopup();
        });

        await expect(
            myWhamPage.validation.validationPopupTitle
        ).not.toBeVisible();
    });

    test("Validation popup shows a message", async () => {

        await test.step("Trigger the validation popup", async () => {
            await myWhamPage.search.enterUpdatedDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.validation.validationPopupMessage).toBeVisible();
    });

    test("Submitting an incomplete Add form is blocked", async () => {

        await test.step("Open the Add modal and save empty", async () => {
            await myWhamPage.addEditModal.clickAddButton();
            await myWhamPage.addEditModal.clickSave();
        });

        // OUTCOME: a save with missing required fields does NOT close the modal.
        await expect(myWhamPage.addEditModal.addEditModalContainer).toBeVisible();
    });

    test("Reset clears an invalid range so the next search succeeds", async () => {

        await test.step("Enter an invalid range then reset", async () => {
            await myWhamPage.search.enterExpirationDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.clickReset();
        });

        await test.step("Search with the cleared form", async () => {
            await myWhamPage.search.clickSearch();
        });

        // No validation popup should appear after the range was cleared.
        await expect(
            myWhamPage.validation.validationPopupTitle
        ).not.toBeVisible();
        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Invalid range with an advanced filter still raises the popup", async () => {

        await test.step("Inverted reminder range + category", async () => {
            await myWhamPage.search.enterReminderDates(
                invalidRangeStartDate,
                invalidRangeEndDate
            );
            await myWhamPage.search.selectCategory("General");
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.validation.validationPopupTitle).toBeVisible();
    });

    test("Validation popup stays stable across repeated invalid searches", async () => {

        for (let index = 1; index <= 5; index++) {

            await test.step(`Invalid search cycle ${index}`, async () => {
                await myWhamPage.search.enterExpirationDates(
                    invalidRangeStartDate,
                    invalidRangeEndDate
                );
                await myWhamPage.search.clickSearch();
                await expect(
                    myWhamPage.validation.validationPopupTitle
                ).toBeVisible();
                await myWhamPage.validation.closeValidationPopup();
                await myWhamPage.search.clickReset();
            });
        }
    });
});
