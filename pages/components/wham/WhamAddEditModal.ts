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

    readonly updateButton: Locator;

    readonly cancelButton: Locator;

    // =====================================================
    // MODAL
    // =====================================================

    readonly modalTitle: Locator;

    // =====================================================
    // DROPDOWNS
    // =====================================================

    readonly assignedUserDropdown: Locator;

    readonly messageLevelDropdown: Locator;

    readonly messageTypeDropdown: Locator;

    readonly categoryDropdown: Locator;

    readonly typeDropdown: Locator;

    readonly levelDropdown: Locator;

    // =====================================================
    // INPUTS
    // =====================================================

    readonly messageTextbox: Locator;

    readonly expirationDateInput: Locator;

    readonly reminderDropdown: Locator;

    readonly confidentialCheckbox: Locator;

    // =====================================================
    // VALIDATIONS
    // =====================================================

    readonly addEditModalContainer: Locator;

    readonly reminderInput: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // BUTTONS
        // =================================================

        this.addButton =
            page.locator(
                "button[title='Add']"
            );

        this.saveButton =
            page.locator(
                ".btn.btn-primary.on-new"
            );

        this.updateButton =
            page.locator(
                "#btnSaveWHAM"
            );

        this.cancelButton =
            page.locator(
                "button[class='btn btn-secondary']"
            );

        // =================================================
        // MODAL
        // =================================================

        this.modalTitle =
            page.locator(
                ".modal-title"
            );

        this.addEditModalContainer =
            page.locator(
                ".modal-content"
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

        this.categoryDropdown =
            page.locator(
                "div[class='col-3'] select[name='MessageLevelId']"
            );


        this.typeDropdown =

            page.locator(

                "select[name='MessageTypeId']"

            );

        this.levelDropdown =

            page.locator(

                "select[name='MessageLevelId']"

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

        this.reminderDropdown =
            page.locator(
                "#reminderSelect"
            );

        this.confidentialCheckbox =
            page.locator(
                ".kt-checkbox.kt-checkbox--brand"
            );

            this.reminderInput =

            page.locator(

                "#reminderInput"

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

    async clickUpdate(): Promise<void> {

        await this.clickElement(
            this.updateButton
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

        await this.selectDropdown(
            this.assignedUserDropdown,
            value
        );
    }

    async selectMessageLevel(
        value: string
    ): Promise<void> {

        await this.selectDropdown(
            this.messageLevelDropdown,
            value
        );
    }

    async selectMessageType(
        value: string
    ): Promise<void> {

        await this.selectDropdown(
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

        await this.fillInput(
            this.expirationDateInput,
            value
        );
    }

    async selectReminder(
        value: string
    ): Promise<void> {

        await this.selectDropdown(
            this.reminderDropdown,
            value
        );
    }

    async enableConfidential(): Promise<void> {

        await this.clickElement(
            this.confidentialCheckbox
        );
    }

    async selectCategory(
        value: string
    ): Promise<void> {
    
        await this.selectDropdown(
            this.categoryDropdown,
            value
        );
    }
    
    async selectType(
        value: string
    ): Promise<void> {
    
        await this.selectDropdown(
            this.typeDropdown,
            value
        );
    }
    
    async selectLevel(
        value: string
    ): Promise<void> {
    
        await this.selectDropdown(
            this.levelDropdown,
            value
        );
    }

    // =====================================================
    // COMPLETE WORKFLOW
    // =====================================================

    async createWhamMessage(
        data: WhamAddEditDataShape
    ): Promise<void> {

        await this.clickAddButton();

        await this.selectAssignedUser(
            data.assignedUser
        );

        await this.selectMessageLevel(
            data.level
        );

        await this.selectMessageType(
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

        if (
            data.confidential
        ) {

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

    

    // =====================================================
    // ENTER REMINDER
    // =====================================================

async enterReminder(

    reminder: string

): Promise<void> {

    await this.fillInput(

        this.reminderInput,

        reminder

    );
}

}