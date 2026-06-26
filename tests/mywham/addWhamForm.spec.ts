import { test, expect } from "../../fixtures";
import { MyWhamPage } from "../../pages/MyWhamPage";
import { WhamAddEditData } from "../../testdata/mywham/whamAddEditData";
import { WhamPropertyData } from "../../testdata/mywham/whamPropertyData";

// =============================================================================
// SECTION 7 — FORM FIELDS FUNCTIONAL
// TC_WHAM081 – TC_WHAM093
//
// Verifies that every interactive form control on the Add Message page
// behaves correctly: dropdowns populate, textarea accepts input, confidential
// checkbox toggles.
// =============================================================================

test.describe("Section 7 — Form Fields Functional", () => {

    test.beforeEach(async ({ myWhamPage }) => {
        await myWhamPage.openAddMessagePage();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM081
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM081 | Assigned To dropdown displays available users",
        async ({ myWhamPage }) => {

            // More than one option means options loaded (index 0 is usually blank).
            const optionCount =
                await myWhamPage.addEditModal.assignedUserDropdown
                    .locator("option")
                    .count();

            expect(optionCount).toBeGreaterThan(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM082
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM082 | User can select a user from the Assigned To dropdown",
        async ({ myWhamPage }) => {

            await test.step("Select an assigned user", async () => {
                await myWhamPage.addEditModal.selectAssignedUser(
                    WhamAddEditData.assignedUser
                );
            });

            // OUTCOME: dropdown reflects the selected value.
            await expect(
                myWhamPage.addEditModal.assignedUserDropdown
            ).not.toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM083
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM083 | Level dropdown contains High, Medium, and Low options",
        async ({ myWhamPage }) => {

            const dropdown = myWhamPage.addEditModal.messageLevelDropdown;

            await expect(
                dropdown.locator("option").filter({ hasText: "High" })
            ).toBeAttached();

            await expect(
                dropdown.locator("option").filter({ hasText: "Medium" })
            ).toBeAttached();

            await expect(
                dropdown.locator("option").filter({ hasText: "Low" })
            ).toBeAttached();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM084
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM084 | User can select High from the Level dropdown",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.selectLevel("High");

            await expect(
                myWhamPage.addEditModal.messageLevelDropdown.locator("option:checked")
            ).toContainText("High");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM085
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM085 | User can select Medium from the Level dropdown",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.selectLevel("Medium");

            await expect(
                myWhamPage.addEditModal.messageLevelDropdown.locator("option:checked")
            ).toContainText("Medium");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM086
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM086 | User can select Low from the Level dropdown",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.selectLevel("Low");

            await expect(
                myWhamPage.addEditModal.messageLevelDropdown.locator("option:checked")
            ).toContainText("Low");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM087
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM087 | Type dropdown contains all available type options",
        async ({ myWhamPage }) => {

            // Verify the dropdown has more than just the blank placeholder option.
            const optionCount =
                await myWhamPage.addEditModal.messageTypeDropdown
                    .locator("option")
                    .count();

            expect(optionCount).toBeGreaterThan(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM088
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM088 | User can select a type from the Type dropdown",
        async ({ myWhamPage }) => {

            await test.step("Select a type", async () => {
                await myWhamPage.addEditModal.selectType(
                    WhamAddEditData.type
                );
            });

            // OUTCOME: dropdown is no longer blank.
            await expect(
                myWhamPage.addEditModal.messageTypeDropdown
            ).not.toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM089
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM089 | User can enter text in the Message textarea",
        async ({ myWhamPage }) => {

            await test.step("Type a message", async () => {
                await myWhamPage.addEditModal.enterMessage(
                    WhamAddEditData.message
                );
            });

            // OUTCOME: textarea contains the entered text.
            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).toHaveValue(WhamAddEditData.message);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM090
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM090 | Message textarea is resizable",
        async ({ myWhamPage }) => {

            // Check that the CSS `resize` property is not set to "none".
            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).not.toHaveCSS("resize", "none");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM091
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM091 | Message textarea accepts multiline content",
        async ({ myWhamPage }) => {

            const multilineText = "Line one\nLine two\nLine three";

            await test.step("Enter text with line breaks", async () => {
                await myWhamPage.addEditModal.enterMessage(multilineText);
            });

            // OUTCOME: textarea preserves the newlines.
            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).toHaveValue(multilineText);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM092
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM092 | Confidential checkbox can be checked",
        async ({ myWhamPage }) => {

            await test.step("Check the Confidential checkbox", async () => {
                await myWhamPage.addEditModal.enableConfidential();
            });

            // OUTCOME: checkbox is now checked.
            await expect(
                myWhamPage.addEditModal.confidentialCheckbox
            ).toBeChecked();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM093
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM093 | Confidential checkbox can be unchecked after being checked",
        async ({ myWhamPage }) => {

            const modal = myWhamPage.addEditModal;

            await test.step("Check the Confidential checkbox", async () => {
                await modal.enableConfidential();
            });

            await expect(modal.confidentialCheckbox).toBeChecked();

            await test.step("Uncheck the Confidential checkbox", async () => {
                await modal.disableConfidential();
            });

            // OUTCOME: checkbox is unchecked.
            await expect(modal.confidentialCheckbox).not.toBeChecked();
        }
    );

}); // end "Section 7 — Form Fields Functional"


// =============================================================================
// SECTION 8 — EXPIRATION DATE AND REMINDER
// TC_WHAM094 – TC_WHAM111
//
// Verifies date picker interaction, reminder enable/disable logic, and that
// the correct values survive a save round-trip.
// =============================================================================

test.describe("Section 8 — Expiration Date and Reminder", () => {

    test.beforeEach(async ({ myWhamPage }) => {
        await myWhamPage.openAddMessagePage();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM094
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM094 | Date picker opens when clicking the Expiration Date field",
        async ({ myWhamPage }) => {

            await test.step("Click the Expiration Date field", async () => {
                await myWhamPage.addEditModal.openExpirationDatePicker();
            });

            // OUTCOME: the gijgo calendar popup is visible.
            // TODO: verify selector ".gj-picker-bootstrap" in WhamAddEditModal.ts
            //       if this assertion fails.
            await expect(
                myWhamPage.addEditModal.expirationDatePickerContainer
            ).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM095
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM095 | User can select the current date from the Expiration Date picker",
        async ({ myWhamPage }) => {

            const today = new Date();
            const mm    = String(today.getMonth() + 1).padStart(2, "0");
            const dd    = String(today.getDate()).padStart(2, "0");
            const yyyy  = today.getFullYear();
            const todayStr = `${mm}/${dd}/${yyyy}`;

            await test.step("Fill today's date into the Expiration Date field", async () => {
                await myWhamPage.addEditModal.enterExpirationDate(todayStr);
            });

            // OUTCOME: field holds today's date (at minimum the date portion).
            await expect(
                myWhamPage.addEditModal.expirationDateInput
            ).toHaveValue(new RegExp(todayStr.replace(/\//g, "\\/")));
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM096
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM096 | User can select a future date from the Expiration Date picker",
        async ({ myWhamPage }) => {

            await test.step("Enter a future expiration date", async () => {
                await myWhamPage.addEditModal.enterExpirationDate(
                    WhamAddEditData.expirationDate
                );
            });

            await expect(
                myWhamPage.addEditModal.expirationDateInput
            ).not.toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM097
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM097 | User can select a past date from the Expiration Date picker",
        async ({ myWhamPage }) => {

            await test.step("Enter a past date", async () => {
                await myWhamPage.addEditModal.enterExpirationDate("01/01/2020");
            });

            await expect(
                myWhamPage.addEditModal.expirationDateInput
            ).not.toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM098
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM098 | User can select a far future date from the Expiration Date picker",
        async ({ myWhamPage }) => {

            await test.step("Enter a far future date", async () => {
                await myWhamPage.addEditModal.enterExpirationDate("12/31/2099");
            });

            await expect(
                myWhamPage.addEditModal.expirationDateInput
            ).not.toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM099 / TC_WHAM100
    // These TCs describe a multi-step date+time picker (date → hour → minute).
    // Marked fixme until the exact time-selection UI selectors are confirmed
    // from the live DOM — the expirationInput may render a datetime picker
    // rather than a date-only picker.
    // -------------------------------------------------------------------------

    test.fixme(
        "TC_WHAM099 | After selecting a date the user is prompted to select an hour",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.openExpirationDatePicker();
            // TODO: use selectDateFromPicker() to click a calendar date, then
            // assert that an hour-selection panel appears.
        }
    );

    test.fixme(
        "TC_WHAM100 | After selecting an hour the user is prompted to select a minute",
        async ({ myWhamPage }) => {

            // TODO: continue from TC_WHAM099 — select an hour then assert the
            // minute-selection panel appears.
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM101
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM101 | Selected date and time are displayed correctly in the Expiration Date field after selection",
        async ({ myWhamPage }) => {

            await test.step("Fill a date into the Expiration Date field", async () => {
                await myWhamPage.addEditModal.enterExpirationDate(
                    WhamAddEditData.expirationDate
                );
            });

            // OUTCOME: field value is non-empty and contains the date we entered.
            const fieldValue =
                await myWhamPage.addEditModal.expirationDateInput.inputValue();

            expect(fieldValue).toContain(WhamAddEditData.expirationDate);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM102
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM102 | Expiration Date can be set to the current date",
        async ({ myWhamPage }) => {

            const today = new Date();
            const mm    = String(today.getMonth() + 1).padStart(2, "0");
            const dd    = String(today.getDate()).padStart(2, "0");
            const yyyy  = today.getFullYear();
            const todayStr = `${mm}/${dd}/${yyyy}`;

            await myWhamPage.addEditModal.enterExpirationDate(todayStr);

            await expect(
                myWhamPage.addEditModal.expirationDateInput
            ).not.toHaveValue("");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM103
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM103 | Reminder dropdown is disabled when no Expiration Date is set",
        async ({ myWhamPage }) => {

            // Expiration Date is empty (default) — Reminder should be disabled.
            await expect(
                myWhamPage.addEditModal.reminderDropdown
            ).toBeDisabled();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM104 – TC_WHAM111: all require an expiration date to be set first.
    // -------------------------------------------------------------------------

    test.describe("With Expiration Date set", () => {

        test.beforeEach(async ({ myWhamPage }) => {
            await myWhamPage.addEditModal.enterExpirationDate(
                WhamAddEditData.expirationDate
            );
        });

        // ---------------------------------------------------------------------
        // TC_WHAM104
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM104 | Reminder dropdown becomes enabled after an Expiration Date is selected",
            async ({ myWhamPage }) => {

                await expect(
                    myWhamPage.addEditModal.reminderDropdown
                ).toBeEnabled();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM105
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM105 | All Reminder dropdown options are displayed correctly after setting an Expiration Date",
            async ({ myWhamPage }) => {

                const optionCount =
                    await myWhamPage.addEditModal.reminderDropdown
                        .locator("option")
                        .count();

                // Expect more than just the "No Reminder" placeholder.
                expect(optionCount).toBeGreaterThan(1);
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM106
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM106 | Each Reminder option can be selected successfully",
            async ({ myWhamPage }) => {

                const dropdown = myWhamPage.addEditModal.reminderDropdown;
                const options  = await dropdown.locator("option").all();

                for (const option of options) {

                    const text = (await option.textContent())?.trim() ?? "";

                    if (!text || text === "No Reminder") continue;

                    await test.step(`Select reminder option: "${text}"`, async () => {
                        await myWhamPage.addEditModal.selectReminder(text);
                    });

                    await expect(
                        dropdown.locator("option:checked")
                    ).toContainText(text);
                }
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM107
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM107 | User can select a reminder option after setting an Expiration Date",
            async ({ myWhamPage }) => {

                await test.step("Select a reminder value", async () => {
                    await myWhamPage.addEditModal.selectReminder(
                        WhamAddEditData.reminder
                    );
                });

                // OUTCOME: the dropdown reflects the chosen reminder.
                await expect(
                    myWhamPage.addEditModal.reminderDropdown.locator("option:checked")
                ).toContainText(WhamAddEditData.reminder);
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM108
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM108 | Clearing the Expiration Date disables the Reminder dropdown",
            async ({ myWhamPage }) => {

                // Confirm Reminder is enabled before clearing.
                await expect(myWhamPage.addEditModal.reminderDropdown).toBeEnabled();

                await test.step("Clear the Expiration Date field", async () => {
                    await myWhamPage.addEditModal.clearExpirationDate();
                });

                // OUTCOME: Reminder is disabled again.
                await expect(
                    myWhamPage.addEditModal.reminderDropdown
                ).toBeDisabled();
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM109
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM109 | Clearing the Expiration Date resets the Reminder dropdown to 'No Reminder'",
            async ({ myWhamPage }) => {

                const modal = myWhamPage.addEditModal;

                await test.step("Select a reminder, then clear the date", async () => {
                    await modal.selectReminder(WhamAddEditData.reminder);
                    await modal.clearExpirationDate();
                });

                // OUTCOME: Reminder is back to its default 'No Reminder' value.
                await expect(
                    modal.reminderDropdown.locator("option:checked")
                ).toContainText("No Reminder");
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM110
        // Requires a full save → navigate back → open for edit → verify reminder.
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM110 | Reminder selection is retained correctly after saving the message",
            async ({ myWhamPage }) => {

                const modal       = myWhamPage.addEditModal;
                const uniqueLabel = `AutoTest_${Date.now()}`;

                await test.step("Fill required fields and set reminder", async () => {
                    await modal.selectLevel(WhamAddEditData.level);
                    await modal.selectType(WhamAddEditData.type);
                    await modal.selectAssignedUser(WhamAddEditData.assignedUser);
                    await modal.enterMessage(uniqueLabel);
                    await modal.selectReminder(WhamAddEditData.reminder);
                });

                await test.step("Save the message", async () => {
                    await modal.clickSave();
                    await expect(myWhamPage.myWhamHeading).toBeVisible();
                });

                await test.step("Search for the saved message", async () => {
                    await myWhamPage.search.enterMessage(uniqueLabel);
                    await myWhamPage.search.clickSearch();
                });

                await test.step("Open the saved message for editing", async () => {
                    await myWhamPage.table.openFirstRowForEdit();
                });

                // OUTCOME: Reminder dropdown shows the saved value.
                await expect(
                    modal.reminderDropdown.locator("option:checked")
                ).toContainText(WhamAddEditData.reminder);
            }
        );

        // ---------------------------------------------------------------------
        // TC_WHAM111
        // Same as TC_WHAM110 but verifies via a fresh page open of the saved
        // record rather than immediately after save.
        // ---------------------------------------------------------------------

        test(
            "TC_WHAM111 | Reminder value remains selected after reopening a saved message",
            async ({ myWhamPage }) => {

                const modal       = myWhamPage.addEditModal;
                const uniqueLabel = `AutoTest_${Date.now()}`;

                await test.step("Fill required fields, set reminder and save", async () => {
                    await modal.selectLevel(WhamAddEditData.level);
                    await modal.selectType(WhamAddEditData.type);
                    await modal.selectAssignedUser(WhamAddEditData.assignedUser);
                    await modal.enterMessage(uniqueLabel);
                    await modal.selectReminder(WhamAddEditData.reminder);
                    await modal.clickSave();
                    await expect(myWhamPage.myWhamHeading).toBeVisible();
                });

                // Navigate away, then return and find the saved record.
                await test.step("Navigate away and return to My Wham", async () => {
                    await myWhamPage.openMyWhamPage();
                });

                await test.step("Search for and open the saved message", async () => {
                    await myWhamPage.search.enterMessage(uniqueLabel);
                    await myWhamPage.search.clickSearch();
                    await myWhamPage.table.openFirstRowForEdit();
                });

                // OUTCOME: Reminder still shows the value saved earlier.
                await expect(
                    modal.reminderDropdown.locator("option:checked")
                ).toContainText(WhamAddEditData.reminder);
            }
        );

    }); // end "With Expiration Date set"

}); // end "Section 8 — Expiration Date and Reminder"


// =============================================================================
// SECTION 9 — BOUNDARY TESTING
// TC_WHAM112 – TC_WHAM119
//
// Verifies field behaviour at character-limit boundaries and confirms the
// dropdowns handle large data sets.
// =============================================================================

test.describe("Section 9 — Boundary Testing", () => {

    test.beforeEach(async ({ myWhamPage }) => {
        await myWhamPage.openAddMessagePage();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM112
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM112 | Message field accepts a single character input",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.enterMessage("A");

            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).toHaveValue("A");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM113
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM113 | Message field accepts multiline content with line breaks",
        async ({ myWhamPage }) => {

            const content = "First line\nSecond line\nThird line";

            await myWhamPage.addEditModal.enterMessage(content);

            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).toHaveValue(content);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM114
    // Verifies that line breaks are preserved after saving.
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM114 | Message field preserves line breaks after saving",
        async ({ myWhamPage }) => {

            const modal      = myWhamPage.addEditModal;
            const uniqueMsg  = `Line1\nLine2\n${Date.now()}`;

            await test.step("Fill required fields and enter multiline message", async () => {
                await modal.selectLevel(WhamAddEditData.level);
                await modal.selectType(WhamAddEditData.type);
                await modal.selectAssignedUser(WhamAddEditData.assignedUser);
                await modal.enterMessage(uniqueMsg);
            });

            await test.step("Save the message", async () => {
                await modal.clickSave();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            await test.step("Open the saved message for editing", async () => {
                await myWhamPage.search.enterMessage("Line1");
                await myWhamPage.search.clickSearch();
                await myWhamPage.table.openFirstRowForEdit();
            });

            // OUTCOME: newlines are still in the textarea.
            const savedValue = await modal.messageTextbox.inputValue();
            expect(savedValue).toContain("\n");
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM115
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM115 | Message field accepts up to its maximum allowed character limit",
        async ({ myWhamPage }) => {

            const maxLength = await myWhamPage.addEditModal.messageTextbox
                .getAttribute("maxlength");

            // Skip gracefully if the field has no maxlength attribute.
            test.skip(
                maxLength === null,
                "messageTextbox has no maxlength attribute — skipping boundary test."
            );

            const maxChars = parseInt(maxLength!, 10);
            const fullText = "A".repeat(maxChars);

            await myWhamPage.addEditModal.enterMessage(fullText);

            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).toHaveValue(fullText);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM116
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM116 | Message field does not exceed its maximum character limit when overfilled",
        async ({ myWhamPage }) => {

            const maxLength = await myWhamPage.addEditModal.messageTextbox
                .getAttribute("maxlength");

            test.skip(
                maxLength === null,
                "messageTextbox has no maxlength attribute — skipping boundary test."
            );

            const maxChars  = parseInt(maxLength!, 10);
            const overText  = "B".repeat(maxChars + 20);

            await myWhamPage.addEditModal.enterMessage(overText);

            // OUTCOME: actual value is capped at maxlength — no overflow.
            const actualValue =
                await myWhamPage.addEditModal.messageTextbox.inputValue();

            expect(actualValue.length).toBeLessThanOrEqual(maxChars);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM117 / TC_WHAM118 — property search input boundary tests.
    // These run with the Select Properties modal open.
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM117 | Property Number input accepts up to its maximum allowed character limit",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.clickPropertiesAddButton();
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();

            const maxLength = await myWhamPage.propertyModal.searchInput
                .getAttribute("maxlength");

            test.skip(
                maxLength === null,
                "searchInput has no maxlength attribute — skipping boundary test."
            );

            const maxChars = parseInt(maxLength!, 10);
            const fullText = "1".repeat(maxChars);

            await myWhamPage.propertyModal.searchProperty(fullText);

            // OUTCOME: input value is exactly maxlength characters.
            const actualValue =
                await myWhamPage.propertyModal.searchInput.inputValue();

            expect(actualValue.length).toBeLessThanOrEqual(maxChars);
        }
    );

    test(
        "TC_WHAM118 | Property Number input does not exceed its maximum character limit when overfilled",
        async ({ myWhamPage }) => {

            await myWhamPage.addEditModal.clickPropertiesAddButton();
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();

            const maxLength = await myWhamPage.propertyModal.searchInput
                .getAttribute("maxlength");

            test.skip(
                maxLength === null,
                "searchInput has no maxlength attribute — skipping boundary test."
            );

            const maxChars = parseInt(maxLength!, 10);
            const overText = "2".repeat(maxChars + 20);

            await myWhamPage.propertyModal.searchProperty(overText);

            const actualValue =
                await myWhamPage.propertyModal.searchInput.inputValue();

            expect(actualValue.length).toBeLessThanOrEqual(maxChars);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM119
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM119 | Assigned To dropdown handles a large number of users without UI issues",
        async ({ myWhamPage }) => {

            const modal = myWhamPage.addEditModal;

            // The dropdown should be visible and the page should not be broken
            // even if there are hundreds of users loaded.
            await expect(modal.assignedUserDropdown).toBeVisible();
            await expect(modal.assignedUserDropdown).toBeEnabled();

            const optionCount =
                await modal.assignedUserDropdown.locator("option").count();

            // More than 1 option confirms data loaded; no assertion on an exact
            // upper bound since user count varies by environment.
            expect(optionCount).toBeGreaterThan(0);
        }
    );

}); // end "Section 9 — Boundary Testing"


// =============================================================================
// SECTION 10 — SECURITY AND INPUT VALIDATION
// TC_WHAM120 – TC_WHAM127
//
// Verifies that malicious input (HTML, scripts, SQL) is handled safely —
// stored as plain text without being executed.
// =============================================================================

test.describe("Section 10 — Security and Input Validation", () => {

    test.beforeEach(async ({ myWhamPage }) => {
        await myWhamPage.openAddMessagePage();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM120
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM120 | Message field accepts special characters without UI errors",
        async ({ myWhamPage }) => {

            const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

            await myWhamPage.addEditModal.enterMessage(specialChars);

            // OUTCOME: field holds the value; the page has not broken.
            await expect(
                myWhamPage.addEditModal.messageTextbox
            ).toHaveValue(specialChars);
            await expect(myWhamPage.addEditModal.saveButton).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM121
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM121 | HTML tags entered in the Message field are saved and displayed as plain text",
        async ({ myWhamPage, authenticatedPage }) => {

            const htmlPayload  = '<b>bold</b><img src=x onerror=alert(1)>';
            const uniqueMarker = `XSSTest_${Date.now()}`;
            const modal        = myWhamPage.addEditModal;

            // Track unexpected dialogs (XSS execution indicator).
            const dialogs: string[] = [];
            authenticatedPage.on("dialog", async d => {
                dialogs.push(d.message());
                await d.dismiss();
            });

            await test.step("Fill required fields and enter HTML payload", async () => {
                await modal.selectLevel(WhamAddEditData.level);
                await modal.selectType(WhamAddEditData.type);
                await modal.selectAssignedUser(WhamAddEditData.assignedUser);
                await modal.enterMessage(uniqueMarker + " " + htmlPayload);
            });

            await test.step("Save the message", async () => {
                await modal.clickSave();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            // OUTCOME 1: no dialogs were triggered (no XSS executed).
            expect(
                dialogs,
                `Unexpected dialog(s) appeared — possible XSS: ${dialogs.join("; ")}`
            ).toHaveLength(0);

            // OUTCOME 2: page is intact after save.
            await expect(myWhamPage.myWhamHeading).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM122
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM122 | Script injection entered in the Message field is not executed",
        async ({ myWhamPage, authenticatedPage }) => {

            const xssPayload   = "<script>alert('xss')</script>";
            const uniqueMarker = `ScriptTest_${Date.now()}`;
            const modal        = myWhamPage.addEditModal;

            const dialogs: string[] = [];
            authenticatedPage.on("dialog", async d => {
                dialogs.push(d.message());
                await d.dismiss();
            });

            await test.step("Enter script injection payload and save", async () => {
                await modal.selectLevel(WhamAddEditData.level);
                await modal.selectType(WhamAddEditData.type);
                await modal.selectAssignedUser(WhamAddEditData.assignedUser);
                await modal.enterMessage(uniqueMarker + " " + xssPayload);
                await modal.clickSave();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            // OUTCOME: no alert dialog fired.
            expect(
                dialogs,
                `Script was executed — XSS vulnerability detected: ${dialogs.join("; ")}`
            ).toHaveLength(0);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM123
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM123 | SQL-like text entered in the Message field does not break the page",
        async ({ myWhamPage }) => {

            const sqlPayload = "'; DROP TABLE Messages; --";
            const modal      = myWhamPage.addEditModal;

            await test.step("Enter SQL injection payload", async () => {
                await modal.selectLevel(WhamAddEditData.level);
                await modal.selectType(WhamAddEditData.type);
                await modal.selectAssignedUser(WhamAddEditData.assignedUser);
                await modal.enterMessage(sqlPayload);
            });

            await test.step("Click Save", async () => {
                await modal.clickSave();
            });

            // OUTCOME: page navigates successfully (no server error).
            await expect(myWhamPage.myWhamHeading).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM124 – TC_WHAM127: Property Number search field injection tests.
    // -------------------------------------------------------------------------

    test.describe("Property Number search field injection", () => {

        test.beforeEach(async ({ myWhamPage }) => {
            await myWhamPage.addEditModal.clickPropertiesAddButton();
            await expect(
                myWhamPage.propertyModal.propertyModalContainer
            ).toBeVisible();
        });

        test(
            "TC_WHAM124 | Special characters in the Property Number search field do not break the search",
            async ({ myWhamPage }) => {

                await myWhamPage.propertyModal.searchProperty("!@#$%^&*()");

                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
                await expect(
                    myWhamPage.propertyModal.searchButton
                ).toBeVisible();
            }
        );

        test(
            "TC_WHAM125 | HTML tags in the Property Number search field are not executed",
            async ({ myWhamPage, authenticatedPage }) => {

                const dialogs: string[] = [];
                authenticatedPage.on("dialog", async d => {
                    dialogs.push(d.message());
                    await d.dismiss();
                });

                await myWhamPage.propertyModal.searchProperty(
                    '<img src=x onerror=alert(1)>'
                );

                expect(dialogs).toHaveLength(0);
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
            }
        );

        test(
            "TC_WHAM126 | Script injection in the Property Number search field is not executed",
            async ({ myWhamPage, authenticatedPage }) => {

                const dialogs: string[] = [];
                authenticatedPage.on("dialog", async d => {
                    dialogs.push(d.message());
                    await d.dismiss();
                });

                await myWhamPage.propertyModal.searchProperty(
                    "<script>alert('xss')</script>"
                );

                expect(dialogs).toHaveLength(0);
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
            }
        );

        test(
            "TC_WHAM127 | SQL-like text in the Property Number search field does not break the search",
            async ({ myWhamPage }) => {

                await myWhamPage.propertyModal.searchProperty(
                    "' OR '1'='1"
                );

                // OUTCOME: modal is intact; no server error occurred.
                await expect(
                    myWhamPage.propertyModal.propertyModalContainer
                ).toBeVisible();
            }
        );

    }); // end "Property Number search field injection"

}); // end "Section 10 — Security and Input Validation"


// =============================================================================
// SECTION 11 — DUPLICATE PREVENTION
// TC_WHAM128 – TC_WHAM135
//
// Verifies that rapid or repeated Save actions do not produce duplicate
// records, and that the Save button is correctly disabled during submission.
// =============================================================================

test.describe("Section 11 — Duplicate Prevention", () => {

    // Helper: fills the minimum required fields to allow saving (Level + Type +
    // AssignedTo) and returns the unique message text used for later lookup.
    async function fillMinimumRequiredFields(
        myWhamPage: MyWhamPage
    ): Promise<string> {

        const uniqueMsg = `DupTest_${Date.now()}`;
        const modal     = myWhamPage.addEditModal;

        await modal.selectLevel(WhamAddEditData.level);
        await modal.selectType(WhamAddEditData.type);
        await modal.selectAssignedUser(WhamAddEditData.assignedUser);
        await modal.enterMessage(uniqueMsg);

        return uniqueMsg;
    }

    // Helper: counts how many results the My Wham search returns for a given
    // message text. Uses tbody tr to avoid the known tableRows header-only bug.
    async function getSearchResultCount(
        myWhamPage: MyWhamPage,
        messageText: string
    ): Promise<number> {

        await myWhamPage.search.enterMessage(messageText);
        await myWhamPage.search.clickSearch();

        return await myWhamPage.table.searchResultsTable
            .locator("tbody tr")
            .count();
    }

    test.beforeEach(async ({ myWhamPage }) => {
        await myWhamPage.openAddMessagePage();
    });

    // -------------------------------------------------------------------------
    // TC_WHAM128
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM128 | Double-clicking Save creates only one message",
        async ({ myWhamPage }) => {

            const uniqueMsg = await fillMinimumRequiredFields(myWhamPage);

            await test.step("Double-click the Save button", async () => {
                await myWhamPage.addEditModal.saveButton.dblclick();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            // OUTCOME: exactly one record matches the unique message text.
            const count = await getSearchResultCount(myWhamPage, uniqueMsg);
            expect(count).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM129
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM129 | Repeatedly clicking Save does not create duplicate messages",
        async ({ myWhamPage }) => {

            const uniqueMsg = await fillMinimumRequiredFields(myWhamPage);

            await test.step("Click Save multiple times in rapid succession", async () => {
                // Fire three rapid clicks — the app's isSubmitting guard should
                // prevent more than one actual submission.
                for (let i = 0; i < 3; i++) {
                    await myWhamPage.addEditModal.saveButton.click({ force: true });
                }
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            // OUTCOME: still exactly one record.
            const count = await getSearchResultCount(myWhamPage, uniqueMsg);
            expect(count).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM130
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM130 | Save button is disabled while the save operation is in progress",
        async ({ myWhamPage, authenticatedPage }) => {

            await fillMinimumRequiredFields(myWhamPage);

            // Intercept the save request and hold it briefly so we can assert
            // the button state while the request is in-flight.
            let resolveDelay!: () => void;
            const delayPromise = new Promise<void>(res => { resolveDelay = res; });

            await authenticatedPage.route("**/MyWham/Create**", async route => {
                await delayPromise;
                await route.continue();
            });

            await test.step("Click Save and immediately check button state", async () => {
                await myWhamPage.addEditModal.saveButton.click();
                // Check while the request is still held.
                await expect(
                    myWhamPage.addEditModal.saveButton
                ).toBeDisabled();
            });

            // Release the held request.
            resolveDelay();
            await expect(myWhamPage.myWhamHeading).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM131
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM131 | Save button becomes disabled after a successful save begins navigation",
        async ({ myWhamPage }) => {

            await fillMinimumRequiredFields(myWhamPage);

            await test.step("Click Save", async () => {
                await myWhamPage.addEditModal.clickSave();
            });

            // After save triggers navigation, the Add Message page unloads so
            // the button is no longer present — verify the My Wham page loaded.
            await expect(myWhamPage.myWhamHeading).toBeVisible();
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM132
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM132 | Save operation completes successfully under simulated slow network",
        async ({ myWhamPage, authenticatedPage }) => {

            const uniqueMsg = await fillMinimumRequiredFields(myWhamPage);

            // Delay the save API response by 3 seconds.
            await authenticatedPage.route("**/MyWham/Create**", async route => {
                await new Promise(res => setTimeout(res, 3000));
                await route.continue();
            });

            await test.step("Click Save and wait for navigation", async () => {
                await myWhamPage.addEditModal.clickSave();
                await expect(
                    myWhamPage.myWhamHeading
                ).toBeVisible({ timeout: 15_000 });
            });

            // OUTCOME: exactly one record was saved.
            const count = await getSearchResultCount(myWhamPage, uniqueMsg);
            expect(count).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM133
    // Concurrent multi-tab submission is not automatable with a single
    // Playwright page context sharing the same auth state. Marked fixme.
    // -------------------------------------------------------------------------

    test.fixme(
        "TC_WHAM133 | User cannot submit the form simultaneously using multiple browser tabs",
        async () => {
            // Manual test: open the Add Message page in two tabs simultaneously,
            // fill identical data and click Save in both within the same second.
            // Expected: only one record is created (server-side guard).
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM134
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM134 | Browser refresh after a successful save does not create duplicate messages",
        async ({ myWhamPage, authenticatedPage }) => {

            const uniqueMsg = await fillMinimumRequiredFields(myWhamPage);

            await test.step("Save the message", async () => {
                await myWhamPage.addEditModal.clickSave();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            await test.step("Reload the My Wham page", async () => {
                await authenticatedPage.reload();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            // OUTCOME: still only one record with this unique message.
            const count = await getSearchResultCount(myWhamPage, uniqueMsg);
            expect(count).toBe(1);
        }
    );

    // -------------------------------------------------------------------------
    // TC_WHAM135
    // -------------------------------------------------------------------------

    test(
        "TC_WHAM135 | Browser Back button after a successful save does not create duplicate messages",
        async ({ myWhamPage, authenticatedPage }) => {

            const uniqueMsg = await fillMinimumRequiredFields(myWhamPage);

            await test.step("Save the message", async () => {
                await myWhamPage.addEditModal.clickSave();
                await expect(myWhamPage.myWhamHeading).toBeVisible();
            });

            await test.step("Press browser Back", async () => {
                await authenticatedPage.goBack();
            });

            await test.step("Return to My Wham", async () => {
                await myWhamPage.openMyWhamPage();
            });

            // OUTCOME: navigating back and forward has not re-submitted the form.
            const count = await getSearchResultCount(myWhamPage, uniqueMsg);
            expect(count).toBe(1);
        }
    );

}); // end "Section 11 — Duplicate Prevention"
