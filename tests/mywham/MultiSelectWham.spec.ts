import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Multi Select WHAM Module", () => {

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
        "Verify single row selection enables buttons",
        async () => {

            console.log(
                "Selecting first row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Validating action buttons enabled"
            );

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            await myWhamPage
                .table
                .validateDownloadButtonEnabled();

            console.log(
                "Single row selection validation completed"
            );
        }
    );

    test(
        "Verify multi row selection enables buttons",
        async () => {

            console.log(
                "Selecting first row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Selecting second row"
            );

            await myWhamPage
                .table
                .selectSecondRow();

            console.log(
                "Validating action buttons"
            );

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            await myWhamPage
                .table
                .validateDownloadButtonEnabled();

            console.log(
                "Multi row selection validation completed"
            );
        }
    );

    test(
        "Verify select all checkbox selects all rows",
        async () => {

            console.log(
                "Selecting all rows"
            );

            await myWhamPage
                .table
                .selectAllRows();

            console.log(
                "Validating enabled buttons"
            );

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            await myWhamPage
                .table
                .validateDownloadButtonEnabled();

            console.log(
                "Select all validation completed"
            );
        }
    );

    test(
        "Verify deselecting rows disables buttons",
        async () => {

            console.log(
                "Selecting rows"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .selectSecondRow();

            console.log(
                "Deselecting rows"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .selectSecondRow();

            console.log(
                "Validating disabled buttons"
            );

            await myWhamPage
                .table
                .validateDeleteButtonDisabled();

            await myWhamPage
                .table
                .validateDownloadButtonDisabled();

            console.log(
                "Deselect validation completed"
            );
        }
    );

    test(
        "Verify selection works after search filtering",
        async () => {

            console.log(
                "Applying search filter"
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
                "Selecting filtered result"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Filtered selection validation completed"
            );
        }
    );

    test(
        "Verify multi select works after sorting",
        async () => {

            console.log(
                "Sorting table"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

            console.log(
                "Selecting rows after sorting"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .selectSecondRow();

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Sorted selection validation completed"
            );
        }
    );

    test(
        "Verify select all works after advanced filtering",
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
                "Selecting all filtered rows"
            );

            await myWhamPage
                .table
                .selectAllRows();

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Advanced filtered selection completed"
            );
        }
    );

    test(
        "Verify confidential rows support multi selection",
        async () => {

            console.log(
                "Searching confidential WHAM records"
            );

            await myWhamPage
                .search
                .enableConfidential();

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateConfidentialBadge();

            console.log(
                "Selecting confidential rows"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Confidential selection validation completed"
            );
        }
    );

    test(
        "Verify row selection count remains stable after sorting",
        async () => {

            console.log(
                "Selecting first row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            const beforeSortCount =
                await myWhamPage
                    .table
                    .getSearchResultCount();

            console.log(
                `Row count before sort: ${beforeSortCount}`
            );

            console.log(
                "Sorting table"
            );

            await myWhamPage
                .table
                .sortByToColumn();

            const afterSortCount =
                await myWhamPage
                    .table
                    .getSearchResultCount();

            console.log(
                `Row count after sort: ${afterSortCount}`
            );

            expect(afterSortCount)
                .toBe(beforeSortCount);

            console.log(
                "Selection persistence validation completed"
            );
        }
    );

    test(
        "Verify select all toggle functionality",
        async () => {

            console.log(
                "Selecting all rows"
            );

            await myWhamPage
                .table
                .selectAllRows();

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Deselecting all rows"
            );

            await myWhamPage
                .table
                .selectAllRows();

            await myWhamPage
                .table
                .validateDeleteButtonDisabled();

            console.log(
                "Select all toggle validation completed"
            );
        }
    );

    test(
        "Verify selection functionality after reset",
        async () => {

            console.log(
                "Applying search filter"
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
                "Resetting search"
            );

            await myWhamPage
                .search
                .clickReset();

            await myWhamPage
                .search
                .validateSearchFieldsReset();

            console.log(
                "Selecting row after reset"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Reset selection validation completed"
            );
        }
    );
});