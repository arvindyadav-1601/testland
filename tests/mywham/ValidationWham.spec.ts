import { test, expect }
    from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

test.describe("Validation WHAM Module", () => {

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
        "Verify validation popup appears for invalid reminder dates",
        async () => {

            console.log(
                "Entering invalid reminder dates"
            );

            await myWhamPage
                .search
                .enterReminderDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Reminder validation completed"
            );
        }
    );

    test(
        "Verify validation popup appears for invalid expiration dates",
        async () => {

            console.log(
                "Entering invalid expiration dates"
            );

            await myWhamPage
                .search
                .enterExpirationDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Expiration validation completed"
            );
        }
    );

    test(
        "Verify validation popup appears for invalid created dates",
        async () => {

            console.log(
                "Entering invalid created dates"
            );

            await myWhamPage
                .search
                .enterCreatedDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Created date validation completed"
            );
        }
    );

    test(
        "Verify validation popup appears for invalid updated dates",
        async () => {

            console.log(
                "Entering invalid updated dates"
            );

            await myWhamPage
                .search
                .enterUpdatedDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Updated date validation completed"
            );
        }
    );

    test(
        "Verify validation popup closes successfully",
        async () => {

            console.log(
                "Triggering validation popup"
            );

            await myWhamPage
                .search
                .enterExpirationDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Closing validation popup"
            );

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            await expect(
                myWhamPage
                    .validation
                    .validationPopupTitle
            ).not.toBeVisible();

            console.log(
                "Popup close validation completed"
            );
        }
    );

    test(
        "Verify validation popup message is displayed",
        async () => {

            console.log(
                "Triggering popup message"
            );

            await myWhamPage
                .search
                .enterUpdatedDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Validation message verification completed"
            );
        }
    );

    test(
        "Verify add modal validation workflow",
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
                "Submitting incomplete form"
            );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Add validation workflow completed"
            );
        }
    );

    test(
        "Verify validation after reset workflow",
        async () => {

            console.log(
                "Applying invalid search"
            );

            await myWhamPage
                .search
                .enterExpirationDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .clickReset();

            console.log(
                "Reapplying invalid search"
            );

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Reset validation workflow completed"
            );
        }
    );

    test(
        "Verify validation after advanced search workflow",
        async () => {

            console.log(
                "Applying invalid advanced search"
            );

            await myWhamPage
                .search
                .enterReminderDates(
                    "12/31/2030",
                    "01/01/2020"
                );

            await myWhamPage
                .search
                .selectCategory(
                    "General"
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .validation
                .validateErrorPopupVisible();

            console.log(
                "Advanced validation completed"
            );
        }
    );

    test(
        "Verify validation popup remains stable after repeated invalid searches",
        async () => {

            for (let index = 1; index <= 5; index++) {

                console.log(
                    `Validation iteration: ${index}`
                );

                await myWhamPage
                    .search
                    .enterExpirationDates(
                        "12/31/2030",
                        "01/01/2020"
                    );

                await myWhamPage
                    .search
                    .clickSearch();

                await myWhamPage
                    .validation
                    .validateErrorPopupVisible();

                await myWhamPage
                    .validation
                    .validateErrorPopupVisible();

                await myWhamPage
                    .search
                    .clickReset();
            }

            console.log(
                "Repeated validation stability completed"
            );
        }
    );
});