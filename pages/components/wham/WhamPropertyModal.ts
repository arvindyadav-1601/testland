import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "../../BasePage";

export class WhamPropertyModal extends BasePage {

    // =====================================================
    // PROPERTY TYPE
    // =====================================================

    readonly realEstateRadioButton: Locator;

    readonly personalPropertyRadioButton: Locator;

    // =====================================================
    // SEARCH
    // =====================================================

    readonly searchInput: Locator;

    readonly searchButton: Locator;

    readonly saveButton: Locator;

    readonly cancelButton: Locator;

    readonly propertySearchResults: Locator;

    // =====================================================
    // TABLE
    // =====================================================

    readonly propertySearchTable: Locator;

    readonly selectAllCheckbox: Locator;

    readonly firstPropertyCheckbox: Locator;

    readonly noRecordsFoundMessage: Locator;

    // =====================================================
    // MODAL
    // =====================================================

    readonly modalContainer: Locator;
    readonly openPropertySearchButton: Locator;

    readonly closePropertyModalButton: Locator;

    readonly propertyModalContainer: Locator;

    // =====================================================

    // SECOND PROPERTY CHECKBOX

    // =====================================================

    readonly secondPropertyCheckbox: Locator;

    // =====================================================

    // RESET BUTTON

    // =====================================================

    readonly resetButton: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // PROPERTY TYPES
        // =================================================

        this.realEstateRadioButton =
            page.locator(
                ".kt-radio.kt-radio--brand.mr-3"
            );

        this.personalPropertyRadioButton =
            page.locator(
                "label[class='kt-radio kt-radio--brand']"
            );

        // =================================================
        // SEARCH
        // =================================================

        this.searchInput =
            page.locator(
                "#searchString"
            );

        this.searchButton =
            page.locator(
                "#btnPropertySearch"
            );

        this.saveButton =
            page.locator(
                "#btnSaveProperties"
            );

        this.cancelButton =
            page.locator(
                "body > div:nth-child(10) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)"
            );

        this.propertySearchResults =
            page.locator(
                "#searchResults tbody tr"
            );

        // =================================================
        // TABLE
        // =================================================

        this.propertySearchTable =
            page.locator(
                "table[id='propertySearchTable']"
            );

        this.selectAllCheckbox =
            page.locator(
                "table[id='propertySearchTable'] thead span span"
            );

        this.firstPropertyCheckbox =
            page.locator(
                "tr[id='propertySearchTable_row_1352428'] span span"
            );

        this.noRecordsFoundMessage =
            page.locator(
                "span[class='kt-datatable--error']"
            );

        // =================================================
        // MODAL
        // =================================================

        this.modalContainer =
            page.locator(
                "div[role='document'] div[class='modal-body']"
            );

        this.openPropertySearchButton =
            page.getByRole(
                "button",
                { name: /property search/i }
            );

        this.closePropertyModalButton =
            page.locator(
                "button.close"
            );

        this.propertyModalContainer =
            page.locator(
                "div[role='document'] div[class='modal-body']"
            );

        // =====================================================
        // SECOND PROPERTY CHECKBOX
        // =====================================================

        this.secondPropertyCheckbox =
            page.locator(
                "tbody tr:nth-child(2) input[type='checkbox']"
            );

        // =====================================================
        // RESET BUTTON
        // =====================================================

        this.resetButton =
            page.getByRole(
                "button",
                { name: /reset/i }
            );
    }

    // =====================================================
    // PROPERTY TYPE METHODS
    // =====================================================

    async selectRealEstate(): Promise<void> {

        await this.clickRadioButton(
            this.realEstateRadioButton
        );
    }

    async selectPersonalProperty(): Promise<void> {

        await this.clickRadioButton(
            this.personalPropertyRadioButton
        );
    }

    // =====================================================
    // SEARCH METHODS
    // =====================================================

    async searchProperty(
        searchValue: string
    ): Promise<void> {

        await this.fillInput(
            this.searchInput,
            searchValue
        );

        await this.clickElement(
            this.searchButton
        );
    }

    async searchRealEstateProperty(
        value: string
    ): Promise<void> {

        await this.selectRealEstate();

        await this.searchProperty(
            value
        );
    }

    async searchPersonalProperty(
        value: string
    ): Promise<void> {

        await this.selectPersonalProperty();

        await this.searchProperty(
            value
        );
    }

    async validatePropertyResults(): Promise<void> {

        await this.validateElementVisible(
            this.propertySearchResults.first()
        );
    }

    // =====================================================
    // PROPERTY SELECTION
    // =====================================================

    async selectAllProperties(): Promise<void> {

        await this.clickElement(
            this.selectAllCheckbox
        );
    }

    async selectFirstProperty(): Promise<void> {

        await this.clickElement(
            this.firstPropertyCheckbox
        );
    }

    async saveSelectedProperties(): Promise<void> {

        await this.clickElement(
            this.saveButton
        );
    }

    async cancelPropertySelection(): Promise<void> {

        await this.clickElement(
            this.cancelButton
        );

    }

    async openPropertySearch(): Promise<void> {

        await this.clickElement(
            this.openPropertySearchButton
        );

        await this.validateElementVisible(
            this.propertyModalContainer
        );
    }

    async closePropertyModal(): Promise<void> {

        await this.clickElement(
            this.closePropertyModalButton
        );
    }

    // =====================================================
    // VALIDATIONS
    // =====================================================

    async validateNoRecordsFound(): Promise<void> {

        await this.validateElementVisible(
            this.noRecordsFoundMessage
        );
    }

    async validatePropertyTableVisible(): Promise<void> {

        await this.validateElementVisible(
            this.propertySearchTable
        );
    }
    async validatePropertyModalContainer(): Promise<void> {
        await this.validateElementVisible(this.propertyModalContainer);
    }

    // =====================================================

    // SELECT SECOND PROPERTY

    // =====================================================

    async selectSecondProperty(): Promise<void> {

        await this.clickElement(

            this.secondPropertyCheckbox

        );

    }

    // =====================================================

    // RESET PROPERTY SEARCH

    // =====================================================

    async resetPropertySearch(): Promise<void> {

        await this.clickElement(

            this.resetButton

        );

    }

    // =====================================================

    // SCROLL PROPERTY RESULTS

    // =====================================================

    async scrollPropertyResults(): Promise<void> {

        await this.page.locator(

            "tbody tr:last-child"

        ).scrollIntoViewIfNeeded();

    }
}


