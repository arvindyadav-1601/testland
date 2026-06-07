import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "../../BasePage";

export class WhamValidationPopup extends BasePage {

    // =====================================================
    // VALIDATION POPUP
    // =====================================================

    readonly validationPopupTitle: Locator;

    readonly validationPopupMessage: Locator;

    readonly validationPopupCloseButton: Locator;

    // =====================================================
    // DELETE CONFIRMATION POPUP
    // =====================================================

    readonly deletePopupContainer: Locator;

    readonly deletePopupTitle: Locator;

    readonly deleteConfirmButton: Locator;

    readonly deleteCancelButton: Locator;

    // =====================================================
    // REQUIRED FIELD VALIDATIONS
    // =====================================================

    readonly requiredMessageValidation: Locator;

    readonly requiredTypeValidation: Locator;

    // =====================================================
    // NO RECORDS FOUND
    // =====================================================

    readonly noRecordsFoundMessage: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // VALIDATION POPUP
        // =================================================

        this.validationPopupTitle =
            page.locator(
                "#errormessageTitle"
            );

        this.validationPopupMessage =
            page.locator(
                "p[id='errormessageContent'] pre"
            );

        this.validationPopupCloseButton =
            page.locator(
                "button[class='btn btn-primary']"
            );

        // =================================================
        // DELETE POPUP
        // =================================================

        this.deletePopupContainer =
            page.locator(
                "div[class='jconfirm jconfirm-light jconfirm-open']"
            );

        this.deletePopupTitle =
            page.locator(
                ".jconfirm-title"
            );

        this.deleteConfirmButton =
            page.locator(
                "div[class='jconfirm jconfirm-light jconfirm-open'] button:nth-child(1)"
            );

        this.deleteCancelButton =
            page.locator(
                "button[class='btn btn-secondary']"
            );

        // =================================================
        // REQUIRED FIELD VALIDATIONS
        // =================================================

        this.requiredMessageValidation =
            page.locator(
                "ul[id='parsley-id-9'] li[class='parsley-required']"
            );

        this.requiredTypeValidation =
            page.locator(
                "ul[id='parsley-id-7'] li[class='parsley-required']"
            );

        // =================================================
        // NO RECORDS
        // =================================================

        this.noRecordsFoundMessage =
            page.locator(
                "span[class='kt-datatable--error']"
            );
    }

    // =====================================================
    // VALIDATION POPUP METHODS
    // =====================================================

    async validateErrorPopupVisible(): Promise<void> {

        await this.validateElementVisible(
            this.validationPopupTitle
        );

        await this.validateElementVisible(
            this.validationPopupMessage
        );
    }

    async validateErrorMessage(
        expectedMessage: string
    ): Promise<void> {

        await this.validateText(
            this.validationPopupMessage,
            expectedMessage
        );
    }

    async closeValidationPopup(): Promise<void> {

        await this.clickElement(
            this.validationPopupCloseButton
        );
    }

    // =====================================================
    // REQUIRED FIELD VALIDATIONS
    // =====================================================

    async validateRequiredMessageValidation(): Promise<void> {

        await this.validateElementVisible(
            this.requiredMessageValidation
        );
    }

    async validateRequiredTypeValidation(): Promise<void> {

        await this.validateElementVisible(
            this.requiredTypeValidation
        );
    }

    async validateRequiredFieldValidations(): Promise<void> {

        await this.validateRequiredMessageValidation();

        await this.validateRequiredTypeValidation();
    }

    // =====================================================
    // DELETE POPUP METHODS
    // =====================================================

    async validateDeletePopupVisible(): Promise<void> {

        await this.validateElementVisible(
            this.deletePopupContainer
        );

        await this.validateElementVisible(
            this.deletePopupTitle
        );
    }

    async confirmDelete(): Promise<void> {

        await this.clickElement(
            this.deleteConfirmButton
        );
    }

    async cancelDelete(): Promise<void> {

        await this.clickElement(
            this.deleteCancelButton
        );
    }

    // =====================================================
    // NO RECORDS VALIDATION
    // =====================================================

    async validateNoRecordsFound(): Promise<void> {

        await this.validateElementVisible(
            this.noRecordsFoundMessage
        );
    }
}