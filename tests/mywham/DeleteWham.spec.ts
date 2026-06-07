import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Delete WHAM Module", () => {

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
        "Verify delete button disabled on initial page load",
        async () => {

            console.log(
                "Validating delete button disabled state"
            );

            await myWhamPage
                .table
                .validateDeleteButtonDisabled();

            console.log(
                "Initial delete button validation completed"
            );
        }
    );

    test(
        "Verify delete button enabled after selecting single row",
        async () => {

            console.log(
                "Selecting first row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Validating delete button enabled"
            );

            await myWhamPage
                .table
                .validateDeleteButtonEnabled();

            console.log(
                "Single row delete validation completed"
            );
        }
    );

    test(
        "Verify delete button enabled after multi row selection",
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
                .validateDeleteButtonEnabled();

            console.log(
                "Multi row delete validation completed"
            );
        }
    );

    test(
        "Verify delete popup opens successfully",
        async () => {

            console.log(
                "Selecting row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            console.log(
                "Opening delete popup"
            );

            await myWhamPage
                .table
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Delete popup validation completed"
            );
        }
    );

    test(
        "Verify delete popup closes using cancel button",
        async () => {

            console.log(
                "Selecting row"
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
                "Closing delete popup"
            );

            await myWhamPage
                .deletePopup
                .clickCancel();

            await expect(
                myWhamPage
                    .deletePopup
                    .popupContainer
            ).not.toBeVisible();

            console.log(
                "Delete popup close validation completed"
            );
        }
    );

    test(
        "Verify delete popup closes using close icon",
        async () => {

            console.log(
                "Selecting WHAM row"
            );

            await myWhamPage
                .table
                .selectFirstRow();

            await myWhamPage
                .table
                .clickDelete();

            console.log(
                "Closing popup using X icon"
            );

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            await expect(
                myWhamPage
                    .deletePopup
                    .popupContainer
            ).not.toBeVisible();

            console.log(
                "Close icon validation completed"
            );
        }
    );

    test(
        "Verify delete functionality after search filtering",
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
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Filtered delete validation completed"
            );
        }
    );

    test(
        "Verify delete functionality after advanced filtering",
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
                "Selecting advanced filtered row"
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
                "Advanced filter delete validation completed"
            );
        }
    );

    test(
        "Verify delete functionality after sorting",
        async () => {

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

            await myWhamPage
                .table
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Sorted delete validation completed"
            );
        }
    );

    test(
        "Verify confidential WHAM records support delete workflow",
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
                "Selecting confidential row"
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
                "Confidential delete validation completed"
            );
        }
    );

    test(
        "Verify multi select delete workflow",
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

            console.log(
                "Opening delete popup"
            );

            await myWhamPage
                .table
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Multi delete validation completed"
            );
        }
    );

    test(
        "Verify delete selection clears after deselecting rows",
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
                .validateDeleteButtonDisabled();

            console.log(
                "Delete deselection validation completed"
            );
        }
    );

    test(
        "Verify delete workflow after reset search",
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
                .clickDelete();

            await myWhamPage
                .deletePopup
                .validateDeletePopupVisible();

            console.log(
                "Reset delete validation completed"
            );
        }
    );

    test(
        "Verify delete popup stability after repeated open and close",
        async () => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Delete popup iteration: ${index}`
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

                await myWhamPage
                    .deletePopup
                    .clickCancel();
            }

            console.log(
                "Repeated popup stability validation completed"
            );
        }
    );
});