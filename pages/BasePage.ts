import { expect, Locator, Page, Download } from "@playwright/test";

export class BasePage {

    protected readonly page: Page;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        this.page = page;
    }

    // =====================================================
    // NAVIGATION METHODS
    // =====================================================

    async navigateTo(
        url: string,
        waitState: 'domcontentloaded' | 'networkidle' | 'load' = 'domcontentloaded'
    ): Promise<void> {

        await this.page.goto(url);

        await this.waitForPageLoad(waitState);
    }

    async waitForPageLoad(
        state: 'domcontentloaded' | 'networkidle' | 'load' = 'domcontentloaded'
    ): Promise<void> {

        await this.page.waitForLoadState(state);
    }

    async reloadPage(): Promise<void> {

        await this.page.reload();

        await this.waitForPageLoad();
    }

    async waitForUrlToContain(
        urlPart: string,
        timeout: number = 10000
    ): Promise<void> {

        await this.page.waitForURL(
            url => url.href.includes(urlPart),
            { timeout }
        );
    }

    async waitForUrlToMatch(
        pattern: RegExp,
        timeout: number = 10000
    ): Promise<void> {

        await this.page.waitForURL(
            pattern,
            { timeout }
        );
    }

    // =====================================================
    // WAIT METHODS
    // =====================================================

    async waitForElementVisible(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: 'visible',
            timeout
        });
    }

    async waitForElementHidden(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: 'hidden',
            timeout
        });
    }

    async waitForElementAttached(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: 'attached',
            timeout
        });
    }

    async waitForElementDetached(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: 'detached',
            timeout
        });
    }

    async wait(
        milliseconds: number
    ): Promise<void> {

        await this.page.waitForTimeout(milliseconds);
    }

    /**
     * Waits for the site-wide BlockUI spinner to disappear.
     * Spinner DOM: <div class="blockui"><span class="kt-spinner kt-spinner--brand"></span></div>
     */
    async waitForSpinnerToDisappear(
        timeout: number = 30000
    ): Promise<void> {

        const spinner = this.page.locator('.blockui');

        if (await spinner.isVisible()) {

            await spinner.waitFor({
                state: 'hidden',
                timeout
            });
        }
    }

    // =====================================================
    // CLICK METHODS
    // =====================================================

    async clickElement(
        locator: Locator
    ): Promise<void> {

        await this.waitForElementVisible(locator);

        await locator.click();
    }

    async doubleClickElement(
        locator: Locator
    ): Promise<void> {

        await this.waitForElementVisible(locator);

        await locator.dblclick();
    }

    async forceClick(
        locator: Locator
    ): Promise<void> {

        await locator.click({ force: true });
    }

    // =====================================================
    // INPUT METHODS
    // =====================================================

    async fillInput(
        locator: Locator,
        value: string
    ): Promise<void> {

        await this.waitForElementVisible(locator);

        await locator.fill(value);
    }

    async clearAndFill(
        locator: Locator,
        value: string
    ): Promise<void> {

        await locator.clear();

        await locator.fill(value);
    }

    async appendText(
        locator: Locator,
        value: string
    ): Promise<void> {

        await locator.pressSequentially(value);
    }

    async pressKey(
        locator: Locator,
        key: string
    ): Promise<void> {

        await locator.press(key);
    }

    async pressEscape(): Promise<void> {

        await this.page.keyboard.press('Escape');
    }

    async pressEnter(
        locator?: Locator
    ): Promise<void> {

        if (locator) {

            await locator.press('Enter');

        } else {

            await this.page.keyboard.press('Enter');
        }
    }

    async pressTab(
        locator?: Locator
    ): Promise<void> {

        if (locator) {

            await locator.press('Tab');

        } else {

            await this.page.keyboard.press('Tab');
        }
    }

    async selectAllText(
        locator: Locator
    ): Promise<void> {

        await locator.press('Control+a');
    }

    // =====================================================
    // DATE PICKER METHODS
    // =====================================================

    /**
     * Primary date entry method — fills the input directly
     * in MM/DD/YYYY format and presses Tab to close the picker.
     * Use this in all tests unless the field is read-only.
     */
    async fillDate(
        inputLocator: Locator,
        date: string
    ): Promise<void> {

        await this.waitForElementVisible(inputLocator);

        await inputLocator.fill(date);

        await inputLocator.press('Tab');
    }

    /**
     * Fallback date method — navigates the Bootstrap datepicker
     * calendar when the input field is read-only.
     * Navigates month by month; max 24 iterations to prevent
     * infinite loops on bad input.
     */
    async selectDateFromPicker(
        inputLocator: Locator,
        date: Date
    ): Promise<void> {

        const targetMonth =
            date.toLocaleString('en-US', { month: 'long' });

        const targetYear  =
            date.getFullYear().toString();

        const targetDay   =
            date.getDate().toString();

        await this.clickElement(inputLocator);

        const picker =
            this.page.locator('.datepicker-dropdown');

        const switchButton =
            picker.locator('.datepicker-switch').first();

        // Navigate to the correct month / year
        for (let i = 0; i < 24; i++) {

            const currentLabel =
                await switchButton.textContent() ?? '';

            if (
                currentLabel.includes(targetMonth) &&
                currentLabel.includes(targetYear)
            ) break;

            const [currentMonthStr, currentYearStr] =
                currentLabel.trim().split(' ');

            const currentDate = new Date(
                `${currentMonthStr} 1, ${currentYearStr}`
            );

            const targetDate = new Date(
                `${targetMonth} 1, ${targetYear}`
            );

            if (targetDate > currentDate) {

                await picker.locator('.next').first().click();

            } else {

                await picker.locator('.prev').first().click();
            }
        }

        // Click the target day — exclude overflow days from
        // adjacent months (.old / .new) to avoid ambiguity
        await picker
            .locator('td.day:not(.old):not(.new)')
            .filter({ hasText: new RegExp(`^${targetDay}$`) })
            .click();
    }

    // =====================================================
    // DROPDOWN METHODS
    // =====================================================

    /**
     * Primary dropdown method — selects by visible label text.
     * Use this for all native <select> dropdowns; option values
     * are numeric IDs that may change if the app reseeds.
     */
    async selectDropdownByLabel(
        locator: Locator,
        label: string
    ): Promise<void> {

        await this.waitForElementVisible(locator);

        await locator.selectOption({ label });
    }

    /**
     * @deprecated Use selectDropdownByLabel instead.
     * Value-based selection is brittle — option values are
     * numeric IDs that may change if the app reseeds data.
     */
    async selectDropdown(
        locator: Locator,
        value: string
    ): Promise<void> {

        await this.waitForElementVisible(locator);

        await locator.selectOption(value);
    }

    /**
     * @deprecated Use selectDropdownByLabel instead.
     * Index-based selection breaks when option order changes.
     */
    async selectDropdownByIndex(
        locator: Locator,
        index: number
    ): Promise<void> {

        await locator.selectOption({ index });
    }

    async getSelectedOptionText(
        locator: Locator
    ): Promise<string> {

        return await locator.evaluate(
            (el: HTMLSelectElement) =>
                el.options[el.selectedIndex]?.text ?? ''
        );
    }

    // =====================================================
    // CHECKBOX METHODS
    // =====================================================

    /**
     * General-purpose checkbox toggle — use for non-table
     * checkboxes (e.g. form fields).
     */
    async checkCheckbox(
        locator: Locator
    ): Promise<void> {

        if (!(await locator.isChecked())) {

            await locator.check();
        }
    }

    async uncheckCheckbox(
        locator: Locator
    ): Promise<void> {

        if (await locator.isChecked()) {

            await locator.uncheck();
        }
    }

    /**
     * Clicks the header "select all rows" checkbox.
     * Locator: <input> inside <label aria-label="select or unselect all rows">
     */
    async selectAllRows(
        tableLocator: Locator
    ): Promise<void> {

        await tableLocator
            .getByLabel('select or unselect all rows')
            .click();
    }

    /**
     * Clicks the per-row checkbox in a kt-datatable row.
     * Pass the row locator from getRowById().
     */
    async selectRowCheckbox(
        rowLocator: Locator
    ): Promise<void> {

        await rowLocator
            .locator('[data-field="checkbox"] input[type="checkbox"]')
            .click();
    }

    async isRowCheckboxChecked(
        rowLocator: Locator
    ): Promise<boolean> {

        return await rowLocator
            .locator('[data-field="checkbox"] input[type="checkbox"]')
            .isChecked();
    }

    // =====================================================
    // TABLE METHODS (kt-datatable)
    // =====================================================

    /**
     * Returns a row locator by record ID.
     * Row element ID pattern: #${tableId}_row_${recordId}
     * e.g. getRowById('myWhamSearchTable', 2525)
     */
    getRowById(
        tableId: string,
        recordId: string | number
    ): Locator {

        return this.page.locator(
            `#${tableId}_row_${recordId}`
        );
    }

    /**
     * Reads the text content of a cell by its data-field name.
     * Text is nested inside a <span> within each <td>.
     * Works for badge cells (e.g. Confidential) via textContent().
     */
    async getCellText(
        rowLocator: Locator,
        fieldName: string
    ): Promise<string> {

        return (
            await rowLocator
                .locator(`[data-field="${fieldName}"] span`)
                .textContent()
        ) ?? '';
    }

    /**
     * Returns the number of data rows in a kt-datatable.
     * Scoped to .kt-datatable__row to exclude header rows.
     */
    async getRowCount(
        tableLocator: Locator
    ): Promise<number> {

        return await tableLocator
            .locator('.kt-datatable__row')
            .count();
    }

    /**
     * Waits until at least one data row is visible —
     * use after triggering a search to confirm results loaded.
     */
    async waitForTableRows(
        tableLocator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await tableLocator
            .locator('.kt-datatable__row')
            .first()
            .waitFor({ state: 'visible', timeout });
    }

    /**
     * Fills the search input and waits for the table to reload.
     * Waits for the spinner to clear before returning.
     */
    async searchInTable(
        inputLocator: Locator,
        searchText: string
    ): Promise<void> {

        await this.fillInput(inputLocator, searchText);

        await inputLocator.press('Enter');

        await this.waitForSpinnerToDisappear();
    }

    /**
     * Clicks a column header to trigger sort.
     * Uses data-field attribute on the <th> element.
     */
    async clickColumnHeader(
        tableLocator: Locator,
        columnName: string
    ): Promise<void> {

        await tableLocator
            .locator(`th[data-field="${columnName}"]`)
            .click();

        await this.waitForSpinnerToDisappear();
    }

    /**
     * Reads the current sort direction of a column.
     * Returns 'asc', 'desc', or 'none'.
     */
    async getColumnSortOrder(
        tableLocator: Locator,
        columnName: string
    ): Promise<'asc' | 'desc' | 'none'> {

        const classes = await tableLocator
            .locator(`th[data-field="${columnName}"]`)
            .getAttribute('class') ?? '';

        if (classes.includes('asc'))  return 'asc';
        if (classes.includes('desc')) return 'desc';

        return 'none';
    }

    // =====================================================
    // PAGINATION METHODS (kt-datatable)
    // =====================================================

    async goToNextPage(
        tableLocator: Locator
    ): Promise<void> {

        await tableLocator
            .locator('.kt-datatable__pager-link-next')
            .click();

        await this.waitForSpinnerToDisappear();
    }

    async goToPreviousPage(
        tableLocator: Locator
    ): Promise<void> {

        await tableLocator
            .locator('.kt-datatable__pager-link-prev')
            .click();

        await this.waitForSpinnerToDisappear();
    }

    async goToPage(
        tableLocator: Locator,
        pageNumber: number
    ): Promise<void> {

        await tableLocator
            .locator(
                `.kt-datatable__pager-link[data-page="${pageNumber}"]`
            )
            .click();

        await this.waitForSpinnerToDisappear();
    }

    async getCurrentPage(
        tableLocator: Locator
    ): Promise<number> {

        const text = await tableLocator
            .locator('.kt-datatable__pager-link--active')
            .first()
            .textContent();

        return parseInt(text ?? '1', 10);
    }

    async getTotalPages(
        tableLocator: Locator
    ): Promise<number> {

        const links = tableLocator.locator(
            '.kt-datatable__pager-link-number'
        );

        const count = await links.count();

        if (count === 0) return 1;

        const lastText = await links.last().textContent();

        return parseInt(lastText ?? '1', 10);
    }

    // =====================================================
    // SCROLL METHODS
    // =====================================================

    async scrollIntoView(
        locator: Locator
    ): Promise<void> {

        await locator.scrollIntoViewIfNeeded();
    }

    async scrollToBottom(): Promise<void> {

        await this.page.evaluate(() => {

            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async scrollToTop(): Promise<void> {

        await this.page.evaluate(() => {

            window.scrollTo(0, 0);
        });
    }

    // =====================================================
    // MODAL METHODS
    // =====================================================

    async waitForModalVisible(
        modalLocator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await modalLocator.waitFor({
            state: 'visible',
            timeout
        });
    }

    async waitForModalClosed(
        modalLocator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await modalLocator.waitFor({
            state: 'hidden',
            timeout
        });
    }

    async getModalTitle(
        modalLocator: Locator
    ): Promise<string> {

        return (
            await modalLocator
                .locator('.modal-title')
                .textContent()
        ) ?? '';
    }

    async closePopupIfVisible(
        closeButton: Locator
    ): Promise<void> {

        if (await closeButton.isVisible()) {

            await closeButton.click();
        }
    }

    async validatePopupVisible(
        locator: Locator
    ): Promise<void> {

        await this.waitForElementVisible(locator);

        await this.validateElementVisible(locator);
    }

    // =====================================================
    // TOAST / ALERT METHODS
    // =====================================================

    /**
     * Waits for a toast/alert to appear.
     * Pass an optional message string to wait for a specific toast.
     * NOTE: Update the locator selector to match the app's actual
     * toast element once you have the DOM.
     */
    async waitForToast(
        message?: string,
        timeout: number = 10000
    ): Promise<void> {

        const toast = message
            ? this.page
                .locator('.alert, .toast')
                .filter({ hasText: message })
            : this.page.locator('.alert, .toast');

        await toast.first().waitFor({
            state: 'visible',
            timeout
        });
    }

    async getToastMessage(): Promise<string> {

        return (
            await this.page
                .locator('.alert, .toast')
                .first()
                .textContent()
        ) ?? '';
    }

    async waitForToastToDisappear(
        timeout: number = 10000
    ): Promise<void> {

        const toast =
            this.page.locator('.alert, .toast').first();

        if (await toast.isVisible()) {

            await toast.waitFor({
                state: 'hidden',
                timeout
            });
        }
    }

    // =====================================================
    // FORM VALIDATION METHODS
    // =====================================================

    /**
     * Reads the validation error message associated with a field.
     * Tries aria-describedby and #fieldId-error first, then falls
     * back to a sibling .invalid-feedback element (Bootstrap pattern).
     */
    async getFieldError(
        fieldLocator: Locator
    ): Promise<string> {

        const fieldId =
            await fieldLocator.getAttribute('id');

        if (fieldId) {

            const ariaError = this.page.locator(
                `[aria-describedby="${fieldId}"], #${fieldId}-error`
            );

            if (await ariaError.isVisible()) {

                return (await ariaError.textContent()) ?? '';
            }
        }

        // Fallback: Bootstrap .invalid-feedback sibling element
        return (
            await fieldLocator
                .locator(
                    'xpath=following-sibling::*' +
                    '[contains(@class,"invalid-feedback") or ' +
                    'contains(@class,"parsley-errors-list")]'
                )
                .first()
                .textContent()
                .catch(() => '')
        ) ?? '';
    }

    /**
     * Waits for Bootstrap's is-invalid class to appear on a field
     * after a failed form submission attempt.
     */
    async waitForFieldError(
        fieldLocator: Locator,
        timeout: number = 5000
    ): Promise<void> {

        await expect(fieldLocator).toHaveClass(
            /is-invalid/,
            { timeout }
        );
    }

    async validateFieldError(
        fieldLocator: Locator,
        expectedMessage: string
    ): Promise<void> {

        const actual =
            await this.getFieldError(fieldLocator);

        expect(actual).toContain(expectedMessage);
    }

    // =====================================================
    // SAVED CRITERIA METHODS
    // =====================================================

    /**
     * Selects a saved criteria entry from the dropdown.
     * NOTE: Update the selector to match the actual <select> ID
     * for the Saved Criteria dropdown once confirmed.
     */
    async selectSavedCriteria(
        optionText: string
    ): Promise<void> {

        await this.selectDropdownByLabel(
            this.page
                .locator('select[name*="Criteria"], select[id*="Criteria"]')
                .first(),
            optionText
        );
    }

    /**
     * Clicks the Save button in the Saved Criteria bar,
     * fills the name in the modal, and confirms.
     */
    async saveCurrentCriteria(
        name: string
    ): Promise<void> {

        await this.page
            .getByRole('button', { name: 'Save' })
            .click();

        await this.fillInput(
            this.page.locator('#savedReportName'),
            name
        );

        await this.page.locator('#saveSubmit').click();
    }

    async resetCriteria(): Promise<void> {

        await this.page
            .getByRole('button', { name: 'Reset' })
            .click();
    }

    async deleteSavedCriteria(): Promise<void> {

        await this.page
            .getByRole('button', { name: 'Delete' })
            .click();
    }

    async clickPrint(): Promise<void> {

        await this.page
            .getByRole('button', { name: 'Print' })
            .click();
    }

    // =====================================================
    // REPORT QUEUE METHODS
    // =====================================================

    /**
     * Enters a description in the report submission modal
     * and clicks Save to add the report to the queue.
     * Call after clickPrint() — assumes the modal is already open.
     * NOTE: Update the description input locator to match the
     * actual field name/id once confirmed from DOM.
     */
    async submitReportToQueue(
        description: string
    ): Promise<void> {

        await this.fillInput(
            this.page
                .locator('input[name*="Description"], textarea[name*="Description"]')
                .first(),
            description
        );

        await this.page
            .getByRole('button', { name: 'Save' })
            .click();
    }

    /**
     * Clicks the Search button in the My Process table
     * and waits for the spinner to clear.
     */
    async searchMyProcess(): Promise<void> {

        await this.page
            .getByRole('button', { name: 'Search' })
            .click();

        await this.waitForSpinnerToDisappear();
    }

    /**
     * Reads the status badge text from a My Process row.
     * Badge DOM: <i class="badge badge-pill badge-success">Success</i>
     */
    async getReportStatus(
        rowLocator: Locator
    ): Promise<string> {

        return (
            await rowLocator
                .locator('i.badge')
                .textContent()
        )?.trim() ?? '';
    }

    /**
     * Polls until the report status is 'Success' or 'Error'.
     * Calls the provided refreshFn (e.g. searchMyProcess) between
     * each poll interval. Throws on Error status or timeout.
     *
     * @param refreshFn  - async action to refresh the table (e.g. () => this.searchMyProcess())
     * @param rowLocator - the My Process row to check status on
     * @param timeout    - max wait in ms (default 5 min — reports take minutes)
     */
    async waitForReportComplete(
        refreshFn: () => Promise<void>,
        rowLocator: Locator,
        timeout: number = 300000
    ): Promise<string> {

        const interval  = 15000;
        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {

            const status =
                await this.getReportStatus(rowLocator);

            if (status === 'Success') return status;

            if (status === 'Error') {

                throw new Error(
                    `Report failed with status: Error`
                );
            }

            await this.wait(interval);

            await refreshFn();
        }

        throw new Error(
            `Report did not complete within ${timeout / 1000}s`
        );
    }

    /**
     * Returns all file download href values from the
     * report results modal (PDF and/or TXT links).
     */
    async getResultFileLinks(
        modalLocator: Locator
    ): Promise<string[]> {

        const links = modalLocator.locator('a[href]');
        const count = await links.count();
        const hrefs: string[] = [];

        for (let i = 0; i < count; i++) {

            const href =
                await links.nth(i).getAttribute('href');

            if (href) hrefs.push(href);
        }

        return hrefs;
    }

    /**
     * Clicks a result file link and returns the Playwright
     * Download object for further assertions (path, filename).
     */
    async downloadResultFile(
        linkLocator: Locator
    ): Promise<Download> {

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            linkLocator.click(),
        ]);

        return download;
    }

    // =====================================================
    // NEW TAB METHODS
    // =====================================================

    /**
     * Wraps an action that opens a new browser tab/window.
     * Returns the new Page once it has loaded.
     *
     * Usage:
     *   const reportPage = await basePage.waitForNewTab(async () => {
     *       await basePage.clickElement(exportButton);
     *   });
     */
    async waitForNewTab(
        triggerFn: () => Promise<void>
    ): Promise<Page> {

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            triggerFn(),
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        return newPage;
    }

    // =====================================================
    // VALIDATION METHODS
    // =====================================================

    async validateElementVisible(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeVisible();
    }

    async validateElementHidden(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeHidden();
    }

    async validateElementEnabled(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeEnabled();
    }

    async validateElementDisabled(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeDisabled();
    }

    async validateText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {

        await expect(locator).toContainText(expectedText);
    }

    async validateExactText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {

        await expect(locator).toHaveText(expectedText);
    }

    async validateValue(
        locator: Locator,
        expectedValue: string
    ): Promise<void> {

        await expect(locator).toHaveValue(expectedValue);
    }

    async validateUrl(
        expectedUrl: string | RegExp
    ): Promise<void> {

        await expect(this.page).toHaveURL(expectedUrl);
    }

    async validateTitle(
        expectedTitle: string | RegExp
    ): Promise<void> {

        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async validateElementCount(
        locator: Locator,
        count: number
    ): Promise<void> {

        await expect(locator).toHaveCount(count);
    }

    // =====================================================
    // UTILITY METHODS
    // =====================================================

    async getText(
        locator: Locator
    ): Promise<string> {

        return (await locator.textContent()) ?? '';
    }

    async getInputValue(
        locator: Locator
    ): Promise<string> {

        return await locator.inputValue();
    }

    async isVisible(
        locator: Locator
    ): Promise<boolean> {

        return await locator.isVisible();
    }

    async isEnabled(
        locator: Locator
    ): Promise<boolean> {

        return await locator.isEnabled();
    }

    /**
     * Returns true if the element exists in the DOM,
     * regardless of visibility. Use when checking for
     * conditional elements that may not be rendered at all.
     */
    async isElementPresent(
        locator: Locator
    ): Promise<boolean> {

        return (await locator.count()) > 0;
    }

    async uploadFile(
        inputLocator: Locator,
        filePath: string
    ): Promise<void> {

        await inputLocator.setInputFiles(filePath);
    }

    async waitForDownload(): Promise<Download> {

        return await this.page.waitForEvent('download');
    }

    async takeScreenshot(
        fileName: string
    ): Promise<void> {

        await this.page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true
        });
    }
}
