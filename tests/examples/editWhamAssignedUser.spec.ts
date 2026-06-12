import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

/**
 * EXAMPLE SPEC — for review only (lives under tests/examples/, not the real suite).
 *
 * Captures a behaviour we observed manually: clearing "Assigned To" on an
 * existing WHAM and saving produces NO validation error — the save succeeds
 * and the record drops out of the current user's list. Only Level and Type
 * are required (asterisked) in the modal.
 *
 * It follows the same conventions as the reference spec (tests/mywham/addWham.spec.ts):
 *  - test.step(...) for a readable report tree (no console.log).
 *  - Page objects only DO / READ; every assertion lives here in the spec.
 *  - Typed test data, no magic literals scattered through the test.
 *  - Asserts a real OUTCOME — the modal closing only happens on a successful save.
 */

// Typed, local example data. In the real suite this would live in
// testdata/mywham/ behind an exported interface (e.g. WhamEditDataShape).
interface ExampleEditData {
    readonly createdFrom: string;
    readonly createdTo: string;
    readonly typeToEdit: string;
    readonly blankAssignedUser: string;
}

const exampleData: ExampleEditData = {
    createdFrom: "01/01/2025",
    createdTo: "12/31/2026",
    typeToEdit: "AGREEMENT",
    blankAssignedUser: "", // empty option == no assignee
};

test.describe("Example — Edit WHAM: Assigned To is optional", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        myWhamPage = new MyWhamPage(authenticatedPage);

        await myWhamPage.openMyWhamPage();
    });

    test("Clearing Assigned To saves without a validation error", async () => {

        await test.step("Search for messages created in the date range", async () => {
            await myWhamPage.search.searchUsingCreatedDates(
                exampleData.createdFrom,
                exampleData.createdTo
            );
        });

        // OUTCOME: at least one row is available to edit before we proceed.
        await expect(
            myWhamPage.table.tableRows
        ).not.toHaveCount(0);

        await test.step(`Open the "${exampleData.typeToEdit}" record for editing`, async () => {
            await myWhamPage.table.openRowByType(exampleData.typeToEdit);
        });

        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).toBeVisible();

        await test.step("Clear the Assigned To dropdown", async () => {
            await myWhamPage.addEditModal.selectAssignedUser(
                exampleData.blankAssignedUser
            );
        });

        // OUTCOME (pre-save): the dropdown really is blank.
        await expect(
            myWhamPage.addEditModal.assignedUserDropdown
        ).toHaveValue(exampleData.blankAssignedUser);

        await test.step("Save the edited WHAM", async () => {
            await myWhamPage.addEditModal.clickUpdate();
        });

        // OUTCOME: a successful save closes the modal. If Assigned To were a
        // required field, the modal would stay open and this would fail.
        await expect(
            myWhamPage.addEditModal.addEditModalContainer
        ).not.toBeVisible();
    });
});
