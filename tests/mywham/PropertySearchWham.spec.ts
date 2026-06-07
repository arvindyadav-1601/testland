import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamPropertyData }
    from "../../testdata/mywham/whamPropertyData";

test.describe("Property Search WHAM Module", () => {

    let myWhamPage: MyWhamPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        console.log(
            "================================================="
        );

        console.log(
            "Opening My WHAM Page"
        );

        console.log(
            "================================================="
        );

        myWhamPage =
            new MyWhamPage(authenticatedPage);

        await myWhamPage
            .openMyWhamPage();

        await myWhamPage
            .search
            .validateMyWhamPageLoaded();
    });

    test(
        "Verify property modal opens successfully",
        async () => {

            console.log(
                "Opening property search modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            await myWhamPage
                .propertyModal
                .validatePropertyModalContainer();

            console.log(
                "Property modal validation completed"
            );
        }
    );

    test(
        "Verify property modal closes successfully",
        async () => {

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            await myWhamPage
                .propertyModal
                .validatePropertyModalContainer();

            console.log(
                "Closing property modal"
            );

            await myWhamPage
                .propertyModal
                .closePropertyModal();

            await expect(
                myWhamPage
                    .propertyModal
                    .propertyModalContainer
            ).not.toBeVisible();

            console.log(
                "Property modal close validation completed"
            );
        }
    );

    test(
        "Verify Real Estate property search functionality",
        async () => {

            console.log(
                "Opening property search modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching Real Estate property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Real Estate search validation completed"
            );
        }
    );

    test(
        "Verify Personal Property search functionality",
        async () => {

            console.log(
                "Opening property search modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching Personal Property"
            );

            await myWhamPage
                .propertyModal
                .searchPersonalProperty(
                    WhamPropertyData.validPersonalProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Personal Property search validation completed"
            );
        }
    );

    test(
        "Verify single property selection workflow",
        async () => {

            console.log(
                "Opening property search modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Selecting first property"
            );

            await myWhamPage
                .propertyModal
                .selectFirstProperty();

            console.log(
                "Saving property selection"
            );

            await myWhamPage
                .propertyModal
                .saveSelectedProperties();

            console.log(
                "Single property selection completed"
            );
        }
    );

    test(
        "Verify multiple property selection workflow",
        async () => {

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Selecting multiple properties"
            );

            await myWhamPage
                .propertyModal
                .selectFirstProperty();

            await myWhamPage
                .propertyModal
                .selectSecondProperty();

            console.log(
                "Saving selected properties"
            );

            await myWhamPage
                .propertyModal
                .saveSelectedProperties();

            console.log(
                "Multi property selection completed"
            );
        }
    );

    test(
        "Verify invalid property search behavior",
        async () => {

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching invalid property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.invalidRealEstateProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Invalid property validation completed"
            );
        }
    );

    test(
        "Verify property search reset functionality",
        async () => {

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );

            console.log(
                "Resetting property search"
            );

            await myWhamPage
                .propertyModal
                .resetPropertySearch();

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Property reset validation completed"
            );
        }
    );

    test(
        "Verify property search remains stable after multiple searches",
        async () => {

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Property search iteration: ${index}`
                );

                await myWhamPage
                    .propertyModal
                    .searchRealEstateProperty(
                        WhamPropertyData.validRealEstateProperty
                    );

                await myWhamPage
                    .propertyModal
                    .validatePropertyResults();

                await myWhamPage
                    .propertyModal
                    .openPropertySearch();
            }

            console.log(
                "Repeated property search validation completed"
            );
        }
    );

    test(
        "Verify property modal supports reopening workflow",
        async () => {

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Closing property modal"
            );

            await myWhamPage
                .propertyModal
                .closePropertyModal();

            console.log(
                "Reopening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Reopen validation completed"
            );
        }
    );

    test(
        "Verify property search after advanced WHAM filtering",
        async () => {

            console.log(
                "Applying WHAM filters"
            );

            await myWhamPage
                .search
                .enterMessage(
                    "Tax"
                );

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Filtered property search validation completed"
            );
        }
    );

    test(
        "Verify property modal handles large result set scrolling",
        async () => {

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            console.log(
                "Searching property"
            );

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    WhamPropertyData.validRealEstateProperty
                );

            await myWhamPage
                .propertyModal
                .validatePropertyResults();

            console.log(
                "Scrolling property results"
            );

            await myWhamPage
                .propertyModal
                .scrollPropertyResults();

            console.log(
                "Property scrolling validation completed"
            );
        }
    );
});