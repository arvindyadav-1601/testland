import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { HomePage } from "./HomePage";

import { WhamSearchSection }
    from "./components/wham/WhamSearchSection";

import { WhamTableSection }
    from "./components/wham/WhamTableSection";

import { WhamAddEditModal }
    from "./components/wham/WhamAddEditModal";

import { WhamPropertyModal }
    from "./components/wham/WhamPropertyModal";

import { WhamValidationPopup }
    from "./components/wham/WhamValidationPopup";

import { WhamDeletePopup } 
    from "./components/wham/WhamDeletePopup";  

export class MyWhamPage extends BasePage {

    // =====================================================
    // PAGE LOCATORS
    // =====================================================

    private readonly home: HomePage;

    readonly myWhamHeading: Locator;

    // Opens the Add Message full-page form from the My Wham listing toolbar.
    // TODO: verify this locator against the actual My Wham listing page DOM —
    //       use the inspector to confirm the exact selector if the Add button
    //       does not have role="link" or name="Add".
    readonly addNewWhamButton: Locator;

    // =====================================================
    // COMPONENTS
    // =====================================================

    readonly search: WhamSearchSection;

    readonly table: WhamTableSection;

    readonly addEditModal: WhamAddEditModal;

    readonly propertyModal: WhamPropertyModal;

    readonly validation: WhamValidationPopup;

    readonly deletePopup: WhamDeletePopup;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page, home?: HomePage) {

        super(page);

        // =================================================
        // PAGE LOCATORS
        // =================================================

        this.home =
            home ?? new HomePage(page);

        this.myWhamHeading =
            page.getByRole(
                'heading',
                { name: 'My Wham', level: 1 }
            );

        // TODO: verify selector — expected to be the "Add" link in the My Wham
        //       module toolbar that navigates to the Add Message page.
        this.addNewWhamButton =
            page.getByTitle(
                'Add', { exact: true }
            );

        // =================================================
        // COMPONENTS
        // =================================================

        this.search =
            new WhamSearchSection(page);

        this.table =
            new WhamTableSection(page);

        this.addEditModal =
            new WhamAddEditModal(page);

        this.propertyModal =
            new WhamPropertyModal(page);

        this.validation =
            new WhamValidationPopup(page);

        this.deletePopup =
            new WhamDeletePopup(page);    
    }

    // =====================================================
    // NAVIGATION
    // =====================================================

    async openMyWhamPage(): Promise<void> {

        await this.home.openMyWham();

        // Wait (not assert) for the module to be ready before a test runs.
        // Outcome assertions belong in the spec, not the page object.
        await this.waitForElementVisible(
            this.myWhamHeading
        );
    }

    // Navigates from the My Wham listing to the Add Message full-page form.
    // Relies on addNewWhamButton — verify the locator TODO above if this fails.
    async openAddMessagePage(): Promise<void> {

        await this.clickElement(
            this.addNewWhamButton
        );

        // Wait for the Add Message page to be ready (title/heading confirms load).
        await this.waitForElementVisible(
            this.addEditModal.modalTitle
        );
    }
}