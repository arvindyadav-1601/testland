import { Locator, Page } from "@playwright/test";

import { BasePage } from "../../BasePage";

export class WhamSearchSection extends BasePage {

    // =====================================================
    // PAGE HEADER
    // =====================================================

    readonly myWhamHeading: Locator;

    // =====================================================
    // DATE FILTERS
    // =====================================================

    readonly reminderStartDateInput: Locator;

    readonly reminderEndDateInput: Locator;

    readonly expirationStartDateInput: Locator;

    readonly expirationEndDateInput: Locator;

    readonly createdStartDateInput: Locator;

    readonly createdEndDateInput: Locator;

    readonly updatedStartDateInput: Locator;

    readonly updatedEndDateInput: Locator;

    // =====================================================
    // DROPDOWNS
    // =====================================================

    readonly categoryDropdown: Locator;

    readonly typeDropdown: Locator;

    readonly levelDropdown: Locator;

    readonly statusDropdown: Locator;

    // =====================================================
    // SEARCH FIELDS
    // =====================================================

    readonly messageTextbox: Locator;

    readonly confidentialCheckbox: Locator;

    // =====================================================
    // BUTTONS
    // =====================================================

    readonly searchButton: Locator;

    readonly resetButton: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        // =================================================
        // PAGE HEADER
        // =================================================

        this.myWhamHeading =
            page.getByRole('heading', { name: 'My Wham', level: 1 });

        // =================================================
        // DATE FILTERS
        // =================================================

        this.reminderStartDateInput = page.getByRole('textbox', { name: 'Starting Reminder Date' });
        this.reminderEndDateInput = page.getByRole('textbox', { name: 'Ending Reminder Date' });

        this.expirationStartDateInput = page.getByRole('textbox', { name: 'Starting Expiration Date' });
        this.expirationEndDateInput = page.getByRole('textbox', { name: 'Ending Expiration Date' });


        this.createdStartDateInput = page.getByRole('textbox', { name: 'Starting Message Creation Date' })
        this.createdEndDateInput = page.locator(`//input[@name='CreatedEndDate']`);

        this.updatedStartDateInput = page.locator('[name="UpdatedStartDate"]');
        this.updatedEndDateInput = page.locator('[name="UpdatedEndDate"]');



        // =================================================
        // DROPDOWNS
        // =================================================

        this.categoryDropdown = page.getByRole('combobox', { name: 'Category' });

        this.typeDropdown = page.getByRole('combobox', { name: 'Types' });

        this.levelDropdown = page.getByRole('combobox', { name: 'Levels' });

        this.statusDropdown = page.getByRole('combobox', { name: 'Status' });

        // =================================================
        // SEARCH FIELDS
        // =================================================

        this.messageTextbox = page.locator("#Message");

        this.confidentialCheckbox = page.getByLabel('Include Confidential');

        // =================================================
        // BUTTONS
        // =================================================

        this.searchButton = page.getByRole('button', { name: 'Search' });

        this.resetButton = page.getByRole('button', { name: 'Reset' });

    }

    // =====================================================
    // DATE FILTER METHODS
    // =====================================================

    async enterReminderDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.fillInput(
            this.reminderStartDateInput,
            startDate);

        await this.fillInput(
            this.reminderEndDateInput,
            endDate);
    }

    async enterExpirationDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.fillInput(
            this.expirationStartDateInput,
            startDate
        );

        await this.fillInput(
            this.expirationEndDateInput,
            endDate
        );
    }

    async enterCreatedDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.fillInput(
            this.createdStartDateInput,
            startDate
        );

        await this.fillInput(
            this.createdEndDateInput,
            endDate
        );
    }

    async enterUpdatedDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.fillInput(
            this.updatedStartDateInput,
            startDate
        );

        await this.fillInput(
            this.updatedEndDateInput,
            endDate
        );
    }

    // =====================================================
    // DROPDOWN METHODS
    // =====================================================

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

    async selectStatus(
        value: string
    ): Promise<void> {

        await this.selectDropdown(
            this.statusDropdown,
            value
        );
    }

    // =====================================================
    // SEARCH FIELD METHODS
    // =====================================================

   ? async enterMessage(
        message: string
    ): Promise<void> {

        await this.fillInput(
            this.messageTextbox,
            message
        );
    }

    async enableConfidential(): Promise<void> {

        await this.checkCheckbox(
            this.confidentialCheckbox
        );
    }

    async disableConfidential(): Promise<void> {

        await this.uncheckCheckbox(
            this.confidentialCheckbox
        );
    }

    // =====================================================
    // BUTTON ACTIONS
    // =====================================================

    async clickSearch(): Promise<void> {

        await this.clickElement(
            this.searchButton
        );

        await this.waitForPageLoad();
    }

    async clickReset(): Promise<void> {

        await this.clickElement(
            this.resetButton
        );
    }

    // =====================================================
    // COMPLETE SEARCH WORKFLOWS
    // =====================================================

    async searchUsingReminderDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.enterReminderDates(
            startDate,
            endDate
        );

        await this.clickSearch();
    }

    async searchUsingExpirationDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.enterExpirationDates(
            startDate,
            endDate
        );

        await this.clickSearch();
    }

    async searchUsingCreatedDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.enterCreatedDates(
            startDate,
            endDate
        );

        await this.clickSearch();
    }

    async searchUsingUpdatedDates(
        startDate: string,
        endDate: string
    ): Promise<void> {

        await this.enterUpdatedDates(
            startDate,
            endDate
        );

        await this.clickSearch();
    }

    async resetSearchFilters(): Promise<void> {

        await this.clickReset();
    }
}