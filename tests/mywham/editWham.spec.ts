import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamAddEditData }
    from "../../testdata/mywham/whamAddEditData";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

/**
 * Edit WHAM — assertions in the spec. Field edits assert the value is applied
 * in the modal, then that a successful save closes the modal.
 */
test.describe("Edit WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
        await expect(myWhamPage.myWhamHeading).toBeVisible();
    });

    test("Edit modal opens from a table row", async () => {

        await test.step("Open the first row for edit", async () => {
            await myWhamPage.table.openFirstRowForEdit();
        });

        await expect(myWhamPage.addEditModal.addEditModalContainer).toBeVisible();
    });

    test("Edit modal closes via Cancel", async () => {

        await test.step("Open the edit modal", async () => {
            await myWhamPage.table.openFirstRowForEdit();
        });
        await expect(myWhamPage.addEditModal.addEditModalContainer).toBeVisible();

        await test.step("Cancel the modal", async () => {
            await myWhamPage.addEditModal.clickCancel();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Message can be updated and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update the message", async () => {
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.updatedMessage);
        });
        await expect(
            myWhamPage.addEditModal.messageTextbox
        ).toHaveValue(WhamAddEditData.updatedMessage);

        await test.step("Save", async () => {
            await myWhamPage.addEditModal.clickSave();
        });
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Category can be updated and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update the category", async () => {
            await myWhamPage.addEditModal.selectCategory(
                WhamAddEditData.updatedCategory
            );
        });
        await expect(
            myWhamPage.addEditModal.categoryDropdown.locator("option:checked")
        ).toHaveText(WhamAddEditData.updatedCategory);

        await myWhamPage.addEditModal.clickSave();
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Type can be updated and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update the type", async () => {
            await myWhamPage.addEditModal.selectType(WhamAddEditData.updatedType);
        });
        await expect(
            myWhamPage.addEditModal.typeDropdown.locator("option:checked")
        ).toHaveText(WhamAddEditData.updatedType);

        await myWhamPage.addEditModal.clickSave();
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Level can be updated and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update the level", async () => {
            await myWhamPage.addEditModal.selectLevel(WhamAddEditData.updatedLevel);
        });
        await expect(
            myWhamPage.addEditModal.levelDropdown.locator("option:checked")
        ).toHaveText(WhamAddEditData.updatedLevel);

        await myWhamPage.addEditModal.clickSave();
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Expiration date can be updated and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update the expiration date", async () => {
            await myWhamPage.addEditModal.enterExpirationDate(
                WhamAddEditData.updatedExpirationDate
            );
        });
        await expect(
            myWhamPage.addEditModal.expirationDateInput
        ).toHaveValue(WhamAddEditData.updatedExpirationDate);

        await myWhamPage.addEditModal.clickSave();
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Reminder can be updated and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update the reminder", async () => {
            await myWhamPage.addEditModal.enterReminder(
                WhamAddEditData.updatedReminder
            );
        });
        await expect(
            myWhamPage.addEditModal.reminderInput
        ).toHaveValue(WhamAddEditData.updatedReminder);

        await myWhamPage.addEditModal.clickSave();
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Confidential flag can be toggled and saved", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Enable the confidential flag", async () => {
            await myWhamPage.addEditModal.enableConfidential();
        });
        await expect(
            myWhamPage.addEditModal.confidentialCheckbox.locator(
                "input[type='checkbox']"
            )
        ).toBeChecked();

        await myWhamPage.addEditModal.clickSave();
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("All editable fields can be updated and saved together", async () => {

        await myWhamPage.table.openFirstRowForEdit();

        await test.step("Update all fields", async () => {
            await myWhamPage.addEditModal.selectCategory(WhamAddEditData.updatedCategory);
            await myWhamPage.addEditModal.selectType(WhamAddEditData.updatedType);
            await myWhamPage.addEditModal.selectLevel(WhamAddEditData.updatedLevel);
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.updatedMessage);
            await myWhamPage.addEditModal.enterExpirationDate(
                WhamAddEditData.updatedExpirationDate
            );
            await myWhamPage.addEditModal.enterReminder(WhamAddEditData.updatedReminder);
        });

        await test.step("Save", async () => {
            await myWhamPage.addEditModal.clickSave();
        });
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Updated WHAM is searchable by its new message", async () => {

        await test.step("Search by the updated message", async () => {
            await myWhamPage.search.enterMessage(WhamAddEditData.updatedMessage);
            await myWhamPage.search.clickSearch();
        });

        await expect(myWhamPage.table.searchResultsTable).toBeVisible();
    });

    test("Edit works after sorting", async () => {

        await test.step("Sort, open a row, update and save", async () => {
            await myWhamPage.table.sortByCreationDateColumn();
            await myWhamPage.table.openFirstRowForEdit();
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.updatedMessage);
            await myWhamPage.addEditModal.clickSave();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Edit works after advanced filtering", async () => {

        await test.step("Filter, open a row, update and save", async () => {
            await myWhamPage.search.selectCategory(WhamSearchData.category);
            await myWhamPage.search.clickSearch();
            await myWhamPage.table.openFirstRowForEdit();
            await myWhamPage.addEditModal.enterMessage(WhamAddEditData.updatedMessage);
            await myWhamPage.addEditModal.clickSave();
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });

    test("Edit modal stays stable across repeated open/close cycles", async () => {

        for (let index = 1; index <= 3; index++) {

            await test.step(`Open/cancel cycle ${index}`, async () => {
                await myWhamPage.table.openFirstRowForEdit();
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
