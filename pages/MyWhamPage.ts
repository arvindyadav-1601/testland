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
            page.getByRole('heading', { name: 'My Wham', level: 1 });

;

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
}