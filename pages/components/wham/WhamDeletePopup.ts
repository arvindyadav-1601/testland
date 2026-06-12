import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "../../BasePage";

export class WhamDeletePopup extends BasePage {

    // =====================================================
    // POPUP
    // =====================================================

    readonly popupContainer: Locator;

    readonly popupTitle: Locator;

    readonly confirmButton: Locator;

    readonly cancelButton: Locator;

    readonly closeIcon: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        this.popupContainer =
            page.locator(
                "div[class='jconfirm jconfirm-light jconfirm-open']"
            );

        this.popupTitle =
            page.locator(
                ".jconfirm-title"
            );

        this.confirmButton =
            page.locator(
                "div[class='jconfirm jconfirm-light jconfirm-open'] button:nth-child(1)"
            );

        this.cancelButton =
            page.locator(
                "button[class='btn btn-secondary']"
            );

        // jconfirm's "X" close control in the dialog header.
        this.closeIcon =
            page.locator(
                ".jconfirm-closeIcon"
            );
    }

    // =====================================================
    // POPUP ACTIONS
    // =====================================================

    async confirmDelete(): Promise<void> {

        await this.clickElement(
            this.confirmButton
        );
    }

    async clickCancel(): Promise<void> {

        await this.clickElement(
            this.cancelButton
        );
    }

    async clickCloseIcon(): Promise<void> {

        await this.clickElement(
            this.closeIcon
        );
    }
}