import { test } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Reset WHAM Module", () => {

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
        "Verify reset clears message search field",
        async () => {

            console.log(
                "Entering message filter"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.validMessage
                );

            console.log(
                "Resetting search"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Message reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears category filter",
        async () => {

            console.log(
                "Selecting category"
            );

            await myWhamPage
                .search
                .selectCategory(
                    WhamSearchData.category
                );

            console.log(
                "Resetting category filter"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Category reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears type filter",
        async () => {

            console.log(
                "Selecting type"
            );

            await myWhamPage
                .search
                .selectType(
                    WhamSearchData.type
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Type reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears level filter",
        async () => {

            console.log(
                "Selecting level"
            );

            await myWhamPage
                .search
                .selectLevel(
                    WhamSearchData.level
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Level reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears status filter",
        async () => {

            console.log(
                "Selecting status"
            );

            await myWhamPage
                .search
                .selectStatus(
                    WhamSearchData.status
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Status reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears reminder dates",
        async () => {

            console.log(
                "Entering reminder dates"
            );

            await myWhamPage
                .search
                .enterReminderDates(
                    WhamSearchData.reminderStartDate,
                    WhamSearchData.reminderEndDate
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Reminder reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears expiration dates",
        async () => {

            console.log(
                "Entering expiration dates"
            );

            await myWhamPage
                .search
                .enterExpirationDates(
                    WhamSearchData.expirationStartDate,
                    WhamSearchData.expirationEndDate
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Expiration reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears created dates",
        async () => {

            console.log(
                "Entering created dates"
            );

            await myWhamPage
                .search
                .enterCreatedDates(
                    WhamSearchData.createdStartDate,
                    WhamSearchData.createdEndDate
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Created date reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears updated dates",
        async () => {

            console.log(
                "Entering updated dates"
            );

            await myWhamPage
                .search
                .enterUpdatedDates(
                    WhamSearchData.updatedStartDate,
                    WhamSearchData.updatedEndDate
                );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Updated date reset validation completed"
            );
        }
    );

    test(
        "Verify reset clears confidential workflow",
        async () => {

            console.log(
                "Applying confidential search"
            );

            await myWhamPage
                .search
                .enableConfidential();

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Resetting confidential workflow"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Confidential reset validation completed"
            );
        }
    );

    test(
        "Verify reset works after advanced search execution",
        async () => {

            console.log(
                "Applying advanced filters"
            );

            await myWhamPage
                .search
                .selectCategory(
                    WhamSearchData.category
                );

            await myWhamPage
                .search
                .selectType(
                    WhamSearchData.type
                );

            await myWhamPage
                .search
                .selectLevel(
                    WhamSearchData.level
                );

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Resetting advanced workflow"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Advanced reset validation completed"
            );
        }
    );

    test(
        "Verify reset works after sorting workflow",
        async () => {

            console.log(
                "Sorting table"
            );

            await myWhamPage
                .table
                .sortByCategoryColumn();

            console.log(
                "Applying search"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.validMessage
                );

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Resetting workflow"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Sorting reset validation completed"
            );
        }
    );

    test(
        "Verify repeated reset executions remain stable",
        async () => {

            for (let index = 1; index <= 5; index++) {

                console.log(
                    `Reset iteration: ${index}`
                );

                await myWhamPage
                    .search
                    .enterMessage(
                        WhamSearchData.validMessage
                    );

                await myWhamPage
                    .search
                    .selectCategory(
                        WhamSearchData.category
                    );

                await myWhamPage
                    .search
                    .clickReset();

                await myWhamPage
                    .search
                    .validateSearchFieldsReset();
            }

            console.log(
                "Repeated reset validation completed"
            );
        }
    );
});