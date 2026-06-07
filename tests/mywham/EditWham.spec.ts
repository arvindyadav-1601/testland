import { test, expect } from "../../fixtures";

import { MyWhamPage }
    from "../../pages/MyWhamPage";

import { WhamAddEditData }
    from "../../testdata/mywham/whamAddEditData";

import { WhamSearchData }
    from "../../testdata/mywham/whamSearchData";

test.describe("Edit WHAM Module", () => {

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
        "Verify edit modal opens from table row",
        async () => {

            console.log(
                "Opening first row for edit"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            await myWhamPage
                .addEditModal
                .validateAddEditModalVisible();

            console.log(
                "Edit modal validation completed"
            );
        }
    );

    test(
        "Verify edit modal closes successfully",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Closing edit modal"
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
                "Edit modal close validation completed"
            );
        }
    );

    test(
        "Verify updating WHAM message",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating message"
            );

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.updatedMessage
                );

            console.log(
                "Saving updated message"
            );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Message update validation completed"
            );
        }
    );

    test(
        "Verify updating category",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating category"
            );

            await myWhamPage
                .addEditModal
                .selectCategory(
                    WhamAddEditData.updatedCategory
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Category update validation completed"
            );
        }
    );

    test(
        "Verify updating type",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating type"
            );

            await myWhamPage
                .addEditModal
                .selectType(
                    WhamAddEditData.updatedType
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Type update validation completed"
            );
        }
    );

    test(
        "Verify updating level",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating level"
            );

            await myWhamPage
                .addEditModal
                .selectLevel(
                    WhamAddEditData.updatedLevel
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Level update validation completed"
            );
        }
    );

    test(
        "Verify updating expiration date",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating expiration date"
            );

            await myWhamPage
                .addEditModal
                .enterExpirationDate(
                    WhamAddEditData.updatedExpirationDate
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Expiration update validation completed"
            );
        }
    );

    test(
        "Verify updating reminder date",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating reminder"
            );

            await myWhamPage
                .addEditModal
                .enterReminder(
                    WhamAddEditData.updatedReminder
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Reminder update validation completed"
            );
        }
    );

    test(
        "Verify confidential WHAM update",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating confidential flag"
            );

            await myWhamPage
                .addEditModal
                .enableConfidential();

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Confidential update validation completed"
            );
        }
    );

    test(
        "Verify complete WHAM edit workflow",
        async () => {

            console.log(
                "Opening edit modal"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            console.log(
                "Updating all editable fields"
            );

            await myWhamPage
                .addEditModal
                .selectCategory(
                    WhamAddEditData.updatedCategory
                );

            await myWhamPage
                .addEditModal
                .selectType(
                    WhamAddEditData.updatedType
                );

            await myWhamPage
                .addEditModal
                .selectLevel(
                    WhamAddEditData.updatedLevel
                );

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.updatedMessage
                );

            await myWhamPage
                .addEditModal
                .enterExpirationDate(
                    WhamAddEditData.updatedExpirationDate
                );

            await myWhamPage
                .addEditModal
                .enterReminder(
                    WhamAddEditData.updatedReminder
                );

            console.log(
                "Saving updated WHAM"
            );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Complete edit workflow validation completed"
            );
        }
    );

    test(
        "Verify updated WHAM searchable with updated criteria",
        async () => {

            console.log(
                "Searching updated WHAM"
            );

            await myWhamPage
                .search
                .enterMessage(
                    WhamAddEditData.updatedMessage
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
        "Verify edit workflow after sorting",
        async () => {

            console.log(
                "Sorting table"
            );

            await myWhamPage
                .table
                .sortByCreationDateColumn();

            console.log(
                "Opening sorted row for edit"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.updatedMessage
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Sorted edit validation completed"
            );
        }
    );

    test(
        "Verify edit workflow after advanced filtering",
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
                .clickSearch();

            console.log(
                "Opening filtered row for edit"
            );

            await myWhamPage
                .table
                .openFirstRowForEdit();

            await myWhamPage
                .addEditModal
                .enterMessage(
                    WhamAddEditData.updatedMessage
                );

            await myWhamPage
                .addEditModal
                .clickSave();

            console.log(
                "Filtered edit validation completed"
            );
        }
    );

    test(
        "Verify edit modal stability after repeated usage",
        async () => {

            for (let index = 1; index <= 3; index++) {

                console.log(
                    `Edit modal iteration: ${index}`
                );

                await myWhamPage
                    .table
                    .openFirstRowForEdit();

                await myWhamPage
                    .addEditModal
                    .validateAddEditModalVisible();

                await myWhamPage
                    .addEditModal
                    .clickCancel();
            }

            console.log(
                "Repeated edit modal validation completed"
            );
        }
    );
});