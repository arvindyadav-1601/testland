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
                "link",
                { name: "Home" }
            );

        this.myWhamLink =
            this.mainNav.getByRole(
                "link",
                { name: "My Wham", exact: true }
            );
    }

    // =====================================================
    // NAVIGATION ACTIONS
    // =====================================================

    /**
     * Click any sidebar link by its visible/accessible name.
     * Prefer the dedicated helpers below for known modules.
     */
    async openMenuItem(
        name: string
    ): Promise<void> {

        await this.clickElement(
            this.mainNav.getByRole(
                "link",
                { name, exact: true }
            )
        );
    }

    async openMyWham(): Promise<void> {

        await this.clickElement(
            this.myWhamLink
        );
    }
}
