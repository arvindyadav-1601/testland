import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "../../BasePage";

export class WhamTableSection extends BasePage {

    // =====================================================
    // TABLE CONTAINER
    // =====================================================

    readonly searchResultsTable: Locator;

    readonly tableScrollContainer: Locator;

    readonly tableRows: Locator;

    // =====================================================
    // CHECKBOXES
    // =====================================================

    readonly selectAllCheckbox: Locator;

    readonly firstRowCheckbox: Locator;

    readonly secondRowCheckbox: Locator;

    // =====================================================
    // TABLE HEADERS
    // =====================================================

    readonly toColumnHeader: Locator;

    readonly categoryColumnHeader: Locator;

    readonly levelColumnHeader: Locator;

    readonly typeColumnHeader: Locator;

    readonly propertiesColumnHeader: Locator;

    readonly creationDateColumnHeader: Locator;

    readonly expirationDateColumnHeader: Locator;

    readonly confidentialColumnHeader: Locator;

    // =====================================================
    // BUTTONS
    // =====================================================

    readonly downloadButton: Locator;

    readonly deleteButton: Locator;

    // =====================================================
    // CONFIDENTIAL BADGE
    // =====================================================

    readonly confidentialBadge: Locator;

    // =====================================================
    // NO RECORDS
    // =====================================================

    readonly noRecordsFoundMessage: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // TABLE
        // =================================================

        this.searchResultsTable =
            page.locator("#searchResults");

        this.tableScrollContainer =
            page.locator('div.kt-datatable.kt-datatable--default.kt-datatable--scroll.kt-datatable--loaded');

        this.tableRows =
            page.locator(
                "#searchResults tbody tr"
            );

        // =================================================
        // CHECKBOXES
        // =================================================

        this.selectAllCheckbox =
            page.locator(
                "label[aria-label='select or unselect all rows'] span"
            );

        // Scoped to #searchResults so these can never resolve against another
        // table on the page (e.g. the property-search modal). The inner span
        // path is preserved because the UI uses a custom checkbox widget whose
        // real <input> is hidden — the clickable target is the span.
        this.firstRowCheckbox =
            page.locator(
                "#searchResults tbody tr:nth-child(1) td:nth-child(2) span label span:nth-child(2)"
            );

        this.secondRowCheckbox =
            page.locator(
                "#searchResults tbody tr:nth-child(2) td:nth-child(2) span label span:nth-child(2)"
            );

        // =================================================
        // HEADERS
        // =================================================

        this.toColumnHeader =
            page.locator(
                "th[data-field='To'] span"
            );

        this.categoryColumnHeader =
            page.locator(
                "th[data-field='Category']"
            );

        this.levelColumnHeader =
            page.locator(
                "th[data-field='Level']"
            );

        this.typeColumnHeader =
            page.locator(
                "th[data-field='Type']"
            );

        this.propertiesColumnHeader =
            page.locator(
                "th[data-field='Properties']"
            );

        this.creationDateColumnHeader =
            page.locator(
                "th[data-field='Creation Date']"
            );

        this.expirationDateColumnHeader =
            page.locator(
                "th[data-field='Expiration Date']"
            );

        this.confidentialColumnHeader =
            page.locator(
                "th[data-field='Confidential']"
            );

        // =================================================
        // BUTTONS
        // =================================================

        this.downloadButton =
            page.getByTitle("Download");

        this.deleteButton =
            page.locator("#btnDeleteMany");

        // =================================================
        // BADGES
        // =================================================

        this.confidentialBadge =
            page.locator(
                "i[class='badge badge-pill badge-danger']"
            );

        // =================================================
        // NO RECORDS
        // =================================================

        this.noRecordsFoundMessage =
            page.locator(
                ".kt-datatable--error"
            );
    }

    // =====================================================
    // ROW SELECTION
    // =====================================================

    async selectFirstRow(): Promise<void> {

        await this.clickElement(
            this.firstRowCheckbox
        );
    }

    async selectSecondRow(): Promise<void> {

        await this.clickElement(
            this.secondRowCheckbox
        );
    }

    async selectAllRows(): Promise<void> {

        await this.clickElement(
            this.selectAllCheckbox
        );
    }

    // =====================================================
    // BUTTON ACTIONS
    // =====================================================

    async clickDownload(): Promise<void> {

        await this.clickElement(
            this.downloadButton
        );
    }

    async clickDelete(): Promise<void> {

        await this.clickElement(
            this.deleteButton
        );
    }

    // =====================================================
    // SORTING METHODS
    // =====================================================

    async sortByToColumn(): Promise<void> {

        await this.clickElement(
            this.toColumnHeader
        );
    }

    async sortByCategoryColumn(): Promise<void> {

        await this.clickElement(
            this.categoryColumnHeader
        );
    }

    async sortByLevelColumn(): Promise<void> {

        await this.clickElement(
            this.levelColumnHeader
        );
    }

    async sortByTypeColumn(): Promise<void> {

        await this.clickElement(
            this.typeColumnHeader
        );
    }

    async sortByPropertiesColumn(): Promise<void> {

        await this.clickElement(
            this.propertiesColumnHeader
        );
    }

    async sortByCreationDateColumn(): Promise<void> {

        await this.clickElement(
            this.creationDateColumnHeader
        );
    }

    async sortByExpirationDateColumn(): Promise<void> {

        await this.clickElement(
            this.expirationDateColumnHeader
        );
    }

    async sortByConfidentialColumn(): Promise<void> {

        await this.clickElement(
            this.confidentialColumnHeader
        );
    }

    // =====================================================
    // EDIT METHODS
    // =====================================================

    async openFirstRowForEdit(): Promise<void> {

        await this.tableRows
            .first()
            .click();
    }

    // Opens the first result row whose Type cell matches `type` (e.g.
    // "AGREEMENT"). Scoped to #searchResults so it can never match a row in
    // another table on the page. Exact match avoids "BANKRUPTCY" also hitting
    // "BANKRUPTCY NOTE".
    async openRowByType(
        type: string
    ): Promise<void> {

        const row =
            this.tableRows.filter({
                has: this.page.getByRole(
                    "cell",
                    { name: type, exact: true }
                )
            });

        await row
            .first()
            .click();
    }

    // =====================================================
    // TABLE UTILITIES
    // =====================================================

    async getSearchResultCount(): Promise<number> {

        return await this.tableRows.count();
    }

    async scrollTableToBottom(): Promise<void> {

        await this.scrollIntoView(
            this.tableRows.last()
        );
    }
}