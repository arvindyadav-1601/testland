import {
    Locator,
    Page
} from "@playwright/test";

import { BasePage } from "./BasePage";

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

    readonly myWhamMenu: Locator;

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

    constructor(page: Page) {

        super(page);

        // =================================================
        // PAGE LOCATORS
        // =================================================

        this.myWhamMenu =
        page.locator(`//li[5]/a/span[1]`);

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

        await this.logStep(
            "Opening My WHAM page"
        );

        await this.clickElement(
            this.myWhamMenu
        );

        await this.validateElementVisible(
            this.myWhamHeading
        );

        await this.logStep(
            "My WHAM page opened successfully"
        );

    }
}