import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamAddEditData }
    from "../../testdata/mywham/whamAddEditData";

import { WhamPropertyData }
    from "../../testdata/mywham/whamPropertyData";

/**
 * REFERENCE SPEC — Add WHAM
 *
 * Conventions demonstrated here (apply to every other module):
 *  - Steps are wrapped in `test.step(...)` so the HTML/Allure report shows a
 *    readable tree (replaces the old console.log noise).
 *  - Page objects only DO and READ. Every assertion lives here in the spec.
 *  - Each test ends by asserting a real OUTCOME, so a passing test is only
 *    possible if the feature actually worked.
 *  - Test data comes from typed data files, never hardcoded literals.
 */
test.describe("Add WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
    });

    test("Add modal opens when the Add button is clicked", async () => {

        await test.step("Open the Add WHAM modal", async () => {
            await myWhamPage.addEditModal.clickAddButton();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).toBeVisible();
    });

    test("Add modal closes when Cancel is clicked", async () => {

        await test.step("Open the Add WHAM modal", async () => {
            await myWhamPage.addEditModal.clickAddButton();
        });
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).toBeVisible();

        await test.step("Cancel the modal", async () => {
            await myWhamPage.addEditModal.clickCancel();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Message field accepts and retains the entered text", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Enter the WHAM message", async () => {
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.message);
        });

        // OUTCOME: the textarea actually holds what we typed.
        await expect(
            myWhamPage.addEditModal.messageTextbox
        ).toHaveValue(WhamAddEditData.message);
    });

    test("Category selection is applied", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Select a category", async () => {
            await myWhamPage.addEditModal.selectCategory(WhamAddEditData.category);
        });

        // OUTCOME: the selected <option> is the one we asked for.
        await expect(
            myWhamPage.addEditModal.categoryDropdown.locator("option:checked")
        ).toHaveText(WhamAddEditData.category);
    });

    test("Type selection is applied", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Select a type", async () => {
            await myWhamPage.addEditModal.selectType(WhamAddEditData.type);
        });

        await expect(
            myWhamPage.addEditModal.typeDropdown.locator("option:checked")
        ).toHaveText(WhamAddEditData.type);
    });

    test("Level selection is applied", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Select a level", async () => {
            await myWhamPage.addEditModal.selectLevel(WhamAddEditData.level);
        });

        await expect(
            myWhamPage.addEditModal.levelDropdown.locator("option:checked")
        ).toHaveText(WhamAddEditData.level);
    });

    test("Expiration date is applied", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Enter the expiration date", async () => {
            await myWhamPage.addEditModal.enterExpirationDate(
                WhamAddEditData.expirationDate
            );
        });

        await expect(
            myWhamPage.addEditModal.expirationDateInput
        ).toHaveValue(WhamAddEditData.expirationDate);
    });

    test("Reminder is applied", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Enter the reminder", async () => {
            await myWhamPage.addEditModal.enterReminder(WhamAddEditData.reminder);
        });

        await expect(
            myWhamPage.addEditModal.reminderInput
        ).toHaveValue(WhamAddEditData.reminder);
    });

    test("Confidential checkbox can be enabled", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Enable the confidential flag", async () => {
            await myWhamPage.addEditModal.enableConfidential();
        });

        // OUTCOME: the underlying checkbox input is checked.
        await expect(
            myWhamPage.addEditModal.confidentialCheckbox.locator(
                "input[type='checkbox']"
            )
        ).toBeChecked();
    });

    test("A WHAM can be created with all fields and the modal closes", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Fill the Add WHAM form", async () => {
            await myWhamPage.addEditModal.selectCategory(WhamAddEditData.category);
            await myWhamPage.addEditModal.selectType(WhamAddEditData.type);
            await myWhamPage.addEditModal.selectLevel(WhamAddEditData.level);
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.message);
            await myWhamPage.addEditModal.enterExpirationDate(
                WhamAddEditData.expirationDate
            );
            await myWhamPage.addEditModal.enterReminder(WhamAddEditData.reminder);
        });

        await test.step("Save the WHAM", async () => {
            await myWhamPage.addEditModal.clickSave();
        });

        // OUTCOME: a successful save closes the modal. If a validation error
        // occurs the modal stays open and this assertion fails — which is what
        // we want. (Stronger still: assert the new row appears in the table.)
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("A confidential WHAM can be created and the modal closes", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Fill the confidential WHAM form", async () => {
            await myWhamPage.addEditModal.selectCategory(WhamAddEditData.category);
            await myWhamPage.addEditModal.selectType(WhamAddEditData.type);
            await myWhamPage.addEditModal.selectLevel(WhamAddEditData.level);
            await myWhamPage.addEditModal.enterMessage(
                WhamAddEditData.confidentialMessage
            );
            await myWhamPage.addEditModal.enableConfidential();
        });

        await test.step("Save the confidential WHAM", async () => {
            await myWhamPage.addEditModal.clickSave();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("A WHAM can be created after linking a property", async () => {

        await myWhamPage.addEditModal.clickAddButton();

        await test.step("Search and link a real estate property", async () => {
            await myWhamPage.propertyModal.openPropertySearch();
            await myWhamPage.propertyModal.searchRealEstateProperty(
                WhamPropertyData.validRealEstateProperty
            );
            await myWhamPage.propertyModal.selectFirstProperty();
            await myWhamPage.propertyModal.saveSelectedProperties();
        });

        await test.step("Complete and save the WHAM", async () => {
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.message);
            await myWhamPage.addEditModal.clickSave();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Add modal stays usable across repeated open/close cycles", async () => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Open/close cycle ${index}`, async () => {
                await myWhamPage.addEditModal.clickAddButton();
                await expect(
                    myWhamPage.addEditModal.addEditModalContainer
                ).toBeVisible();
                await myWhamPage.addEditModal.clickCancel();
                await expect(
                    myWhamPage.addEditModal.addEditModalContainer
                ).not.toBeVisible();
            });
        }
    });
});
