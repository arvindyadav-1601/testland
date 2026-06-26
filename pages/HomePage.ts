import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "./BasePage";

/**
 * HomePage
 *
 * Owns the application shell / left sidebar ("Main Navigation").
 * Every module is reached from here, so module page objects delegate
 * their navigation to this class instead of re-deriving menu locators.
 *
 * Locators use the accessible navigation landmark and link names so they
 * survive DOM/markup changes (no positional XPath such as //li[5]).
 */
export class HomePage extends BasePage {

    // =====================================================
    // NAVIGATION LOCATORS
    // =====================================================

    readonly sidebarNavigation: Locator;

    readonly homeLink: Locator;

    readonly myWhamLink: Locator;

    readonly myProcessesLink: Locator;

    readonly cashReceiptingLink: Locator;

    readonly billMaintenanceLink: Locator;

    readonly processesLink: Locator;

    readonly reportsLink: Locator;

    readonly settingsLink: Locator;

    readonly catalisHelpLink: Locator;

    readonly aboutCatalisLink: Locator;

    readonly myProfileLink: Locator;

    readonly logoutLink: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        this.sidebarNavigation =
            page.getByLabel(
                'Main Navigation' 
            );

        this.homeLink =
            this.sidebarNavigation.getByText(
                'Home'
            );

        this.myWhamLink =
            this.sidebarNavigation.getByText(
                ('My Wham')
            );

        this.myProcessesLink =
            this.sidebarNavigation.getByText(
                'My Processes'
            );

        this.cashReceiptingLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "Cash Receipting", exact: true }
            );

        this.billMaintenanceLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "Bill Maintenance", exact: true }
            );

        this.processesLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "All Processes", exact: true }
            );

        this.reportsLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "All Reports", exact: true }
            );

        this.settingsLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "All Settings", exact: true }
            );

        this.catalisHelpLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "Catalis Help", exact: true }
            );

        this.aboutCatalisLink =
            this.sidebarNavigation.getByRole(
                "link",
                { name: "About Catalis", exact: true }
            );

        this.myProfileLink =
            this.page.getByRole(
            "link",
            { name: 'My Profile' }
        ); 
            
        this.logoutLink =
            this.page.getByRole(
                "link",
                { name: "Logout" }
            );    
    }

    // =====================================================
    // NAVIGATION ACTIONS
    // =====================================================

    /**
     * Click any sidebar link by its visible/accessible name.
     * Prefer the dedicated helpers below for known modules.
     */

    async openHome(): Promise<void> {

        await this.clickElement(
            this.homeLink
        );
    }

    async openMyWham(): Promise<void> {

        await this.clickElement(
            this.myWhamLink
        );
    }

    async openMyProcesses(): Promise<void> {

        await this.clickElement(
            this.myProcessesLink
        );
    }

    async openCashReceipting(): Promise<void> {

        await this.clickElement(
            this.cashReceiptingLink
        );
    }

    async openBillMaintenance(): Promise<void> {

        await this.clickElement(
            this.billMaintenanceLink
        );
    }

    async openProcesses(): Promise<void> {

        await this.clickElement(
            this.processesLink
        );
    }

    async openReports(): Promise<void> {

        await this.clickElement(
            this.reportsLink
        );
    }

    async openSettings(): Promise<void> {

        await this.clickElement(
            this.settingsLink
        );
    }

    async openCatalisHelp(): Promise<void> {

        await this.clickElement(
            this.catalisHelpLink
        );
    }

    async openAboutCatalis(): Promise<void> {

        await this.clickElement(
            this.aboutCatalisLink
        );
    }

    async openMyProfile(): Promise<void> {

        await this.clickElement(
            this.myProfileLink
        );
    }

    async logout(): Promise<void> {

        await this.clickElement(
            this.logoutLink
        );
    }
}