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
            page.getByRole(
                "heading",
                { name: "Add Message" }
            );

        // =================================================
        // BREADCRUMB
        // =================================================

        this.breadcrumb =
            page.locator(
                "i.flaticon2-shelter"
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
                "textarea"
            );

        this.expirationDateInput =
            page.getByPlaceholder(
                "Select date"
            );

        this.confidentialCheckbox =
            page.getByText(
                "Confidential"
            );

        // =================================================
        // REQUIRED INDICATORS
        // =================================================

        this.levelRequiredIndicator =
            page.locator(
                "li"
            ).filter(
                { hasText: "This value is required." }
            ).first();

        this.typeRequiredIndicator =
            page.locator(
                "li"
            ).filter(
                { hasText: "This value is required." }
            ).last();

        // =================================================
        // PROPERTIES SECTION
        // =================================================

        this.propertiesNoRecordsMessage =
            page.getByText(
                "No records found",
                { exact: true }
            );

        this.propertiesTablePropertyHeader =
            page.getByText(
                "Property #",
                { exact: true }
            );

        this.propertiesTaxYearHeader =
            page.getByText(
                "Tax Year",
                { exact: true }
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
                "tbody.kt-datatable__body tr"
            );

        this.firstPropertyRowCheckbox =
            page.locator(
                "#propertyDisplay_row_1352430"
            ).locator(
                "td"
            ).nth(1);

        // =================================================
        // ERROR MODAL
        // =================================================

        this.errorModalContainer =
            page.locator(
                "//div[@id='errormessage']//div[contains(@class,'modal-content')]"
            );

        this.errorModalMessage =
            page.getByText(
                "The Message must be assigned to a user and/or properties.",
                { exact: true }
            );

        this.errorModalCloseButton =
            page.locator(
                "button:has-text('Close')"
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

    async selectReminder(
        value: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.reminderDropdown,
            value
        );
    }

    async enableConfidential(): Promise<void> {

        await this.clickElement(
            this.confidentialCheckbox
        );
    }

    // Purpose:
    // Unchecks the confidential checkbox if currently checked.
    // Uses the same toggle click as enableConfidential(); named
    // separately for spec readability.
    //
    // Usage:
    // await myWhamPage.addEditModal.disableConfidential();

    async disableConfidential(): Promise<void> {

        await this.clickElement(
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

    async getPropertiesRowCount(): Promise<number> {

        return await this.propertiesTableRows.count();
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
