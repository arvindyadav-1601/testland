import {
    Locator,
    Page,expect
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
                ".modal-backdrop"
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
                "Property Number Type"
            );

        // =================================================
        // SEARCH
        // =================================================

        this.searchInput =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByRole(
                "textbox"
            );

        this.searchButton =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByRole(
                "button",
                { name: "Search" }
            );

        // =================================================
        // RESULTS TABLE
        // =================================================

        this.propertySearchResults =
            page.locator(
                "#propertySearchTable"
            );

        this.firstPropertyRowData =
            page.locator(
                "tr[id^='propertySearchTable_row_']"
            ).nth(0);

        // =================================================
        // RESULTS TABLE — COLUMN HEADERS
        // =================================================

        this.resultsPropertyHeader =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByText(
                "Property #"
            );

        this.resultsTaxYearHeader =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByText(
                "Tax Year"
            );

        this.resultsCreationDateHeader =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByText(
                "Creation Date"
            );

        this.resultsCurrentHeader =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByText(
                "Current"
            );

        this.resultsDescriptionHeader =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByText(
                "Description"
            );

        // =================================================
        // RESULTS TABLE — CHECKBOXES
        // =================================================

        this.selectAllCheckbox =
            page.locator(
                "#propertySearchTable thead input[type='checkbox']"
            );

        this.firstPropertyCheckbox =
            page.locator(
                "tr[id^='propertySearchTable_row_'] input[type='checkbox']"
            ).nth(0);

        this.secondPropertyCheckbox =
            page.locator(
                "tr[id^='propertySearchTable_row_'] input[type='checkbox']"
            ).nth(1);

        // =================================================
        // NO RECORDS
        // =================================================

        this.noRecordsFoundMessage =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByText(
                "No records found"
            );

        // =================================================
        // BUTTONS
        // =================================================

        // Opens the property search dialog from the Add/Edit modal
        this.openPropertySearchButton =
            page.getByTitle(
                "Add"
            );

        this.saveButton =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByRole(
                "button",
                { name: "Save" }
            );

        this.cancelButton =
            page.getByRole(
                "dialog",
                { name: "Select Properties" }
            ).getByRole(
                "button",
                { name: "Cancel" }
            );
    }

    // =====================================================
    // MODAL METHODS
    // =====================================================

    async openPropertySearch(): Promise<void> {

        await this.clickElement(
            this.openPropertySearchButton
        );

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

        await this.searchInput.press('Enter');


        await this.clickElement(
            this.searchButton
        );

        await this.waitForSpinnerToDisappear();
    }

    async searchRealEstateProperty(
        searchValue: string
    ): Promise<void> {

        await this.selectPropertyType(
            "Real Estate"
        );

        await this.searchProperty(
            searchValue
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

    // Returns the number of result rows — scoped to tbody tr,
    // not the table element itself (which would always return 1)
    async getResultsRowCount(): Promise<number> {

        return await this.propertySearchResults
            .locator(
                "tbody tr"
            ).count();
    }

    async scrollPropertyResults(): Promise<void> {

        await this.page.locator(
            "#propertySearchTable tbody tr:last-child"
        ).scrollIntoViewIfNeeded();
    }
}
