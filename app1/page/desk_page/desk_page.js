frappe.pages["members-dashboard"].on_page_load = function (wrapper) {

    // =========================================================
    // 1. CREATE PAGE
    // =========================================================

    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: "Members Dashboard",
        single_column: true
    });


    // =========================================================
    // 2. SET TITLE
    // =========================================================

    page.set_title("Members Dashboard");


    // =========================================================
    // 3. SET SUB TITLE
    // =========================================================

    page.set_title_sub("Manage Members");


    // =========================================================
    // 4. SET INDICATOR
    // =========================================================

    page.set_indicator("Active", "green");


    // =========================================================
    // 5. CLEAR INDICATOR
    // =========================================================

    // Uncomment when you want to remove the indicator

    // page.clear_indicator();


    // =========================================================
    // 6. PRIMARY ACTION
    // =========================================================

    page.set_primary_action("Add Member", () => {

        frappe.new_doc("Members");

    });


    // =========================================================
    // 7. CLEAR PRIMARY ACTION
    // =========================================================

    // Uncomment to remove the primary action

    // page.clear_primary_action();


    // =========================================================
    // 8. SECONDARY ACTION
    // =========================================================

    page.set_secondary_action("Refresh", () => {

        frappe.show_alert("Refreshing Members...");

    });


    // =========================================================
    // 9. CLEAR SECONDARY ACTION
    // =========================================================

    // Uncomment to remove secondary action

    // page.clear_secondary_action();


    // =========================================================
    // 10. ADD MENU ITEM
    // =========================================================

    page.add_menu_item("View Members", () => {

        frappe.set_route("List", "Members");

    });


    page.add_menu_item("View Students", () => {

        frappe.set_route(
            "List",
            "Members",
            {
                category: "Student"
            }
        );

    });


    // =========================================================
    // 11. CLEAR MENU
    // =========================================================

    // Uncomment to remove all menu items

    // page.clear_menu();


    // =========================================================
    // 12. ADD ACTION ITEM
    // =========================================================

    page.add_action_item("Export Members", () => {

        frappe.msgprint("Export Members clicked");

    });


    // =========================================================
    // 13. CLEAR ACTIONS MENU
    // =========================================================

    // Uncomment to clear action menu

    // page.clear_actions_menu();


    // =========================================================
    // 14. ADD INNER BUTTON
    // =========================================================

    page.add_inner_button("Show Members", () => {

        frappe.set_route("List", "Members");

    });


    page.add_inner_button("Show Students", () => {

        frappe.msgprint("Showing Students");

    });


    // =========================================================
    // 15. CHANGE CUSTOM BUTTON TYPE
    // =========================================================

    page.change_custom_button_type(
        "Show Students",
        null,
        "primary"
    );


    // =========================================================
    // 16. REMOVE INNER BUTTON
    // =========================================================

    // Uncomment to remove a button

    // page.remove_inner_button("Show Students");


    // =========================================================
    // 17. CLEAR INNER TOOLBAR
    // =========================================================

    // Uncomment to remove all inner buttons

    // page.clear_inner_toolbar();


    // =========================================================
    // 18. ADD FIELDS
    // =========================================================

    page.add_field({
        label: "Member Name",
        fieldname: "member_name",
        fieldtype: "Data"
    });


    page.add_field({
        label: "Category",
        fieldname: "category",
        fieldtype: "Select",
        options: [
            "",
            "Student",
            "Employee"
        ]
    });


    // =========================================================
    // 19. GET FORM VALUES
    // =========================================================

    page.add_inner_button("Get Values", () => {

        let values = page.get_form_values();

        console.log("PAGE VALUES:", values);

        frappe.msgprint(
            JSON.stringify(values)
        );

    });


    // =========================================================
    // 20. CLEAR FIELDS
    // =========================================================

    // Uncomment to clear the fields

    // page.clear_fields();


    // =========================================================
    // 21. SEARCH MEMBERS USING THE FIELD VALUES
    // =========================================================

    page.add_inner_button("Search Members", () => {

        let values = page.get_form_values();

        console.log("Search values:", values);


        frappe.call({

            method: "frappe.client.get_list",

            args: {

                doctype: "Members",

                fields: [
                    "name",
                    "member_name",
                    "category"
                ],

                filters: values,

                limit_page_length: 20

            },

            callback: function (r) {

                console.log("Members:", r.message);

                if (r.message) {

                    frappe.msgprint(
                        `Found ${r.message.length} members`
                    );

                }

            }

        });

    });

};