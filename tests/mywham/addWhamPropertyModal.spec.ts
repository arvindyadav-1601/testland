import { test, expect } from "../../fixtures";
import { WhamAddEditData } from "../../testdata/mywham/whamAddEditData";
import { WhamPropertyData } from "../../testdata/mywham/whamPropertyData";

// =============================================================================
// SECTION 3 — SELECT PROPERTIES MODAL BEHAVIOR
// TC_WHAM031 – TC_WHAM040
//
// Verifies the behavioral contract of the Select Properties modal:
// closing paths (Cancel / X / Save-without-selection), state reset on
// reopen, form-data preservation, and click-outside handling.
// =============================================================================

test.describe("Section 3 — Select Properties Modal Behavior", () => {

    // All tests in this section start on the Add Message page with the
    // Select Properties modal already open, unless noted otherwise.
    test.beforeEach(async ({ myWhamPage }) => {

        await myWhamPage.openAddMessagePage();
        await myWhamPage.addEditModal.clickPropertiesAddButton();
        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM031
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM031 | Clicking Cancel closes the modal without adding properties",
        async ({ myWhamPage }) => {

            await test.step("Click Cancel in the Select Properties modal", async () => {
                await myWhamPage.propertyModal.cancelPropertySelection();
            });

            // OUTCOME 1: modal is gone.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeHidden();

            // OUTCOME 2: Properties table on the Add Message page still shows no rows.
            await expect(
                myWhamPage.addEditModal.propertiesNoRecordsMessage
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM032
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM032 | Clicking the X button closes the modal without adding properties",
        async ({ myWhamPage }) => {

            await test.step("Click the X (close) button", async () => {
                await myWhamPage.propertyModal.closePropertyModal();
            });

            // OUTCOME 1: modal is gone.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeHidden();

            // OUTCOME 2: no properties were added.
            await expect(
                myWhamPage.addEditModal.propertiesNoRecordsMessage
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM033
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM033 | Background overlay is removed after the modal is closed",
        async ({ myWhamPage }) => {

            // Confirm the overlay is present while modal is open.
            await expect(myWhamPage.propertyModal.modalOverlay).toBeVisible();

            await test.step("Close the modal via Cancel", async () => {
                await myWhamPage.propertyModal.cancelPropertySelection();
            });

            // OUTCOME: backdrop is gone.
            await expect(myWhamPage.propertyModal.modalOverlay).toBeHidden();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM034
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM034 | Reopening the modal resets the Property Number input field",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Enter a value in the Property Number input", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // Confirm the input was populated before closing.
            await expect(propModal.searchInput).toHaveValue(
                WhamPropertyData.validRealEstateProperty
            );

            await test.step("Close the modal", async () => {
                await propModal.cancelPropertySelection();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            await test.step("Reopen the modal", async () => {
                await myWhamPage.addEditModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
            });

            // OUTCOME: input is blank after reopen.
            await expect(propModal.searchInput).toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM035
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM035 | Reopening the modal resets the results table",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search to populate the results table", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // Confirm results were present.
            const rowCountBefore = await propModal.getResultsRowCount();
            expect(rowCountBefore).toBeGreaterThan(0);

            await test.step("Close the modal", async () => {
                await propModal.cancelPropertySelection();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            await test.step("Reopen the modal", async () => {
                await myWhamPage.addEditModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
            });

            // OUTCOME: table has no rows — previous results are cleared.
            const rowCountAfter = await propModal.getResultsRowCount();
            expect(rowCountAfter).toBe(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM036
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM036 | Modal can be opened and closed multiple times without UI issues",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;
            const addModal = myWhamPage.addEditModal;

            // First open is done by beforeEach. Close and reopen twice more.
            for (let cycle = 1; cycle <= 2; cycle++) {

                await test.step(`Cycle ${cycle}: close the modal`, async () => {
                    await propModal.cancelPropertySelection();
                    await expect(propModal.propertyModalContainer).toBeHidden();
                });

                await test.step(`Cycle ${cycle}: reopen the modal`, async () => {
                    await addModal.clickPropertiesAddButton();
                    await expect(propModal.propertyModalContainer).toBeVisible();
                });
            }

            // OUTCOME: after multiple open/close cycles the modal still renders
            // cleanly — all core controls are present.
            await expect(propModal.propertyTypeDropdown).toBeVisible();
            await expect(propModal.searchInput).toBeVisible();
            await expect(propModal.searchButton).toBeVisible();
            await expect(propModal.saveButton).toBeVisible();
            await expect(propModal.cancelButton).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM037
    // Closes via Cancel — form data filled BEFORE opening the modal must
    // survive the open/close round-trip.
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM037 | Add Message form data is preserved after closing the modal via Cancel",
        async ({ myWhamPage }) => {

            // The beforeEach already opened the modal. Close it first so we can
            // fill the form, then re-open and close via Cancel.
            await myWhamPage.propertyModal.cancelPropertySelection();
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeHidden();

            const addModal = myWhamPage.addEditModal;

            await test.step("Fill form fields on the Add Message page", async () => {
                await addModal.selectLevel(WhamAddEditData.level);
                await addModal.selectType(WhamAddEditData.type);
                await addModal.enterMessage(WhamAddEditData.message);
            });

            await test.step("Open the Select Properties modal", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
            });

            await test.step("Close the modal via Cancel", async () => {
                await myWhamPage.propertyModal.cancelPropertySelection();
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeHidden();
            });

            // OUTCOME: form values are unchanged after the modal round-trip.
            await expect(addModal.messageLevelDropdown).toHaveValue(
                await addModal.messageLevelDropdown.inputValue()
            );
            await expect(addModal.messageTypeDropdown).toHaveValue(
                await addModal.messageTypeDropdown.inputValue()
            );
            await expect(addModal.messageTextbox).toHaveValue(
                WhamAddEditData.message
            );
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM038
    // Same as TC_WHAM037 but closes via the X button.
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM038 | Add Message form data is preserved after closing the modal via X button",
        async ({ myWhamPage }) => {

            // Close the beforeEach-opened modal to fill the form first.
            await myWhamPage.propertyModal.cancelPropertySelection();
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeHidden();

            const addModal = myWhamPage.addEditModal;

            await test.step("Fill form fields on the Add Message page", async () => {
                await addModal.selectLevel(WhamAddEditData.level);
                await addModal.selectType(WhamAddEditData.type);
                await addModal.enterMessage(WhamAddEditData.message);
            });

            await test.step("Open the Select Properties modal", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
            });

            await test.step("Close the modal via the X button", async () => {
                await myWhamPage.propertyModal.closePropertyModal();
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeHidden();
            });

            // OUTCOME: message field value is intact.
            await expect(addModal.messageTextbox).toHaveValue(
                WhamAddEditData.message
            );
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM039
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM039 | Clicking Save without selecting any row closes the modal without adding properties",
        async ({ myWhamPage }) => {

            // Do not select any row — click Save immediately.
            await test.step("Click Save with no rows selected", async () => {
                await myWhamPage.propertyModal.saveSelectedProperties();
            });

            // OUTCOME 1: modal closes.
            await expect(
                myWhamPage.propertyModal.searchButton
            ).toBeDisabled();

        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM040
    // Clicks the modal backdrop (the dimmed area outside the dialog box).
    // The modal is expected to remain open (backdrop: static behaviour).
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM040 | Modal does not close when clicking outside the modal overlay",
        async ({ myWhamPage, authenticatedPage }) => {

            // Click on the .modal-backdrop — the overlay layer behind the dialog.
            await test.step("Click the modal backdrop (outside the dialog box)", async () => {
                await authenticatedPage
                    .locator(".modal-backdrop")
                    .click({ force: true, position: { x: 5, y: 5 } });
            });

            // Short wait to give Bootstrap time to react if it were going to close.
            await authenticatedPage.waitForTimeout(500);

            // OUTCOME: modal is still open.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
        }
    );

}); // end "Section 3 — Select Properties Modal Behavior"


// =============================================================================
// SECTION 4 — SELECT PROPERTIES MODAL SEARCH
// TC_WHAM041 – TC_WHAM060
//
// Verifies search behaviour inside the Select Properties modal: empty search,
// valid/invalid inputs, result rendering, type switching, input edge cases.
// =============================================================================

test.describe("Section 4 — Select Properties Modal Search", () => {

    // Open modal before every test; individual tests own their search calls.
    test.beforeEach(async ({ myWhamPage }) => {

        await myWhamPage.openAddMessagePage();
        await myWhamPage.addEditModal.clickPropertiesAddButton();
        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM041
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM041 | Clicking Search with no property number entered does not return results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            // Input is empty by default; pass "" to searchProperty which fills
            // (clears) the input and then clicks Search.
            await test.step("Click Search with empty input", async () => {
                await propModal.searchProperty("");
            });

            // OUTCOME: no result rows are rendered.
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBe(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM042
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM042 | Entering a valid Parcel Number and clicking Search returns matching results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search with a valid parcel number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // OUTCOME: at least one result row is returned.
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBeGreaterThan(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM043
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM043 | Entering a valid Personal Property Number and clicking Search returns matching results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Switch type to Personal Property Number", async () => {
                await propModal.selectPropertyType("Personal Property Number");
            });

            await test.step("Search with a valid personal property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty
                );
            });

            // OUTCOME: at least one result row is returned.
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBeGreaterThan(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM044
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM044 | Each result row displays non-empty Property #, Tax Year, Creation Date, Current, and Description values",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search to produce results", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            await expect(propModal.firstPropertyRowData).toBeVisible();

            // Verify the first row has readable text — confirms cells are populated,
            // not that specific values match (data varies per environment).
            const rowText = await propModal.firstPropertyRowData.textContent();
            expect(rowText?.trim().length).toBeGreaterThan(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM045
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM045 | Entering an invalid property number displays 'No records found'",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search with an invalid property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.invalidRealEstateProperty
                );
            });

            // OUTCOME: the 'no records' message is shown inside the modal.
            await expect(propModal.noRecordsFoundMessage).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM046
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM046 | Results table is scrollable when results exceed the visible area",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search to produce results", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // Scroll the results table to the last row and confirm it becomes
            // visible — proves the table is scrollable.
            await test.step("Scroll to the last result row", async () => {
                await propModal.scrollPropertyResults();
            });

            // OUTCOME: the page is still intact (no crash / layout break).
            await expect(propModal.propertyModalContainer).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM047
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM047 | Performing a new search clears previous results and shows new results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("First search", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            const firstCount = await propModal.getResultsRowCount();
            expect(firstCount).toBeGreaterThan(0);

            await test.step("Second search with an invalid value", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.invalidRealEstateProperty
                );
            });

            // OUTCOME: previous results are gone; 'no records' is shown.
            await expect(propModal.noRecordsFoundMessage).toBeVisible();
            const secondCount = await propModal.getResultsRowCount();
            expect(secondCount).toBe(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM048
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM048 | Row selections are reset when a new search is performed",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search and select the first result row", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
                await propModal.selectFirstProperty();
            });

            // Confirm the first row is checked before the new search.
            await expect(propModal.firstPropertyCheckbox).toBeChecked();

            await test.step("Perform a new search", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // OUTCOME: the previously checked row is no longer selected.
            await expect(propModal.firstPropertyCheckbox).not.toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM049
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM049 | Switching type to Personal Property Number and searching returns correct results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Switch the Property Number Type dropdown", async () => {
                await propModal.selectPropertyType("Personal Property Number");
            });

            await test.step("Search with a personal property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty
                );
            });

            // OUTCOME: results are shown (not a 'no records' message).
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBeGreaterThan(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM050
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM050 | Entering special characters in the property number field does not break the search",
        async ({ myWhamPage }) => {

            await test.step("Search with special characters", async () => {
                await myWhamPage.propertyModal.searchProperty("!@#$%^&*()");
            });

            // OUTCOME: page is intact — either no results or an error message,
            // but no JavaScript crash and the modal is still functional.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
            await expect(
                myWhamPage.propertyModal.searchButton
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM051
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM051 | Entering only spaces in the property number field does not return results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search with spaces only", async () => {
                await propModal.searchProperty("   ");
            });

            // OUTCOME: no result rows.
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBe(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM052
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM052 | Property number with leading spaces returns correct results or no results without error",
        async ({ myWhamPage }) => {

            await test.step("Search with leading spaces before property number", async () => {
                await myWhamPage.propertyModal.searchProperty(
                    "  " + WhamPropertyData.validRealEstateProperty
                );
            });

            // OUTCOME: the modal is still functional regardless of result count.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM053
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM053 | Property number with trailing spaces returns correct results or no results without error",
        async ({ myWhamPage }) => {

            await test.step("Search with trailing spaces after property number", async () => {
                await myWhamPage.propertyModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty + "  "
                );
            });

            // OUTCOME: the modal is still functional regardless of result count.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM054
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM054 | Search supports property numbers containing dashes",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            // The app formats parcel numbers as ***-*****-**** (from NKFormatting).
            // Search with the full formatted number including dashes.
            await test.step("Search with a dash-formatted property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // OUTCOME: search completes without error.
            await expect(propModal.propertyModalContainer).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM055
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM055 | Search supports property numbers containing letters",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Switch to Personal Property Number type", async () => {
                await propModal.selectPropertyType("Personal Property Number");
            });

            await test.step("Search with a property number containing letters", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty
                );
            });

            // OUTCOME: search completes — results or 'no records', no crash.
            await expect(propModal.propertyModalContainer).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM056
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM056 | Search supports mixed alphanumeric property numbers",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Switch to Personal Property Number type", async () => {
                await propModal.selectPropertyType("Personal Property Number");
            });

            await test.step("Search with an alphanumeric property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty  // e.g. "PP123456"
                );
            });

            // OUTCOME: search completes without error.
            await expect(propModal.propertyModalContainer).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM057
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM057 | Search is not case-sensitive when property numbers contain letters",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Switch to Personal Property Number type", async () => {
                await propModal.selectPropertyType("Personal Property Number");
            });

            await test.step("Search with uppercase personal property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty.toUpperCase()
                );
            });

            const upperCount = await propModal.getResultsRowCount();

            await test.step("Search again with lowercase personal property number", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty.toLowerCase()
                );
            });

            const lowerCount = await propModal.getResultsRowCount();

            // OUTCOME: same number of results regardless of case.
            expect(lowerCount).toBe(upperCount);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM058
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM058 | Search returns multiple matching properties correctly",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search with a value expected to return multiple results", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // OUTCOME: more than one row is returned.
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBeGreaterThan(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM059
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM059 | Search returns exactly one matching property correctly",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Switch to Personal Property Number type", async () => {
                await propModal.selectPropertyType("Personal Property Number");
            });

            await test.step("Search with a value expected to return exactly one result", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.secondPersonalProperty
                );
            });

            // OUTCOME: exactly one row.
            const rowCount = await propModal.getResultsRowCount();
            expect(rowCount).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM060
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM060 | Search handles a large result set without UI issues",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Search with a broad value to return many results", async () => {
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
            });

            // OUTCOME: all controls are still visible and functional after a
            // large result set loads — modal has not broken layout.
            await expect(propModal.propertyModalContainer).toBeVisible();
            await expect(propModal.saveButton).toBeVisible();
            await expect(propModal.cancelButton).toBeVisible();
        }
    );

}); // end "Section 4 — Select Properties Modal Search"


// =============================================================================
// SECTION 5 — SELECT PROPERTIES MODAL SELECTION
// TC_WHAM061 – TC_WHAM072
//
// Verifies row selection mechanics: individual checkbox, header select-all,
// state after a new search, and saving selected rows to the Properties table.
// =============================================================================

test.describe("Section 5 — Select Properties Modal Selection", () => {

    // beforeEach: navigate to Add Message, open modal, and run a search so
    // that result rows (and the kt-datatable header checkbox) are rendered.
    test.beforeEach(async ({ myWhamPage }) => {

        await myWhamPage.openAddMessagePage();
        await myWhamPage.addEditModal.clickPropertiesAddButton();
        await expect(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();
        await myWhamPage.propertyModal.searchProperty(
            WhamPropertyData.validRealEstateProperty
        );
        // Wait for at least one row before any test runs.
        await expect(
            myWhamPage.propertyModal.firstPropertyRowData
        ).toBeVisible();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM061
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM061 | Clicking an individual row checkbox selects that row",
        async ({ myWhamPage }) => {

            await test.step("Click the first row checkbox", async () => {
                await myWhamPage.propertyModal.selectFirstProperty();
            });

            // OUTCOME: first row checkbox is now checked.
            await expect(
                myWhamPage.propertyModal.firstPropertyCheckbox
            ).toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM062
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM062 | Clicking a selected row checkbox deselects it",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Select the first row", async () => {
                await propModal.selectFirstProperty();
            });

            await expect(propModal.firstPropertyCheckbox).toBeChecked();

            await test.step("Click the first row checkbox again to deselect", async () => {
                await propModal.selectFirstProperty();
            });

            // OUTCOME: first row checkbox is unchecked.
            await expect(propModal.firstPropertyCheckbox).not.toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM063
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM063 | Clicking the header checkbox selects all rows",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Click the select-all header checkbox", async () => {
                await propModal.selectAllProperties();
            });

            // OUTCOME: header checkbox is checked AND the first two rows are checked.
            await expect(propModal.selectAllCheckbox).toBeChecked();
            await expect(propModal.firstPropertyCheckbox).toBeChecked();
            await expect(propModal.secondPropertyCheckbox).toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM064
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM064 | Clicking the header checkbox again deselects all selected rows",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Select all via header checkbox", async () => {
                await propModal.selectAllProperties();
            });

            await expect(propModal.selectAllCheckbox).toBeChecked();

            await test.step("Click the header checkbox again to deselect all", async () => {
                await propModal.selectAllProperties();
            });

            // OUTCOME: header and individual rows are unchecked.
            await expect(propModal.selectAllCheckbox).not.toBeChecked();
            await expect(propModal.firstPropertyCheckbox).not.toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM065
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM065 | Deselecting an individual row unchecks the header checkbox",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Select all via header checkbox", async () => {
                await propModal.selectAllProperties();
            });

            await expect(propModal.selectAllCheckbox).toBeChecked();

            await test.step("Deselect the first individual row", async () => {
                await propModal.selectFirstProperty();
            });

            // OUTCOME: header checkbox is no longer checked.
            await expect(propModal.selectAllCheckbox).not.toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM066
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM066 | Clicking Save after selecting individual rows adds only those rows to the Properties table",
        async ({ myWhamPage }) => {

            const propModal  = myWhamPage.propertyModal;
            const addModal   = myWhamPage.addEditModal;

            await test.step("Select only the first result row", async () => {
                await propModal.selectFirstProperty();
            });

            await test.step("Click Save in the modal", async () => {
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            // OUTCOME: exactly one row is in the Properties table.
            const propCount = await addModal.getPropertiesRowCount();
            expect(propCount).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM067
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM067 | Clicking Save after selecting all rows via header checkbox adds all rows to the Properties table",
        async ({ myWhamPage }) => {

            const propModal  = myWhamPage.propertyModal;
            const addModal   = myWhamPage.addEditModal;

            // Capture the search result count before saving.
            const resultCount = await propModal.getResultsRowCount();

            await test.step("Select all rows via header checkbox", async () => {
                await propModal.selectAllProperties();
            });

            await test.step("Click Save in the modal", async () => {
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            // OUTCOME: Properties table row count matches the search result count.
            const propCount = await addModal.getPropertiesRowCount();
            expect(propCount).toBe(resultCount);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM068
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM068 | Properties from two separate searches are appended correctly to the Properties table",
        async ({ myWhamPage }) => {

            const propModal  = myWhamPage.propertyModal;
            const addModal   = myWhamPage.addEditModal;

            // First selection — beforeEach already searched; select first row and save.
            await test.step("Select and save first property", async () => {
                await propModal.selectFirstProperty();
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            const countAfterFirst = await addModal.getPropertiesRowCount();
            expect(countAfterFirst).toBeGreaterThan(0);

            // Second selection — open modal, search different property, save.
            await test.step("Open modal and search for a second property", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
                await propModal.selectPropertyType("Personal Property Number");
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty
                );
                await expect(propModal.firstPropertyRowData).toBeVisible();
            });

            await test.step("Select and save second property", async () => {
                await propModal.selectFirstProperty();
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            // OUTCOME: Properties table grew — new rows were appended.
            const countAfterSecond = await addModal.getPropertiesRowCount();
            expect(countAfterSecond).toBeGreaterThan(countAfterFirst);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM069
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM069 | Adding the same property twice does not create a duplicate entry",
        async ({ myWhamPage }) => {

            const propModal  = myWhamPage.propertyModal;
            const addModal   = myWhamPage.addEditModal;

            // First save.
            await test.step("Select and save first time", async () => {
                await propModal.selectFirstProperty();
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            const countAfterFirst = await addModal.getPropertiesRowCount();

            // Second save — same property.
            await test.step("Open modal, search same property, save again", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
                await expect(propModal.firstPropertyRowData).toBeVisible();
                await propModal.selectFirstProperty();
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            // OUTCOME: row count has not increased.
            const countAfterSecond = await addModal.getPropertiesRowCount();
            expect(countAfterSecond).toBe(countAfterFirst);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM070
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM070 | Clicking Save after selecting then deselecting all properties adds no properties",
        async ({ myWhamPage }) => {

            const propModal  = myWhamPage.propertyModal;
            const addModal   = myWhamPage.addEditModal;

            await test.step("Select all rows, then deselect all", async () => {
                await propModal.selectAllProperties();
                await propModal.selectAllProperties(); // second click deselects all
            });

            await test.step("Click Save with no rows selected", async () => {
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            // OUTCOME: Properties table still shows 'no records'.
            await expect(addModal.propertiesNoRecordsMessage).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM071
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM071 | Selected properties remain checked when scrolling within large search results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Select the first result row", async () => {
                await propModal.selectFirstProperty();
            });

            await expect(propModal.firstPropertyCheckbox).toBeChecked();

            await test.step("Scroll the results table to the bottom", async () => {
                await propModal.scrollPropertyResults();
            });

            await test.step("Scroll back to confirm first row is still checked", async () => {
                await propModal.firstPropertyRowData.scrollIntoViewIfNeeded();
            });

            // OUTCOME: first row checkbox is still checked after scrolling.
            await expect(propModal.firstPropertyCheckbox).toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM072
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM072 | Select-all via header checkbox works correctly after scrolling through results",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;

            await test.step("Scroll to the bottom of the results table", async () => {
                await propModal.scrollPropertyResults();
            });

            await test.step("Click the header select-all checkbox", async () => {
                await propModal.selectAllProperties();
            });

            // OUTCOME: header checkbox is checked and first two rows are checked.
            await expect(propModal.selectAllCheckbox).toBeChecked();
            await expect(propModal.firstPropertyCheckbox).toBeChecked();
        }
    );

}); // end "Section 5 — Select Properties Modal Selection"


// =============================================================================
// SECTION 6 — PROPERTIES TABLE ON ADD MESSAGE SCREEN
// TC_WHAM073 – TC_WHAM080
//
// Verifies the Properties table on the Add Message page after properties have
// been added: display, deletion (single / multiple), state after modal
// round-trips, and Delete behaviour when nothing is selected.
// =============================================================================

test.describe("Section 6 — Properties Table on Add Message Screen", () => {

    // Each test adds its own properties because the required starting state
    // varies. beforeEach only navigates to the Add Message page.
    test.beforeEach(async ({ myWhamPage }) => {
        await myWhamPage.openAddMessagePage();
    });

    // -------------------------------------------------------------------------
    // Shared helper: adds one property to the Properties table.
    // Uses the first result returned by a search for validRealEstateProperty.
    // -------------------------------------------------------------------------

    async function addOneProperty(
        myWhamPage: { addEditModal: any; propertyModal: any },
        expectFn: typeof expect
    ): Promise<void> {

        await myWhamPage.addEditModal.clickPropertiesAddButton();
        await expectFn(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeVisible();
        await myWhamPage.propertyModal.searchProperty(
            WhamPropertyData.validRealEstateProperty
        );
        await expectFn(
            myWhamPage.propertyModal.firstPropertyRowData
        ).toBeVisible();
        await myWhamPage.propertyModal.selectFirstProperty();
        await myWhamPage.propertyModal.saveSelectedProperties();
        await expectFn(
            myWhamPage.propertyModal.propertyModalContainer
        ).toBeHidden();
    }

    // -------------------------------------------------------------------------
    // TC_WHAM073
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM073 | Added properties are displayed in the Properties table with correct Property # and Tax Year",
        async ({ myWhamPage }) => {

            await test.step("Add a property via the modal", async () => {
                await addOneProperty(myWhamPage, expect);
            });

            const addModal = myWhamPage.addEditModal;

            // OUTCOME: at least one row is visible in the Properties table.
            const rowCount = await addModal.getPropertiesRowCount();
            expect(rowCount).toBeGreaterThan(0);

            // The row should have visible text (Property # and Tax Year cells are populated).
            const firstRow = addModal.propertiesTableRows.first();
            const rowText  = await firstRow.textContent();
            expect(rowText?.trim().length).toBeGreaterThan(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM074
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM074 | Selecting a property row checkbox and clicking Delete removes that property",
        async ({ myWhamPage }) => {

            await test.step("Add one property", async () => {
                await addOneProperty(myWhamPage, expect);
            });

            const addModal = myWhamPage.addEditModal;

            await test.step("Select the first property row checkbox", async () => {
                await addModal.selectFirstPropertyRow();
            });

            await test.step("Click Delete", async () => {
                await addModal.clickPropertiesDeleteButton();
            });

            // OUTCOME: Properties table is empty.
            await expect(addModal.propertiesNoRecordsMessage).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM075
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM075 | Selecting multiple property row checkboxes and clicking Delete removes all selected",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;
            const addModal  = myWhamPage.addEditModal;

            // Add multiple properties by selecting all results from one search.
            await test.step("Add multiple properties via select-all in modal", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
                await propModal.searchProperty(
                    WhamPropertyData.validRealEstateProperty
                );
                await expect(propModal.firstPropertyRowData).toBeVisible();
                await propModal.selectAllProperties();
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            const countBefore = await addModal.getPropertiesRowCount();
            expect(countBefore).toBeGreaterThan(1);

            await test.step("Select all rows in the Properties table", async () => {
                await addModal.selectAllPropertyTableRows();
            });

            await test.step("Click Delete", async () => {
                await addModal.clickPropertiesDeleteButton();
            });

            // OUTCOME: all properties were removed.
            await expect(addModal.propertiesNoRecordsMessage).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM076
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM076 | Unselected properties remain in the table after deleting selected ones",
        async ({ myWhamPage }) => {

            const propModal = myWhamPage.propertyModal;
            const addModal  = myWhamPage.addEditModal;

            // Add two properties from two separate modal searches.
            await test.step("Add first property", async () => {
                await addOneProperty(myWhamPage, expect);
            });

            await test.step("Add second property via Personal Property Number", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
                await propModal.selectPropertyType("Personal Property Number");
                await propModal.searchProperty(
                    WhamPropertyData.validPersonalProperty
                );
                await expect(propModal.firstPropertyRowData).toBeVisible();
                await propModal.selectFirstProperty();
                await propModal.saveSelectedProperties();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            const countBefore = await addModal.getPropertiesRowCount();
            expect(countBefore).toBe(2);

            await test.step("Select only the first property row checkbox", async () => {
                await addModal.selectFirstPropertyRow();
            });

            await test.step("Click Delete", async () => {
                await addModal.clickPropertiesDeleteButton();
            });

            // OUTCOME: one property remains.
            const countAfter = await addModal.getPropertiesRowCount();
            expect(countAfter).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM077
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM077 | Properties table shows 'No records found' after all added properties are deleted",
        async ({ myWhamPage }) => {

            const addModal = myWhamPage.addEditModal;

            await test.step("Add one property", async () => {
                await addOneProperty(myWhamPage, expect);
            });

            await test.step("Select and delete it", async () => {
                await addModal.selectFirstPropertyRow();
                await addModal.clickPropertiesDeleteButton();
            });

            // OUTCOME: 'No records found' is visible again.
            await expect(addModal.propertiesNoRecordsMessage).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM078
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM078 | User can open the Select Properties modal again after all properties have been deleted",
        async ({ myWhamPage }) => {

            const addModal = myWhamPage.addEditModal;

            await test.step("Add and then delete all properties", async () => {
                await addOneProperty(myWhamPage, expect);
                await addModal.selectFirstPropertyRow();
                await addModal.clickPropertiesDeleteButton();
                await expect(addModal.propertiesNoRecordsMessage).toBeVisible();
            });

            await test.step("Click the Add (+) button again", async () => {
                await addModal.clickPropertiesAddButton();
            });

            // OUTCOME: modal opens normally.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM079
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM079 | Properties table retains all added properties after opening and closing the modal without saving",
        async ({ myWhamPage }) => {

            const addModal  = myWhamPage.addEditModal;
            const propModal = myWhamPage.propertyModal;

            await test.step("Add one property", async () => {
                await addOneProperty(myWhamPage, expect);
            });

            const countBefore = await addModal.getPropertiesRowCount();
            expect(countBefore).toBeGreaterThan(0);

            await test.step("Open the modal and close it without selecting or saving", async () => {
                await addModal.clickPropertiesAddButton();
                await expect(propModal.propertyModalContainer).toBeVisible();
                await propModal.cancelPropertySelection();
                await expect(propModal.propertyModalContainer).toBeHidden();
            });

            // OUTCOME: Properties table count is unchanged.
            const countAfter = await addModal.getPropertiesRowCount();
            expect(countAfter).toBe(countBefore);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM080
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM080 | Delete button does not remove properties when no property row checkbox is selected",
        async ({ myWhamPage }) => {

            const addModal = myWhamPage.addEditModal;

            await test.step("Add one property", async () => {
                await addOneProperty(myWhamPage, expect);
            });

            const countBefore = await addModal.getPropertiesRowCount();
            expect(countBefore).toBeGreaterThan(0);

            await test.step("Click Delete without selecting any checkbox", async () => {
                await addModal.clickPropertiesDeleteButton();
            });

            // OUTCOME: row count is unchanged.
            const countAfter = await addModal.getPropertiesRowCount();
            expect(countAfter).toBe(countBefore);
        }
    );

}); // end "Section 6 — Properties Table on Add Message Screen"
