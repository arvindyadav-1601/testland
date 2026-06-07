import { test } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Advanced Search WHAM Module", () => {

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
        "Verify advanced search using category type and level",
        async () => {

            console.log(
                "Applying category filter"
            );

            await myWhamPage
                .search
                .selectCategory(
                    WhamSearchData.category
                );

            console.log(
                "Applying type filter"
            );

            await myWhamPage
                .search
                .selectType(
                    WhamSearchData.type
                );

            console.log(
                "Applying level filter"
            );

            await myWhamPage
                .search
                .selectLevel(
                    WhamSearchData.level
                );

            console.log(
                "Executing advanced search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Advanced filter validation completed"
            );
        }
    );

    test(
        "Verify advanced search with status filter",
        async () => {

            console.log(
                "Applying status filter"
            );

            await myWhamPage
                .search
                .selectStatus(
                    WhamSearchData.status
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Status search validation completed"
            );
        }
    );

    test(
        "Verify advanced search with message and category",
        async () => {

            console.log(
                "Entering message"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.validMessage
                );

            console.log(
                "Selecting category"
            );

            await myWhamPage
                .search
                .selectCategory(
                    WhamSearchData.category
                );

            console.log(
                "Executing combined search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Message and category validation completed"
            );
        }
    );

    test(
        "Verify reminder date range advanced search",
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
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Reminder date validation completed"
            );
        }
    );

    test(
        "Verify expiration date range advanced search",
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
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Expiration date validation completed"
            );
        }
    );

    test(
        "Verify created date advanced search",
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
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Created date validation completed"
            );
        }
    );

    test(
        "Verify updated date advanced search",
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
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Updated date validation completed"
            );
        }
    );

    test(
        "Verify advanced search after sorting",
        async () => {

            console.log(
                "Sorting table"
            );

            await myWhamPage
                .table
                .sortByCategoryColumn();

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
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Sorted advanced search validation completed"
            );
        }
    );

    test(
        "Verify advanced search after reset workflow",
        async () => {

            console.log(
                "Applying filters"
            );

            await myWhamPage
                .search
                .selectCategory(
                    WhamSearchData.category
                );

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Resetting filters"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Reapplying advanced filters"
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

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Reset advanced validation completed"
            );
        }
    );

    test(
        "Verify advanced search stability after repeated execution",
        async () => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Advanced search iteration: ${index}`
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
                    .clickSearch();

                await myWhamPage
                    .table
                    .validateSearchResults();

                await myWhamPage
                    .search
                    .clickReset();
            }

            console.log(
                "Repeated advanced search validation completed"
            );
        }
    );
});