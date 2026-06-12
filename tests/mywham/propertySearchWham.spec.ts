import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamPropertyData }
    from "../../testdata/mywham/whamPropertyData";

/**
 * Property Search WHAM — assertions in the spec. Searches assert the property
 * results render; an invalid search asserts the no-records message.
 */
test.describe("Property Search WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Property modal opens", async () => {

        await test.step("Open the property search modal", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
        });

        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();
    });

    test("Property modal closes", async () => {

        await test.step("Open the property modal", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
        });
        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();

        await test.step("Close the property modal", async () => {
            await myWhamPage.propertyModal.closePropertyModal();
        });

        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).not.toBeVisible();
    });

    test("Real Estate property search returns results", async () => {

        await test.step("Search a real estate property", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
        });

        await expect(
            myWhamPage.propertyModal.propertySearchResults.first()
        ).toBeVisible();
    });

    test("Personal Property search returns results", async () => {

        await test.step("Search a personal property", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchPersonalProperty(
                WhamPropertyData.validPersonalProperty
            );
        });

        await expect(
            myWhamPage.propertyModal.propertySearchResults.first()
        ).toBeVisible();
    });

    test("A single property can be selected and saved", async () => {

        await test.step("Search and select the first property", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
            await expect(
                myWhamPage.propertyModal.propertySearchResults.first()
            ).toBeVisible();
            await myWhamPage.propertyModal.selectFirstProperty();
        });

        await test.step("Save the selection", async () => {
            await myWhamPage.propertyModal.saveSelectedProperties();
        });

        // OUTCOME: saving closes the property modal.
        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).not.toBeVisible();
    });

    test("Multiple properties can be selected and saved", async () => {

        await test.step("Search and select two properties", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
            await expect(
                myWhamPage.propertyModal.propertySearchResults.first()
            ).toBeVisible();
            await myWhamPage.propertyModal.selectFirstProperty();
            await myWhamPage.propertyModal.selectSecondProperty();
        });

        await test.step("Save the selection", async () => {
            await myWhamPage.propertyModal.saveSelectedProperties();
        });

        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).not.toBeVisible();
    });

    test("Invalid property search shows the no-records message", async () => {

        await test.step("Search a non-existent property", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.invalidRealEstateProperty
            );
        });

        await expect(
            myWhamPage.propertyModal.noRecordsFoundMessage
        ).toBeVisible();
    });

    test("Property search can be reset", async () => {

        await test.step("Search then reset", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
            await myWhamPage.propertyModal.resetPropertySearch();
        });

        // The search input is cleared after reset.
        await expect(myWhamPage.propertyModal.searchInput).toHaveValue("");
    });

    test("Property search remains stable across repeated searches", async () => {

        await myWhamPage.propertyModal.openPropertySearch();

        for (let index = 1; index <= 3; index++) {

            await test.step(`Property search cycle ${index}`, async () => {
                await myWhamPage.propertyModal.searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );
                await expect(
                    myWhamPage.propertyModal.propertySearchResults.first()
                ).toBeVisible();
            });
        }
    });

    test("Property modal can be reopened after closing", async () => {

        await test.step("Open, close, reopen", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.closePropertyModal();
            await myWhamPage.propertyModal.openPropertySearch();
        });

        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();
    });

    test("Property search works after WHAM filtering", async () => {

        await test.step("Filter WHAM, then search a property", async () => {
            await myWhamPage.search.enterMessage("Tax");
            await myWhamPage.search.clickSearch();
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
        });

        await expect(
            myWhamPage.propertyModal.propertySearchResults.first()
        ).toBeVisible();
    });

    test("Property results can be scrolled", async () => {

        await test.step("Search a property", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
            await expect(
                myWhamPage.propertyModal.propertySearchResults.first()
            ).toBeVisible();
        });

        await test.step("Scroll the results", async () => {
            await myWhamPage.propertyModal.scrollPropertyResults();
        });

        await expect(
            myWhamPage.propertyModal.propertySearchResults.first()
        ).toBeVisible();
    });
});
