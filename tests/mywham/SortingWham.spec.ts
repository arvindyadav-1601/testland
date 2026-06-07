import { test } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Sorting WHAM Module", () => {

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
        "Verify To column sorting",
        async () => {

            console.log(
                "Sorting by To column"
            );

            await myWhamPage
                .table
                .sortByToColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "To column sorting validation completed"
            );
        }
    );

    test(
        "Verify Category column sorting",
        async () => {

            console.log(
                "Sorting by Category column"
            );

            await myWhamPage
                .table
                .sortByCategoryColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Category sorting validation completed"
            );
        }
    );

    test(
        "Verify Level column sorting",
        async () => {

            console.log(
                "Sorting by Level column"
            );

            await myWhamPage
                .table
                .sortByLevelColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Level sorting validation completed"
            );
        }
    );

    test(
        "Verify Type column sorting",
        async () => {

            console.log(
                "Sorting by Type column"
            );

            await myWhamPage
                .table
                .sortByTypeColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Type sorting validation completed"
            );
        }
    );

    test(
        "Verify Properties column sorting",
        async () => {

            console.log(
                "Sorting by Properties column"
            );

            await myWhamPage
                .table
                .sortByPropertiesColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Properties sorting validation completed"
            );
        }
    );

    test(
        "Verify Creation Date column sorting",
        async () => {

            console.log(
                "Sorting by Creation Date column"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Creation Date sorting validation completed"
            );
        }
    );

    test(
        "Verify Expiration Date column sorting",
        async () => {

            console.log(
                "Sorting by Expiration Date column"
            );

            await myWhamPage
                .table
                .sortByExpirationDateColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Expiration Date sorting validation completed"
            );
        }
    );

    test(
        "Verify Confidential column sorting",
        async () => {

            console.log(
                "Sorting by Confidential column"
            );

            await myWhamPage
                .table
                .sortByConfidentialColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Confidential sorting validation completed"
            );
        }
    );

    test(
        "Verify sorting works with advanced search",
        async () => {

            console.log(
                "Applying advanced search"
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

            console.log(
                "Sorting filtered results"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Advanced sorting validation completed"
            );
        }
    );

    test(
        "Verify sorting works with confidential workflow",
        async () => {

            console.log(
                "Searching confidential records"
            );

            await myWhamPage
                .search
                .enableConfidential();

            await myWhamPage
                .search
                .clickSearch();

            console.log(
                "Sorting confidential results"
            );

            await myWhamPage
                .table
                .sortByCategoryColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Confidential sorting validation completed"
            );
        }
    );

    test(
        "Verify sorting supports download workflow",
        async ({ authenticatedPage }) => {

            console.log(
                "Sorting records"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

            console.log(
                "Selecting sorted row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            const downloadPromise =
                authenticatedPage.waitForEvent(
                    "download"
                );

            await myWhamPage
                .table
                .clickDownload();

            await downloadPromise;

            console.log(
                "Sorting download validation completed"
            );
        }
    );

    test(
        "Verify sorting supports delete workflow",
        async () => {

            console.log(
                "Sorting records"
            );

            await myWhamPage
                .table
                .sortByLevelColumn();

            console.log(
                "Selecting sorted row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Sorting delete validation completed"
            );
        }
    );

    test(
        "Verify sorting after reset workflow",
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

            console.log(
                "Sorting after reset"
            );

            await myWhamPage
                .table
                .sortByTypeColumn();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Reset sorting validation completed"
            );
        }
    );

    test(
        "Verify repeated sorting remains stable",
        async () => {

            for (let index = 1; index <= 5; index++) {

                console.log(
                    `Sorting iteration: ${index}`
                );

                await myWhamPage
                    .table
                    .sortByCategoryColumn();

                await myWhamPage
                    .table
                    .sortByCreationDateColumn();

                await myWhamPage
                    .table
                    .sortByLevelColumn();

                await myWhamPage
                    .table
                    .validateSearchResults();
            }

            console.log(
                "Repeated sorting validation completed"
            );
        }
    );
});