import { Locator, Page, expect } from "@playwright/test";

export class MyWhamPage {
  readonly page: Page;

  // =========================
  // Page Headings
  // =========================

  readonly myWhamHeading: Locator;
  readonly welcomeHeading: Locator;

  // =========================
  // Date Fields
  // =========================

  readonly reminderStartDate: Locator;
  readonly reminderEndDate: Locator;

  readonly expirationStartDate: Locator;
  readonly expirationEndDate: Locator;

  readonly createdOnStartDate: Locator;
  readonly createdOnEndDate: Locator;

  readonly updatedOnStartDate: Locator;
  readonly updatedOnEndDate: Locator;

  // =========================
  // Dropdowns
  // =========================

  readonly categoryDropdown: Locator;
  readonly typesDropdown: Locator;
  readonly levelsDropdown: Locator;
  readonly statusDropdown: Locator;

  // =========================
  // Buttons
  // =========================

  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly downloadButton: Locator;
  readonly deleteButton: Locator;

  // =========================
  // Table
  // =========================

  readonly tableRows: Locator;
  readonly noRecordsMessage: Locator;
  readonly firstRowCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    // =========================
    // Headings
    // =========================

    this.myWhamHeading = page.getByRole("heading", {
      name: "My Wham",
    });

    this.welcomeHeading = page.getByText("Welcome");

    // =========================
    // Date Fields
    // =========================

    this.reminderStartDate = page.getByRole("textbox", {
      name: "Starting Reminder Date",
    });

    this.reminderEndDate = page.getByRole("textbox", {
      name: "Ending Reminder Date",
    });

    this.expirationStartDate = page.getByRole("textbox", {
      name: "Starting Expiration Date",
    });

    this.expirationEndDate = page.getByRole("textbox", {
      name: "Ending Expiration Date",
    });

    this.createdOnStartDate = page.getByRole("textbox", {
      name: "Starting Created on Date",
    });

    this.createdOnEndDate = page.getByRole("textbox", {
      name: "Ending Created on Date",
    });

    this.updatedOnStartDate = page.getByRole("textbox", {
      name: "Starting Updated on Date",
    });

    this.updatedOnEndDate = page.getByRole("textbox", {
      name: "Ending Updated on Date",
    });

    // =========================
    // Dropdowns
    // =========================

    this.categoryDropdown = page.locator("#Category");
    this.typesDropdown = page.locator("#Types");
    this.levelsDropdown = page.locator("#Levels");
    this.statusDropdown = page.locator("#Status");

    // =========================
    // Buttons
    // =========================

    this.searchButton = page.getByRole("button", {
      name: "Search",
    });

    this.resetButton = page.getByRole("button", {
      name: "Reset",
    });

    this.downloadButton = page.locator('button[title="Download"]');

    this.deleteButton = page.locator('button[title="Delete"]');

    // =========================
    // Table
    // =========================

    this.tableRows = page.locator("#myWhamSearchTable tbody tr");

    this.noRecordsMessage = page.getByText("No records found");

    this.firstRowCheckbox = page
      .locator("#myWhamSearchTable tbody tr")
      .first()
      .locator('input[type="checkbox"]');
  }

  // ======================================
  // Navigate to My WHAM Page
  // ======================================

  async openMyWhamPage() {
    await this.page.getByText("My Wham").click();

    await expect(this.myWhamHeading).toBeVisible();
  }

  // ======================================
  // Search using Reminder Dates
  // ======================================

  async searchUsingReminderDates(
    startDate: string,
    endDate: string
  ) {
    await this.reminderStartDate.fill(startDate);

    await this.reminderEndDate.fill(endDate);

    await this.searchButton.click();
  }

  // ======================================
  // Select Dropdown Values
  // ======================================

  async selectCategory(category: string) {
    await this.categoryDropdown.selectOption({
      label: category,
    });
  }

  async selectType(type: string) {
    await this.typesDropdown.selectOption({
      label: type,
    });
  }

  async selectLevel(level: string) {
    await this.levelsDropdown.selectOption({
      label: level,
    });
  }

  async selectStatus(status: string) {
    await this.statusDropdown.selectOption({
      label: status,
    });
  }

  // ======================================
  // Validate Search Results
  // ======================================

  async validateSearchResults() {
    await this.page.waitForTimeout(2000);

    const count = await this.tableRows.count();

    expect(count).toBeGreaterThan(0);

    console.log(`Search Results Found: ${count}`);
  }

  // ======================================
  // Validate No Records Found
  // ======================================

  async validateNoRecordsFound() {
    await expect(this.noRecordsMessage).toBeVisible();

    console.log("No Records Found Message Displayed");
  }

  // ======================================
  // Select First Row Checkbox
  // ======================================

  async selectFirstRowCheckbox() {
    await this.firstRowCheckbox.check();
  }

  // ======================================
  // Validate Download/Delete Buttons
  // ======================================

  async validateActionButtonsEnabled() {
    await expect(this.downloadButton).toBeEnabled();

    await expect(this.deleteButton).toBeEnabled();
  }
}