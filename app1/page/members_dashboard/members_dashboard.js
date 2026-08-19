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

    page.change_inner_button_type(
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

		const values = page.get_form_values();

		console.log("PAGE VALUES:", values);

		frappe.msgprint({
			title: "Page Values",
			message: JSON.stringify(values, null, 2),
			indicator: "blue"
		});

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






// // frappe.pages["members-dashboard"].on_page_load=function(wrapper){
// //     let page=frappe.ui.make_app_page({
// //         parent : wrapper,
// //         title:"Members Dashboard",
// //         single_column:true
// //     });
// //     page.main.html(`
// //         <div id="chart"><?div>`
// //     );

// //     const data={
// //         datasets:[
// //             {
// //                 name:"Members",
// //                 vslues:[10,85,23,43,89],
// //             },
// //         ],
// //     };
// //     let chart = new frappe.ui.RealtimeChart(
// //         "#chart",
// //         "member_update",
// //         8,
// //         {
// //             title: "Members Realtime Chart",
// //             data: {
// //                 datasets: [
// //                     {
// //                         name: "Members",
// //                         values: []
// //                     }
// //                 ]
// //             },
// //             type: "line",
// //             height: 250
// //         }
// //     );
// // }


// frappe.pages["members-dashboard"].on_page_load = function (wrapper) {

//     // =====================================================
//     // 1. CREATE PAGE
//     // =====================================================

//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: "Members Dashboard",
//         single_column: true
//     });


//     // =====================================================
//     // 2. CHART CONTAINER
//     // =====================================================

//     page.main.html(`
//         <div id="members-chart"></div>
//     `);


//     // =====================================================
//     // 3. INITIAL DATA
//     // =====================================================

//     const data = {
//         labels: [],
//         datasets: [
//             {
//                 name: "Random Values",
//                 values: []
//             }
//         ]
//     };


//     // =====================================================
//     // 4. CREATE STATIC CHART
//     // =====================================================

//     let chart = new frappe.Chart("#members-chart", {

//         title: "Random Values",

//         data: data,

//         type: "line",

//         height: 300

//     });


//     // =====================================================
//     // 5. BUTTON
//     // =====================================================

//     page.add_inner_button("Generate Random Value", () => {

//         console.log("Button clicked");


//         // =================================================
//         // 6. CALL PYTHON
//         // =================================================

//         frappe.call({

//             method: "app1.api.generate_random_value",

//             callback: function (r) {

//                 let value = r.message;

//                 console.log("Random value received:", value);


//                 // =========================================
//                 // 7. ADD VALUE TO CHART
//                 // =========================================

//                 chart.data.labels.push(
//                     chart.data.labels.length + 1
//                 );

//                 chart.data.datasets[0].values.push(value);


//                 // =========================================
//                 // 8. UPDATE CHART
//                 // =========================================

//                 chart.update();


//             }

//         });

//     });

// };



frappe.pages["members-dashboard"].on_page_load = function (wrapper) {

    // -------------------------------------------------
    // Create Page
    // -------------------------------------------------

    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: "Members Dashboard",
        single_column: true
    });


    // -------------------------------------------------
    // Chart HTML
    // -------------------------------------------------

    page.main.html(`
        <div id="members-chart"></div>
    `);


    // -------------------------------------------------
    // Initial chart data
    // -------------------------------------------------

    const data = {
        datasets: [
            {
                name: "Members",
                values: []
            }
        ]
    };


    // -------------------------------------------------
    // Create Realtime Chart
    // -------------------------------------------------

    let chart = new frappe.ui.RealtimeChart(
        "#members-chart",
        "members_chart_update",
        8,
        {
            title: "Members Realtime Chart",
            data: data,
            type: "line",
            height: 300
        }
    );


    // -------------------------------------------------
    // Listen to the realtime event
    // -------------------------------------------------

    frappe.realtime.on("members_chart_update", function (data) {

        console.log("Realtime data received:", data);

    });


    console.log("Members Realtime Chart loaded");

};