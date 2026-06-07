import { test } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Search WHAM Module", () => {

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
        "Verify basic message search functionality",
        async () => {

            console.log(
                "Entering message search criteria"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.validMessage
                );

            console.log(
                "Executing search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Basic message search validation completed"
            );
        }
    );

    test(
        "Verify category search functionality",
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
                "Executing category search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Category search validation completed"
            );
        }
    );

    test(
        "Verify type search functionality",
        async () => {

            console.log(
                "Selecting type"
            );

            await myWhamPage
                .search
                .selectType(
                    WhamSearchData.type
                );

            console.log(
                "Executing type search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Type search validation completed"
            );
        }
    );

    test(
        "Verify level search functionality",
        async () => {

            console.log(
                "Selecting level"
            );

            await myWhamPage
                .search
                .selectLevel(
                    WhamSearchData.level
                );

            console.log(
                "Executing level search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Level search validation completed"
            );
        }
    );

    test(
        "Verify status search functionality",
        async () => {

            console.log(
                "Selecting status"
            );

            await myWhamPage
                .search
                .selectStatus(
                    WhamSearchData.status
                );

            console.log(
                "Executing status search"
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
        "Verify reminder date range search",
        async () => {

            console.log(
                "Entering reminder date range"
            );

            await myWhamPage
                .search
                .enterReminderDates(
                    WhamSearchData.reminderStartDate,
                    WhamSearchData.reminderEndDate
                );

            console.log(
                "Executing reminder search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Reminder search validation completed"
            );
        }
    );

    test(
        "Verify expiration date range search",
        async () => {

            console.log(
                "Entering expiration date range"
            );

            await myWhamPage
                .search
                .enterExpirationDates(
                    WhamSearchData.expirationStartDate,
                    WhamSearchData.expirationEndDate
                );

            console.log(
                "Executing expiration search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Expiration search validation completed"
            );
        }
    );

    test(
        "Verify created date range search",
        async () => {

            console.log(
                "Entering created date range"
            );

            await myWhamPage
                .search
                .enterCreatedDates(
                    WhamSearchData.createdStartDate,
                    WhamSearchData.createdEndDate
                );

            console.log(
                "Executing created date search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Created search validation completed"
            );
        }
    );

    test(
        "Verify updated date range search",
        async () => {

            console.log(
                "Entering updated date range"
            );

            await myWhamPage
                .search
                .enterUpdatedDates(
                    WhamSearchData.updatedStartDate,
                    WhamSearchData.updatedEndDate
                );

            console.log(
                "Executing updated date search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Updated search validation completed"
            );
        }
    );

    test(
        "Verify confidential search functionality",
        async () => {

            console.log(
                "Enabling confidential filter"
            );

            await myWhamPage
                .search
                .enableConfidential();

            console.log(
                "Executing confidential search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateConfidentialBadge();

            console.log(
                "Confidential search validation completed"
            );
        }
    );

    test(
        "Verify combined advanced search functionality",
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
                .selectStatus(
                    WhamSearchData.status
                );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.validMessage
                );

            console.log(
                "Executing combined filter search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Combined search validation completed"
            );
        }
    );

    test(
        "Verify reset button clears all search fields",
        async () => {

            console.log(
                "Entering search criteria"
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
                .selectType(
                    WhamSearchData.type
                );

            console.log(
                "Resetting search fields"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Reset validation completed"
            );
        }
    );

    test(
        "Verify no records found behavior",
        async () => {

            console.log(
                "Entering invalid message"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.invalidMessage
                );

            console.log(
                "Executing invalid search"
            );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateNoRecordsFound();

            console.log(
                "No records validation completed"
            );
        }
    );

    test(
        "Verify search functionality after sorting",
        async () => {

            console.log(
                "Sorting table"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

            console.log(
                "Applying search after sorting"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.validMessage
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Search after sorting validation completed"
            );
        }
    );

    test(
        "Verify search functionality remains stable after multiple searches",
        async () => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Executing search iteration: ${index}`
                );

                await myWhamPage
                    .search
                    .enterMessage(
                        WhamSearchData.validMessage
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
                "Repeated search validation completed"
            );
        }
    );
});