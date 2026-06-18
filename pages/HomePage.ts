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

    readonly mainNav: Locator;

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

    readonly myprofileLink: Locator;

    readonly logoutLink: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        super(page);

        this.mainNav =
            page.getByRole(
                "navigation",
                { name: "Main Navigation" }
            );

        this.homeLink =
            this.mainNav.getByRole(
                'navigation', 
                { name: 'Main Navigation' })
                .getByText
                ('Home');

        this.myWhamLink =
            this.mainNav.getByRole(
                'navigation', 
                { name: 'Main Navigation' })
                .getByText
                ('My Wham');

        this.myProcessesLink =
            this.mainNav.getByRole
            ('navigation',
                 { name: 'Main Navigation' }
                ).getByText
                ('My Processes');

        this.cashReceiptingLink =
            this.mainNav.getByRole(
                "link",
                { name: "Cash Receipting", exact: true }
            );

        this.billMaintenanceLink =
            this.mainNav.getByRole(
                "link",
                { name: "Bill Maintenance", exact: true }
            );

        this.processesLink =
            this.mainNav.getByRole(
                "link",
                { name: "Processes", exact: true }
            );

        this.reportsLink =
            this.mainNav.getByRole(
                "link",
                { name: "Reports", exact: true }
            );

        this.settingsLink =
            this.mainNav.getByRole(
                "link",
                { name: "Settings", exact: true }
            );

        this.catalisHelpLink =
            this.mainNav.getByRole(
                "link",
                { name: "Catalis Help", exact: true }
            );

        this.aboutCatalisLink =
            this.mainNav.getByRole(
                "link",
                { name: "About Catalis", exact: true }
            );

        this.myprofileLink =
            this.mainNav.getByTitle(
                "Profile"
            );  
            
        this.logoutLink =
            this.mainNav.getByRole(
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
            this.myprofileLink
        );
    }

    async logout(): Promise<void> {

        await this.clickElement(
            this.logoutLink
        );
    }
}