import { test } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Confidential WHAM Module", () => {

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
        "Verify confidential checkbox can be enabled",
        async () => {

            console.log(
                "Enabling confidential filter"
            );

            await myWhamPage
                .search
                .enableConfidential();

            console.log(
                "Confidential checkbox validation completed"
            );
        }
    );

    test(
        "Verify confidential search returns results",
        async () => {

            console.log(
                "Enabling confidential search"
            );

            await myWhamPage
                .search
                .enableConfidential();

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Confidential search validation completed"
            );
        }
    );

    test(
        "Verify confidential records display badge",
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

            await myWhamPage
                .table
                .validateConfidentialBadge();

            console.log(
                "Confidential badge validation completed"
            );
        }
    );

    test(
        "Verify confidential search with category filter",
        async () => {

            console.log(
                "Applying confidential category filter"
            );

            await myWhamPage
                .search
                .enableConfidential();

            await myWhamPage
                .search
                .selectCategory(
                    WhamSearchData.category
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Confidential category validation completed"
            );
        }
    );

    test(
        "Verify confidential search with type filter",
        async () => {

            console.log(
                "Applying confidential type filter"
            );

            await myWhamPage
                .search
                .enableConfidential();

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
                "Confidential type validation completed"
            );
        }
    );

    test(
        "Verify confidential search with level filter",
        async () => {

            console.log(
                "Applying confidential level filter"
            );

            await myWhamPage
                .search
                .enableConfidential();

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
                "Confidential level validation completed"
            );
        }
    );

    test(
        "Verify confidential search with message filter",
        async () => {

            console.log(
                "Applying confidential message filter"
            );

            await myWhamPage
                .search
                .enableConfidential();

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
                "Confidential message validation completed"
            );
        }
    );

    test(
        "Verify confidential workflow after sorting",
        async () => {

            console.log(
                "Sorting confidential records"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

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
                "Sorted confidential validation completed"
            );
        }
    );

    test(
        "Verify confidential workflow after reset",
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
                "Resetting confidential search"
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
        "Verify confidential workflow supports download",
        async ({ authenticatedPage }) => {

            console.log(
                "Searching confidential records"
            );

            await myWhamPage
                .search
                .enableConfidential();

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Downloading confidential record"
            );

            const downloadPromise =
                authenticatedPage.waitForEvent(
                    "download"
                );

            await myWhamPage
                .table
                .clickDownload();

            await downloadPromise;

            console.log(
                "Confidential download validation completed"
            );
        }
    );

    test(
        "Verify confidential workflow supports delete popup",
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

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Opening confidential delete popup"
            );

            await myWhamPage
                .table
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Confidential delete popup validation completed"
            );
        }
    );

    test(
        "Verify confidential advanced search combination",
        async () => {

            console.log(
                "Applying confidential advanced search"
            );

            await myWhamPage
                .search
                .enableConfidential();

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

            await myWhamPage
                .table
                .validateSearchResults();

            console.log(
                "Confidential advanced validation completed"
            );
        }
    );

    test(
        "Verify repeated confidential searches remain stable",
        async () => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Confidential iteration: ${index}`
                );

                await myWhamPage
                    .search
                    .enableConfidential();

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
                "Repeated confidential validation completed"
            );
        }
    );
});