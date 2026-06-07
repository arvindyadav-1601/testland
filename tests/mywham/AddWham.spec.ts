import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamAddEditData }
    from "../../testdata/mywham/whamAddEditData";

test.describe("Add WHAM Module", () => {

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
        "Verify Add WHAM modal opens successfully",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            await myWhamPage
                .addEditModal
                .validateAddEditModalVisible();

            console.log(
                "Add modal validation completed"
            );
        }
    );

    test(
        "Verify Add WHAM modal closes successfully",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Closing Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickCancel();

            await expect(
                myWhamPage
                    .addEditModal
                    .addEditModalContainer
            ).not.toBeVisible();

            console.log(
                "Add modal close validation completed"
            );
        }
    );

    test(
        "Verify user can enter WHAM message",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Entering WHAM message"
            );

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.message
                );

            console.log(
                "WHAM message validation completed"
            );
        }
    );

    test(
        "Verify user can select category",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Selecting category"
            );

            await myWhamPage
                .addEditModal
                .selectCategory(
                    WhamAddEditData.category
                );

            console.log(
                "Category validation completed"
            );
        }
    );

    test(
        "Verify user can select type",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Selecting type"
            );

            await myWhamPage
                .addEditModal
                .selectType(
                    WhamAddEditData.type
                );

            console.log(
                "Type validation completed"
            );
        }
    );

    test(
        "Verify user can select level",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Selecting level"
            );

            await myWhamPage
                .addEditModal
                .selectLevel(
                    WhamAddEditData.level
                );

            console.log(
                "Level validation completed"
            );
        }
    );

    test(
        "Verify user can enter expiration date",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Entering expiration date"
            );

            await myWhamPage
                .addEditModal
                .enterExpirationDate(
                    WhamAddEditData.expirationDate
                );

            console.log(
                "Expiration date validation completed"
            );
        }
    );

    test(
        "Verify user can enter reminder date",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Entering reminder date"
            );

            await myWhamPage
                .addEditModal
                .enterReminder(
                    WhamAddEditData.reminder
                );

            console.log(
                "Reminder validation completed"
            );
        }
    );

    test(
        "Verify confidential checkbox functionality",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Enabling confidential checkbox"
            );

            await myWhamPage
                .addEditModal
                .enableConfidential();

            console.log(
                "Confidential validation completed"
            );
        }
    );

    test(
        "Verify Add WHAM workflow with all fields",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Filling Add WHAM form"
            );

            await myWhamPage
                .addEditModal
                .selectCategory(
                    WhamAddEditData.category
                );

            await myWhamPage
                .addEditModal
                .selectType(
                    WhamAddEditData.type
                );

            await myWhamPage
                .addEditModal
                .selectLevel(
                    WhamAddEditData.level
                );

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.message
                );

            await myWhamPage
                .addEditModal
                .enterExpirationDate(
                    WhamAddEditData.expirationDate
                );

            await myWhamPage
                .addEditModal
                .enterReminder(
                    WhamAddEditData.reminder
                );

            console.log(
                "Saving WHAM"
            );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Complete Add WHAM workflow validation completed"
            );
        }
    );

    test(
        "Verify Add WHAM workflow with confidential flag",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Filling confidential WHAM form"
            );

            await myWhamPage
                .addEditModal
                .selectCategory(
                    WhamAddEditData.category
                );

            await myWhamPage
                .addEditModal
                .selectType(
                    WhamAddEditData.type
                );

            await myWhamPage
                .addEditModal
                .selectLevel(
                    WhamAddEditData.level
                );

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.confidentialMessage
                );

            await myWhamPage
                .addEditModal
                .enableConfidential();

            console.log(
                "Saving confidential WHAM"
            );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Confidential Add WHAM validation completed"
            );
        }
    );

    test(
        "Verify Add WHAM workflow after property selection",
        async () => {

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            console.log(
                "Opening property modal"
            );

            await myWhamPage
                .propertyModal
                .openPropertySearch();

            await myWhamPage
                .propertyModal
                .searchRealEstateProperty(
                    "123456789"
                );

            await myWhamPage
                .propertyModal
                .selectFirstProperty();

            await myWhamPage
                .propertyModal
                .saveSelectedProperties();

            console.log(
                "Completing WHAM form"
            );

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.message
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Property linked WHAM validation completed"
            );
        }
    );

    test(
        "Verify Add WHAM modal stability after repeated open and close",
        async () => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Modal iteration: ${index}`
                );

                await myWhamPage
                    .addEditModal
                    .clickAddButton();

                await myWhamPage
                    .addEditModal
                    .validateAddEditModalVisible();

                await myWhamPage
                    .addEditModal
                    .clickCancel();
            }

            console.log(
                "Repeated modal validation completed"
            );
        }
    );

    test(
        "Verify Add WHAM workflow after reset search",
        async () => {

            console.log(
                "Applying search filter"
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
                "Resetting search"
            );

            await myWhamPage
                .search
                .clickReset();

            console.log(
                "Opening Add WHAM modal"
            );

            await myWhamPage
                .addEditModal
                .clickAddButton();

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.message
                );

            console.log(
                "Saving WHAM"
            );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Add WHAM after reset validation completed"
            );
        }
    );
});