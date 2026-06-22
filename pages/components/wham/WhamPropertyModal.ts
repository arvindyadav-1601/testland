import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "../../BasePage";

export class WhamPropertyModal extends BasePage {

    // =====================================================
    // MODAL CONTAINER
    // =====================================================

    readonly modalContainer: Locator;

    readonly propertyModalContainer: Locator;

    readonly modalOverlay: Locator;

    // =====================================================
    // MODAL HEADER
    // =====================================================

    readonly modalTitle: Locator;

    readonly closePropertyModalButton: Locator;

    // =====================================================
    // PROPERTY TYPE
    // =====================================================

    readonly propertyTypeDropdown: Locator;

    // =====================================================
    // SEARCH
    // =====================================================

    readonly searchInput: Locator;

    readonly searchButton: Locator;

    // =====================================================
    // RESULTS TABLE
    // =====================================================

    readonly propertySearchResults: Locator;

    readonly firstPropertyRowData: Locator;

    // =====================================================
    // RESULTS TABLE — COLUMN HEADERS
    // =====================================================

    readonly resultsPropertyHeader: Locator;

    readonly resultsTaxYearHeader: Locator;

    readonly resultsCreationDateHeader: Locator;

    readonly resultsCurrentHeader: Locator;

    readonly resultsDescriptionHeader: Locator;

    // =====================================================
    // RESULTS TABLE — CHECKBOXES
    // =====================================================

    readonly selectAllCheckbox: Locator;

    readonly firstPropertyCheckbox: Locator;

    readonly secondPropertyCheckbox: Locator;

    // =====================================================
    // NO RECORDS
    // =====================================================

    readonly noRecordsFoundMessage: Locator;

    // =====================================================
    // BUTTONS
    // =====================================================

    readonly openPropertySearchButton: Locator;

    readonly saveButton: Locator;

    readonly cancelButton: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // MODAL CONTAINER
        // =================================================

        this.modalContainer =
            page.locator(
                "#modalAddEdit .modal-body"
            );

        this.propertyModalContainer =
            page.locator(
                "#modalAddEdit .modal-body"
            );

        this.modalOverlay =
            page.locator(
                ".modal-backdrop.show, .modal-backdrop"
            );

        // =================================================
        // MODAL HEADER
        // =================================================

        this.modalTitle =
            page.locator(
                "#modalAddEdit .modal-title"
            );

        this.closePropertyModalButton =
            page.locator(
                "#modalAddEdit button.close"
            );

        // =================================================
        // PROPERTY TYPE
        // =================================================

        this.propertyTypeDropdown =
            page.getByLabel(
                'Property Number Type'
            );

        // =================================================
        // SEARCH
        // =================================================

        this.searchInput =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
            ).getByRole('textbox'            
        );

        this.searchButton =
        page.getByRole(
            'button', { name: 'Search' }
        );


        // =================================================
        // RESULTS TABLE
        // =================================================

        this.propertySearchResults =
            page.locator(
                "table[id$='propertySearchTable']"
        );

        this.firstPropertyRowData =
        page.locator(
            "tr[id^='propertySearchTable_row_']"
            ).nth(0               
            );

        // =================================================
        // RESULTS TABLE — COLUMN HEADERS
        // =================================================

        this.resultsPropertyHeader =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByText(
                'Property #'
            );

        this.resultsTaxYearHeader =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByText(
            'Tax Year'
        );

        this.resultsCreationDateHeader =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByText(
            'Creation Date'
        );

        this.resultsCurrentHeader =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByText(
            'Current'
        );

        this.resultsDescriptionHeader =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByText(
            'Description'
        );

        // =================================================
        // RESULTS TABLE — CHECKBOXES
        // =================================================

        this.selectAllCheckbox =
        page.locator(
            "table[id='propertySearchTable'] thead[class='kt-datatable__head'] span span"
        );

        // Scoped to #propertySearchTable so these never resolve
        // against another table on the page.
        this.firstPropertyCheckbox =
        page.locator(
            "tr[id='propertySearchTable_row_1352430'] span span"
        );

        this.secondPropertyCheckbox =
        page.locator(
            "//tr[@id='propertySearchTable_row_1305929']//span//span"
            );

        // =================================================
        // NO RECORDS
        // =================================================

        this.noRecordsFoundMessage =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByText(
            'No records found');

        // =================================================
        // BUTTONS
        // =================================================

        this.openPropertySearchButton =
        page.getByRole(
            'button', { name: 'Search' }
        );

        this.saveButton =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByRole(
            'button', { name: 'Save' }
        );

        this.cancelButton =
        page.getByRole(
            'dialog', { name: 'Select Properties' }
        ).getByRole(
            'button', { name: 'Cancel' }
        );
    }

    // =====================================================
    // MODAL METHODS
    // =====================================================

    async openPropertySearch(): Promise<void> {

        await this.clickElement(
            this.openPropertySearchButton
        );

        // Wait (not assert) for the modal to be ready; the spec asserts.
        await this.waitForElementVisible(
            this.propertyModalContainer
        );
    }

    async closePropertyModal(): Promise<void> {

        await this.clickElement(
            this.closePropertyModalButton
        );
    }

    // =====================================================
    // PROPERTY TYPE METHODS
    // =====================================================

    async selectPropertyType(
        label: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.propertyTypeDropdown,
            label
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


    // =====================================================
    // SELECTION METHODS
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

    async selectSecondProperty(): Promise<void> {

        await this.clickElement(
            this.secondPropertyCheckbox
        );
    }

    // =====================================================
    // SAVE / CANCEL METHODS
    // =====================================================

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

    // =====================================================
    // TABLE UTILITIES
    // =====================================================

    async getResultsRowCount(): Promise<number> {

        return await this.propertySearchResults.count();
    }

    async scrollPropertyResults(): Promise<void> {

        await this.page.locator(
            "#propertySearchTable tbody tr:last-child"
        ).scrollIntoViewIfNeeded();
    }
}
