import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Download WHAM Module", () => {

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
        "Verify download button disabled on initial page load",
        async () => {

            console.log(
                "Validating initial download button state"
            );

            await myWhamPage
                .table
                .validateDownloadButtonDisabled();

            console.log(
                "Initial download button validation completed"
            );
        }
    );

    test(
        "Verify download button enabled after single row selection",
        async () => {

            console.log(
                "Selecting first row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .validateDownloadButtonEnabled();

            console.log(
                "Single row download validation completed"
            );
        }
    );

    test(
        "Verify download button enabled after multi row selection",
        async () => {

            console.log(
                "Selecting multiple rows"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .selectSecondRow();

            await myWhamPage
                .table
                .validateDownloadButtonEnabled();

            console.log(
                "Multi row download validation completed"
            );
        }
    );

    test(
        "Verify single WHAM download workflow",
        async ({ authenticatedPage }) => {

            console.log(
                "Selecting first row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Starting single download"
            );

            const downloadPromise =
                authenticatedPage.waitForEvent(
                    "download"
                );

            await myWhamPage
                .table
                .clickDownload();

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Single download validation completed"
            );
        }
    );

    test(
        "Verify multi WHAM download workflow",
        async ({ authenticatedPage }) => {

            console.log(
                "Selecting multiple rows"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .selectSecondRow();

            console.log(
                "Starting multi download"
            );

            const downloadPromise =
                authenticatedPage.waitForEvent(
                    "download"
                );

            await myWhamPage
                .table
                .clickDownload();

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Multi download validation completed"
            );
        }
    );

    test(
        "Verify select all download workflow",
        async ({ authenticatedPage }) => {

            console.log(
                "Selecting all rows"
            );

            await myWhamPage
                .table
                .selectAllRows();

            console.log(
                "Starting bulk download"
            );

            const downloadPromise =
                authenticatedPage.waitForEvent(
                    "download"
                );

            await myWhamPage
                .table
                .clickDownload();

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Bulk download validation completed"
            );
        }
    );

    test(
        "Verify download workflow after search filtering",
        async ({ authenticatedPage }) => {

            console.log(
                "Applying message filter"
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
                "Selecting filtered row"
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

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Filtered download validation completed"
            );
        }
    );

    test(
        "Verify download workflow after advanced filtering",
        async ({ authenticatedPage }) => {

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
                "Selecting filtered row"
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

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Advanced filter download validation completed"
            );
        }
    );

    test(
        "Verify confidential WHAM download workflow",
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
                .validateConfidentialBadge();

            console.log(
                "Selecting confidential row"
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

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Confidential download validation completed"
            );
        }
    );

    test(
        "Verify download workflow after sorting",
        async ({ authenticatedPage }) => {

            console.log(
                "Sorting table"
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

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Sorted download validation completed"
            );
        }
    );

    test(
        "Verify download selection clears after deselection",
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

            await myWhamPage
                .table
                .validateDownloadButtonDisabled();

            console.log(
                "Download deselection validation completed"
            );
        }
    );

    test(
        "Verify download workflow after reset search",
        async ({ authenticatedPage }) => {

            console.log(
                "Applying filter"
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

            const downloadPromise =
                authenticatedPage.waitForEvent(
                    "download"
                );

            await myWhamPage
                .table
                .clickDownload();

            const download =
                await downloadPromise;

            expect(
                download
            ).toBeTruthy();

            console.log(
                "Reset download validation completed"
            );
        }
    );

    test(
        "Verify no records search disables download workflow",
        async () => {

            console.log(
                "Searching invalid message"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamSearchData.invalidMessage
                );

            await myWhamPage
                .search
                .clickSearch();

            await myWhamPage
                .table
                .validateNoRecordsFound();

            await myWhamPage
                .table
                .validateDownloadButtonDisabled();

            console.log(
                "No records download validation completed"
            );
        }
    );

    test(
        "Verify repeated download workflow stability",
        async ({ authenticatedPage }) => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Download iteration: ${index}`
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

                const download =
                    await downloadPromise;

                expect(
                    download
                ).toBeTruthy();
            }

            console.log(
                "Repeated download validation completed"
            );
        }
    );
});