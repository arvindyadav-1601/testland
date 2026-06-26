import { test, expect } from "../../fixtures";
import { MyWhamPage } from "../../pages/MyWhamPage";
import { WhamPropertyData } from "../../testdata/mywham/whamPropertyData";

// =============================================================================
// SECTION 1 — ADD MESSAGE PAGE UI
// TC_WHAM001 – TC_WHAM020
//
// Verifies that all visual elements are present and in their default state
// when the Add Message page first loads.
// =============================================================================

test.describe("Section 1 — Add Message Page UI", () => {

    // -------------------------------------------------------------------------
    // TC_WHAM001 – TC_WHAM017, TC_WHAM019, TC_WHAM020
    // All tests here start after navigating to the Add Message page.
    // -------------------------------------------------------------------------

    test.describe("UI element checks", () => {

        test.beforeEach(async ({ myWhamPage }) => {
            await myWhamPage.openAddMessagePage();
        });

        // ---------------------------------------------------------------------
        // TC_WHAM001
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM001 | All expected form fields and buttons are present on Add Message page",
            async ({ myWhamPage }) => {

                const modal = myWhamPage.addEditModal;

                await expect(modal.assignedUserDropdown).toBeVisible();
                await expect(modal.messageLevelDropdown).toBeVisible();
                await expect(modal.messageTypeDropdown).toBeVisible();
                await expect(modal.messageTextbox).toBeVisible();
                await expect(modal.expirationDateInput).toBeVisible();
                await expect(modal.reminderDropdown).toBeVisible();
                await expect(modal.confidentialCheckbox).toBeAttached();
                await expect(modal.propertiesAddButton).toBeVisible();
                await expect(modal.propertiesDeleteButton).toBeVisible();
                await expect(modal.saveButton).toBeVisible();
                await expect(modal.cancelButton).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM002
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM002 | Breadcrumb shows 'My Wham' link and page title reads 'Add Message'",
            async ({ myWhamPage }) => {

                const modal = myWhamPage.addEditModal;

                await test.step("Breadcrumb home link is present", async () => {
                    await expect(modal.breadcrumb).toBeVisible();
                });

                await test.step("Page title contains 'Add Message'", async () => {
                    await expect(modal.modalTitle).toContainText("Add Message");
                });
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM003 — environment-dependent: banner only shows when one is
        // configured in the app. Test is skipped automatically if the element
        // is absent so it does not fail in environments with no active banner.
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM003 | Maintenance banner is displayed at the top of the Add Message page",
            async ({ myWhamPage }) => {

                const isBannerPresent =
                    await myWhamPage.addEditModal.maintenanceBanner.isVisible();

                test.skip(
                    !isBannerPresent,
                    "No active maintenance banner in this environment — skipping."
                );

                await expect(myWhamPage.addEditModal.maintenanceBanner).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM004 — environment-dependent: same guard as TC_WHAM003.
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM004 | Maintenance banner can be dismissed by clicking the X button",
            async ({ myWhamPage }) => {

                const modal = myWhamPage.addEditModal;

                const isBannerPresent = await modal.maintenanceBanner.isVisible();

                test.skip(
                    !isBannerPresent,
                    "No active maintenance banner in this environment — skipping."
                );

                await test.step("Click the banner dismiss button", async () => {
                    await modal.clickMaintenanceBannerClose();
                });

                // OUTCOME: banner is gone after dismissal.
                await expect(modal.maintenanceBanner).toBeHidden();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM005
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM005 | Level field has a required indicator",
            async ({ myWhamPage }) => {

                // The `required` HTML attribute on the <select> drives both the
                // Parsley validation and the JS-appended asterisk (.requiredMark).
                await expect(
                    myWhamPage.addEditModal.messageLevelDropdown
                ).toHaveAttribute("required");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM006
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM006 | Type field has a required indicator",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.messageTypeDropdown
                ).toHaveAttribute("required");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM007
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM007 | Assigned To dropdown is empty (no selection) by default",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.assignedUserDropdown
                ).toHaveValue("");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM008
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM008 | Level dropdown is empty (no selection) by default",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.messageLevelDropdown
                ).toHaveValue("");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM009
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM009 | Type dropdown is empty (no selection) by default",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.messageTypeDropdown
                ).toHaveValue("");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM010
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM010 | Message textarea is empty by default",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.messageTextbox
                ).toHaveValue("");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM011
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM011 | Expiration Date field displays 'Select date' placeholder by default",
            async ({ myWhamPage }) => {

                const input = myWhamPage.addEditModal.expirationDateInput;

                // Field should be blank and show its placeholder text.
                await expect(input).toHaveValue("");
                await expect(input).toHaveAttribute("placeholder", "Select date");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM012
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM012 | Reminder dropdown defaults to 'No Reminder'",
            async ({ myWhamPage }) => {

                const selectedOption =
                    myWhamPage.addEditModal.reminderDropdown.locator("option:checked");

                await expect(selectedOption).toContainText("No Reminder");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM013
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM013 | Confidential checkbox is unchecked by default",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.confidentialCheckbox
                ).not.toBeChecked();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM014
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM014 | Properties section displays 'No records found' when no properties are added",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.propertiesNoRecordsMessage
                ).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM015
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM015 | Properties section table displays 'Property #' and 'Tax Year' column headers",
            async ({ myWhamPage }) => {

                const modal = myWhamPage.addEditModal;

                await expect(modal.propertiesTablePropertyHeader).toBeVisible();
                await expect(modal.propertiesTaxYearHeader).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM016
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM016 | Properties section displays an Add (+) button",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.propertiesAddButton
                ).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM017
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM017 | Properties section displays a Delete button",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.propertiesDeleteButton
                ).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM019
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM019 | Save button is visible and enabled on the Add Message page",
            async ({ myWhamPage }) => {

                const save = myWhamPage.addEditModal.saveButton;

                await expect(save).toBeVisible();
                await expect(save).toBeEnabled();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM020
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM020 | Cancel button is visible and enabled on the Add Message page",
            async ({ myWhamPage }) => {

                const cancel = myWhamPage.addEditModal.cancelButton;

                await expect(cancel).toBeVisible();
                await expect(cancel).toBeEnabled();
            }
        );

    }); // end "UI element checks"

    // -------------------------------------------------------------------------
    // TC_WHAM018
    // Requires a console-error listener to be registered BEFORE any navigation.
    // Cannot share the beforeEach above (which would navigate first).
    // Uses authenticatedPage directly to set up the listener, then navigates.
    // -------------------------------------------------------------------------

    test.describe("Console errors check", () => {

        test(
            "TC_WHAM018 | Add Message page loads without any browser console errors",
            async ({ authenticatedPage }) => {

                const consoleErrors: string[] = [];

                // Register listener before navigation so no errors are missed.
                authenticatedPage.on("console", msg => {
                    if (msg.type() === "error") {
                        consoleErrors.push(msg.text());
                    }
                });

                const whamPage = new MyWhamPage(authenticatedPage);

                await test.step("Navigate to My Wham", async () => {
                    await whamPage.openMyWhamPage();
                });

                await test.step("Navigate to Add Message page", async () => {
                    await whamPage.openAddMessagePage();
                });

                // OUTCOME: no console errors during page load.
                expect(
                    consoleErrors,
                    `Unexpected console errors: ${consoleErrors.join("; ")}`
                ).toHaveLength(0);
            }
        );

    }); // end "Console errors check"

}); // end "Section 1 — Add Message Page UI"


// =============================================================================
// SECTION 2 — SELECT PROPERTIES MODAL UI
// TC_WHAM021 – TC_WHAM030
//
// Verifies the visual structure and default state of the Select Properties
// modal that opens when the user clicks the Add (+) button in the Properties
// section of the Add Message page.
// =============================================================================

test.describe("Section 2 — Select Properties Modal UI", () => {

    // -------------------------------------------------------------------------
    // TC_WHAM021
    // Verifies the modal-open action itself — beforeEach navigates to the Add
    // Message page only; the test clicks Add and asserts the modal opened.
    // -------------------------------------------------------------------------

    test.describe("Opening the modal", () => {

        test.beforeEach(async ({ myWhamPage }) => {
            await myWhamPage.openAddMessagePage();
        });

        test(
            "TC_WHAM021 | Clicking the Add (+) button opens the Select Properties modal",
            async ({ myWhamPage }) => {

                await test.step("Click the Add (+) button in the Properties section", async () => {
                    await myWhamPage.addEditModal.clickPropertiesAddButton();
                });

                // OUTCOME: the modal body is visible.
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
            }
        );

    }); // end "Opening the modal"

    // -------------------------------------------------------------------------
    // TC_WHAM022 – TC_WHAM029
    // All verify UI state with the modal already open.
    // beforeEach: navigate to Add Message + open the modal.
    // -------------------------------------------------------------------------

    test.describe("Modal UI elements", () => {

        test.beforeEach(async ({ myWhamPage }) => {

            await myWhamPage.openAddMessagePage();
            await myWhamPage.addEditModal.clickPropertiesAddButton();

            // Wait until modal body is visible before any test runs.
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
        });

        // ---------------------------------------------------------------------
        // TC_WHAM022
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM022 | Background overlay is visible (dimmed) when the modal is open",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.propertyModal.modalOverlay
                ).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM023
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM023 | Select Properties modal renders with all expected controls",
            async ({ myWhamPage }) => {

                const propModal = myWhamPage.propertyModal;

                // NOTE: the results table (and its headers/checkboxes) is rendered
                // by kt-datatable only after a search is executed. Assertions that
                // depend on search results belong in TC_WHAM027 and TC_WHAM028.
                // This test verifies only the static controls present on modal open.

                await test.step("Property Number Type dropdown is present", async () => {
                    await expect(propModal.propertyTypeDropdown).toBeVisible();
                });

                await test.step("Property Number input field is present", async () => {
                    await expect(propModal.searchInput).toBeVisible();
                });

                await test.step("Search button is present", async () => {
                    await expect(propModal.searchButton).toBeVisible();
                });

                await test.step("Save button is present", async () => {
                    await expect(propModal.saveButton).toBeVisible();
                });

                await test.step("Cancel button is present", async () => {
                    await expect(propModal.cancelButton).toBeVisible();
                });

                await test.step("Close (X) button is present", async () => {
                    await expect(propModal.closePropertyModalButton).toBeVisible();
                });
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM024
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM024 | Property Number Type dropdown contains 'Parcel Number' and 'Personal Property Number' options",
            async ({ myWhamPage }) => {

                const dropdown = myWhamPage.propertyModal.propertyTypeDropdown;

                await expect(
                    dropdown.locator("option").filter({ hasText: "Parcel Number" })
                ).toBeAttached();

                await expect(
                    dropdown.locator("option").filter({ hasText: "Personal Property Number" })
                ).toBeAttached();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM025
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM025 | Property Number Type defaults to 'Parcel Number'",
            async ({ myWhamPage }) => {

                const selectedOption =
                    myWhamPage.propertyModal.propertyTypeDropdown.locator("option:checked");

                await expect(selectedOption).toContainText("Parcel Number");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM026
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM026 | Property Number input field is empty by default",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.propertyModal.searchInput
                ).toHaveValue("");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM027
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM027 | Results table displays all expected column headers after a search",
            async ({ myWhamPage }) => {

                const propModal = myWhamPage.propertyModal;

                // kt-datatable renders headers only after the first search call.
                await test.step("Run a search to trigger table render", async () => {
                    await propModal.searchProperty(
                        WhamPropertyData.validRealEstateProperty
                    );
                });

                await expect(propModal.resultsPropertyHeader).toBeVisible();
                await expect(propModal.resultsTaxYearHeader).toBeVisible();
                await expect(propModal.resultsCreationDateHeader).toBeVisible();
                await expect(propModal.resultsCurrentHeader).toBeVisible();
                await expect(propModal.resultsDescriptionHeader).toBeVisible();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM028
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM028 | Results table header contains a select-all checkbox after a search",
            async ({ myWhamPage }) => {

                const propModal = myWhamPage.propertyModal;

                // kt-datatable renders the header checkbox only after the first search.
                await test.step("Run a search to trigger table render", async () => {
                    await propModal.searchProperty(
                        WhamPropertyData.validRealEstateProperty
                    );
                });

                await expect(propModal.selectAllCheckbox).toBeAttached();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM029
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM029 | Select Properties modal title is displayed correctly",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.propertyModal.modalTitle
                ).toContainText("Select Properties");
            }
        );



    }); // end "Modal UI elements"

    // -------------------------------------------------------------------------
    // TC_WHAM030
    // Same pattern as TC_WHAM018 — listener must precede all navigation.
    // -------------------------------------------------------------------------

    test.describe("Console errors check", () => {

        test(
            "TC_WHAM030 | Select Properties modal opens without any browser console errors",
            async ({ authenticatedPage }) => {

                const consoleErrors: string[] = [];

                authenticatedPage.on("console", msg => {
                    if (msg.type() === "error") {
                        consoleErrors.push(msg.text());
                    }
                });

                const whamPage = new MyWhamPage(authenticatedPage);

                await test.step("Navigate to My Wham", async () => {
                    await whamPage.openMyWhamPage();
                });

                await test.step("Navigate to Add Message page", async () => {
                    await whamPage.openAddMessagePage();
                });

                await test.step("Open Select Properties modal", async () => {
                    await whamPage.addEditModal.clickPropertiesAddButton();
                    await expect(
                        whamPage.propertyModal.propertyModalContainer
                    ).toBeVisible();
                });

                // OUTCOME: no console errors during the entire flow.
                expect(
                    consoleErrors,
                    `Unexpected console errors: ${consoleErrors.join("; ")}`
                ).toHaveLength(0);
            }
        );

    }); // end "Console errors check"

}); // end "Section 2 — Select Properties Modal UI"
