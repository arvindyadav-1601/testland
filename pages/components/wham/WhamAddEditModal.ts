import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "../../BasePage";

import { WhamAddEditDataShape }
    from "../../../testdata/mywham/whamAddEditData";

export class WhamAddEditModal extends BasePage {

    // =====================================================
    // BUTTONS
    // =====================================================

    readonly addButton: Locator;

    readonly saveButton: Locator;

    readonly cancelButton: Locator;

    // =====================================================
    // PAGE HEADING
    // =====================================================

    readonly modalTitle: Locator;

    // =====================================================
    // BREADCRUMB
    // =====================================================

    readonly breadcrumb: Locator;

    readonly breadcrumbMyWhamLink: Locator;

    // =====================================================
    // DROPDOWNS
    // =====================================================

    readonly assignedUserDropdown: Locator;

    readonly messageLevelDropdown: Locator;

    readonly messageTypeDropdown: Locator;

    readonly reminderDropdown: Locator;

    // =====================================================
    // INPUTS
    // =====================================================

    readonly messageTextbox: Locator;

    readonly expirationDateInput: Locator;

    // The calendar popup rendered by gijgo's bootstrap4 datepicker.
    // TODO: verify the exact class against the live DOM — gijgo typically uses
    //       ".gj-picker-bootstrap" for the bootstrap4 theme container.
    readonly expirationDatePickerContainer: Locator;

    readonly confidentialCheckbox: Locator;

    // =====================================================
    // REQUIRED INDICATORS
    // =====================================================

    readonly levelRequiredIndicator: Locator;

    readonly typeRequiredIndicator: Locator;

    // =====================================================
    // PROPERTIES SECTION
    // =====================================================

    readonly propertiesNoRecordsMessage: Locator;

    readonly propertiesTablePropertyHeader: Locator;

    readonly propertiesTaxYearHeader: Locator;

    readonly propertiesAddButton: Locator;

    readonly propertiesDeleteButton: Locator;

    readonly propertiesTableRows: Locator;

    readonly firstPropertyRowCheckbox: Locator;

    // Header checkbox that selects / deselects all rows in the Properties table.
    readonly propertiesSelectAllCheckbox: Locator;

    // =====================================================
    // MAINTENANCE / ALERT BANNER
    // =====================================================

    // Rendered by the AlertBanner controller — only present when an active
    // banner is configured in the app. Dismissed via Bootstrap's data-dismiss.
    readonly maintenanceBanner: Locator;

    readonly maintenanceBannerCloseButton: Locator;

    // =====================================================
    // ERROR MODAL
    // =====================================================

    readonly errorModalContainer: Locator;

    readonly errorModalMessage: Locator;

    readonly errorModalCloseButton: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // BUTTONS
        // =================================================

        this.addButton =
            page.getByTitle(
                "Add"
            );

        this.saveButton =
            page.getByRole(
                "button",
                { name: "Save" }
            );

        this.cancelButton =
            page.getByRole(
                "button",
                { name: "Cancel" }
            );

        // =================================================
        // PAGE HEADING
        // =================================================

        this.modalTitle =
            page.locator(
                "#searchLabel"
            );

        // =================================================
        // BREADCRUMB
        // =================================================

        this.breadcrumb =
            page.locator(
                "a.kt-subheader__breadcrumbs-home"
            );

        this.breadcrumbMyWhamLink =
            page.getByRole(
                "link",
                { name: "Add Message" }
            );

        // =================================================
        // DROPDOWNS
        // =================================================

        this.assignedUserDropdown =
            page.locator(
                "select[name='AssignedUserId']"
            );

        this.messageLevelDropdown =
            page.locator(
                "select[name='MessageLevelId']"
            );

        this.messageTypeDropdown =
            page.locator(
                "select[name='MessageTypeId']"
            );

        this.reminderDropdown =
            page.locator(
                "#reminderSelect"
            );

        // =================================================
        // INPUTS
        // =================================================

        this.messageTextbox =
            page.locator(
                "textarea[name='Message']"
            );

        this.expirationDateInput =
            page.locator(
                "#expirationInput"
            );

        // TODO: verify selector — gijgo bootstrap4 picker popup class
        this.expirationDatePickerContainer =
            page.locator(
                ".gj-picker-bootstrap"
            );

        // Points to the actual checkbox input — enables BasePage
        // checkCheckbox() / uncheckCheckbox() state-aware methods
        this.confidentialCheckbox =
            page.locator(
                "input[type='checkbox'][name='Confidential']"
            );

        // =================================================
        // REQUIRED INDICATORS
        // =================================================

        // Scoped to each field's parent container so they remain
        // independent — avoids positional first()/last() which
        // breaks when error count changes
        this.levelRequiredIndicator =
            page.locator(
                "select[name='MessageLevelId']"
            ).locator(
                "xpath=.."
            ).locator(
                "ul.parsley-errors-list li"
            );

        this.typeRequiredIndicator =
            page.locator(
                "select[name='MessageTypeId']"
            ).locator(
                "xpath=.."
            ).locator(
                "ul.parsley-errors-list li"
            );

        // =================================================
        // PROPERTIES SECTION
        // =================================================

        this.propertiesNoRecordsMessage =
            page.locator(
                "#propertyDisplay"
            ).getByText(
                "No records found",
                { exact: true }
            );

        this.propertiesTablePropertyHeader =
            page.locator(
                "#propertyDisplay thead th"
            ).filter(
                { hasText: "Property #" }
            );

        this.propertiesTaxYearHeader =
            page.locator(
                "#propertyDisplay thead th"
            ).filter(
                { hasText: "Tax Year" }
            );

        this.propertiesAddButton =
            page.getByTitle(
                "Add",
                { exact: true }
            );

        this.propertiesDeleteButton =
            page.locator(
                "#btnDeleteMany"
            );

        this.propertiesTableRows =
            page.locator(
                "#propertyDisplay tbody tr"
            );

        this.firstPropertyRowCheckbox =
            page.locator(
                "#propertyDisplay tbody tr input[type='checkbox']"
            ).nth(0);

        this.propertiesSelectAllCheckbox =
            page.locator(
                "#propertyDisplay thead input[type='checkbox']"
            );

        // =================================================
        // MAINTENANCE / ALERT BANNER
        // =================================================

        this.maintenanceBanner =
            page.locator(
                "#AlertBannerText"
            );

        this.maintenanceBannerCloseButton =
            page.locator(
                "#AlertBannerText [data-dismiss='alert']"
            );

        // =================================================
        // ERROR MODAL
        // =================================================

        this.errorModalContainer =
            page.locator(
                "#errormessage .modal-content"
            );

        this.errorModalMessage =
            page.locator(
                "#errormessageContent"
            );

        this.errorModalCloseButton =
            page.locator(
                "#errormessage"
            ).getByRole(
                "button",
                { name: "Close" }
            );
    }

    // =====================================================
    // BUTTON METHODS
    // =====================================================

    async clickAddButton(): Promise<void> {

        await this.clickElement(
            this.addButton
        );
    }

    async clickSave(): Promise<void> {

        await this.clickElement(
            this.saveButton
        );
    }

    async clickCancel(): Promise<void> {

        await this.clickElement(
            this.cancelButton
        );
    }

    // =====================================================
    // FORM METHODS
    // =====================================================

    async selectAssignedUser(
        value: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.assignedUserDropdown,
            value
        );
    }

    async selectLevel(
        value: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.messageLevelDropdown,
            value
        );
    }

    async selectType(
        value: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.messageTypeDropdown,
            value
        );
    }

    async enterMessage(
        message: string
    ): Promise<void> {

        await this.fillInput(
            this.messageTextbox,
            message
        );
    }

    async enterExpirationDate(
        value: string
    ): Promise<void> {

        await this.fillDate(
            this.expirationDateInput,
            value
        );
    }

    // Clears the expiration date field and presses Tab to commit the cleared
    // state (which should also reset/disable the Reminder dropdown).
    async clearExpirationDate(): Promise<void> {

        await this.clearAndFill(
            this.expirationDateInput,
            ""
        );

        await this.pressTab(
            this.expirationDateInput
        );
    }

    // Clicks the expiration date input to trigger the datepicker calendar.
    async openExpirationDatePicker(): Promise<void> {

        await this.clickElement(
            this.expirationDateInput
        );
    }

    async selectReminder(
        value: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.reminderDropdown,
            value
        );
    }

    // Uses BasePage.checkCheckbox() — only checks if currently unchecked
    async enableConfidential(): Promise<void> {

        await this.checkCheckbox(
            this.confidentialCheckbox
        );
    }

    // Uses BasePage.uncheckCheckbox() — only unchecks if currently checked
    async disableConfidential(): Promise<void> {

        await this.uncheckCheckbox(
            this.confidentialCheckbox
        );
    }

    // =====================================================
    // PROPERTIES SECTION METHODS
    // =====================================================

    async clickPropertiesAddButton(): Promise<void> {

        await this.clickElement(
            this.propertiesAddButton
        );
    }

    async clickPropertiesDeleteButton(): Promise<void> {

        await this.clickElement(
            this.propertiesDeleteButton
        );
    }

    async selectFirstPropertyRow(): Promise<void> {

        await this.clickElement(
            this.firstPropertyRowCheckbox
        );
    }

    // Clicks the header checkbox to select (or deselect) all property rows.
    async selectAllPropertyTableRows(): Promise<void> {

        await this.clickElement(
            this.propertiesSelectAllCheckbox
        );
    }

    async getPropertiesRowCount(): Promise<number> {

        return await this.propertiesTableRows.count();
    }

    // =====================================================
    // MAINTENANCE BANNER METHODS
    // =====================================================

    async clickMaintenanceBannerClose(): Promise<void> {

        await this.clickElement(
            this.maintenanceBannerCloseButton
        );
    }

    // =====================================================
    // ERROR MODAL METHODS
    // =====================================================

    async clickErrorModalClose(): Promise<void> {

        await this.clickElement(
            this.errorModalCloseButton
        );
    }

    // =====================================================
    // COMPLETE WORKFLOW
    // =====================================================

    async createWhamMessage(
        data: WhamAddEditDataShape
    ): Promise<void> {

        await this.selectAssignedUser(
            data.assignedUser
        );

        await this.selectLevel(
            data.level
        );

        await this.selectType(
            data.type
        );

        await this.enterMessage(
            data.message
        );

        await this.enterExpirationDate(
            data.expirationDate
        );

        await this.selectReminder(
            data.reminder
        );

        if (data.confidential) {

            await this.enableConfidential();
        }

        await this.clickSave();
    }

    async updateMessage(
        updatedMessage: string
    ): Promise<void> {

        await this.clearAndFill(
            this.messageTextbox,
            updatedMessage
        );
    }
}
