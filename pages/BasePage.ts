import {expect,Locator,Page} from "@playwright/test";

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
        url: string
    ): Promise<void> {

        await this.page.goto(url);

        await this.waitForPageLoad();
    }

    async waitForPageLoad(): Promise<void> {

        await this.page.waitForLoadState(
            "networkidle"
        );
    }

    async reloadPage(): Promise<void> {

        await this.page.reload();

        await this.waitForPageLoad();
    }

    // =====================================================
    // GENERIC WAIT METHODS
    // =====================================================

    async waitForElementVisible(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: "visible",
            timeout
        });
    }

    async waitForElementHidden(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: "hidden",
            timeout
        });
    }

    async waitForElementAttached(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: "attached",
            timeout
        });
    }

    async waitForElementDetached(
        locator: Locator,
        timeout: number = 10000
    ): Promise<void> {

        await locator.waitFor({
            state: "detached",
            timeout
        });
    }

    async wait(
        milliseconds: number
    ): Promise<void> {

        await this.page.waitForTimeout(
            milliseconds
        );
    }

    // =====================================================
    // CLICK METHODS
    // =====================================================

    async clickElement(
        locator: Locator
    ): Promise<void> {

        await this.waitForElementVisible(
            locator
        );

        await locator.click();
    }

    async clickByLocator(
        locator: Locator
    ): Promise<void> {

        await this.clickElement(
            locator
        );
    }

    async doubleClickElement(
        locator: Locator
    ): Promise<void> {

        await this.waitForElementVisible(
            locator
        );

        await locator.dblclick();
    }

    async forceClick(
        locator: Locator
    ): Promise<void> {

        await locator.click({
            force: true
        });
    }

    // =====================================================
    // INPUT METHODS
    // =====================================================

    async fillInput(
        locator: Locator,
        value: string
    ): Promise<void> {

        await this.waitForElementVisible(
            locator
        );

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

        await locator.pressSequentially(
            value
        );
    }

    async pressKey(
        locator: Locator,
        key: string
    ): Promise<void> {

        await locator.press(key);
    }

    // =====================================================
    // DROPDOWN METHODS
    // =====================================================

    async selectDropdown(
        locator: Locator,
        value: string
    ): Promise<void> {

        await this.waitForElementVisible(
            locator
        );

        await locator.selectOption(
            value
        );
    }

    async selectDropdownByLabel(
        locator: Locator,
        label: string
    ): Promise<void> {

        await locator.selectOption({
            label
        });
    }

    async selectDropdownByIndex(
        locator: Locator,
        index: number
    ): Promise<void> {

        await locator.selectOption({
            index
        });
    }

    // =====================================================
    // CHECKBOX / RADIO METHODS
    // =====================================================

    async checkCheckbox(
        locator: Locator
    ): Promise<void> {

        if (
            !(await locator.isChecked())
        ) {

            await locator.check();
        }
    }

    async uncheckCheckbox(
        locator: Locator
    ): Promise<void> {

        if (
            await locator.isChecked()
        ) {

            await locator.uncheck();
        }
    }

    async clickRadioButton(
        locator: Locator
    ): Promise<void> {

        await this.clickElement(
            locator
        );
    }

    // =====================================================
    // TABLE METHODS
    // =====================================================

    async getRowCount(
        locator: Locator
    ): Promise<number> {

        return await locator.count();
    }

    async clickFirstRow(
        locator: Locator
    ): Promise<void> {

        await locator.first().click();
    }

    async clickRowByIndex(
        locator: Locator,
        index: number
    ): Promise<void> {

        await locator.nth(index).click();
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

            window.scrollTo(
                0,
                document.body.scrollHeight
            );
        });
    }

    async scrollToTop(): Promise<void> {

        await this.page.evaluate(() => {

            window.scrollTo(0, 0);
        });
    }

    // =====================================================
    // VALIDATION METHODS
    // =====================================================

    async validateElementVisible(
        locator: Locator
    ): Promise<void> {

        await expect(locator)
            .toBeVisible();
    }

    async validateElementHidden(
        locator: Locator
    ): Promise<void> {

        await expect(locator)
            .toBeHidden();
    }

    async validateElementEnabled(
        locator: Locator
    ): Promise<void> {

        await expect(locator)
            .toBeEnabled();
    }

    async validateElementDisabled(
        locator: Locator
    ): Promise<void> {

        await expect(locator)
            .toBeDisabled();
    }

    async validateCheckboxChecked(
        locator: Locator
    ): Promise<void> {

        await expect(locator)
            .toBeChecked();
    }

    async validateText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {

        await expect(locator)
            .toContainText(expectedText);
    }

    async validateExactText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {

        await expect(locator)
            .toHaveText(expectedText);
    }

    async validateValue(
        locator: Locator,
        expectedValue: string
    ): Promise<void> {

        await expect(locator)
            .toHaveValue(expectedValue);
    }

    async validateUrl(
        expectedUrl: string | RegExp
    ): Promise<void> {

        await expect(this.page)
            .toHaveURL(expectedUrl);
    }

    async validateTitle(
        expectedTitle: string | RegExp
    ): Promise<void> {

        await expect(this.page)
            .toHaveTitle(expectedTitle);
    }

    // =====================================================
    // POPUP / MODAL METHODS
    // =====================================================

    async validatePopupVisible(
        locator: Locator
    ): Promise<void> {

        await this.validateElementVisible(
            locator
        );
    }

    async closePopupIfVisible(
        closeButton: Locator
    ): Promise<void> {

        if (
            await closeButton.isVisible()
        ) {

            await closeButton.click();
        }
    }

    // =====================================================
    // DOWNLOAD METHODS
    // =====================================================

    async waitForDownload(): Promise<any> {

        return await this.page.waitForEvent(
            "download"
        );
    }

    // =====================================================
    // GENERIC UTILITIES
    // =====================================================

    async getText(
        locator: Locator
    ): Promise<string> {

        return (
            await locator.textContent()
        ) ?? "";
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

    async takeScreenshot(
        fileName: string
    ): Promise<void> {

        await this.page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true
        });
    }

    // =====================================================
    // LOGGING METHODS
    // =====================================================

    async logStep(
        message: string
    ): Promise<void> {

        console.log(
            `STEP: ${message}`
        );
    }
}