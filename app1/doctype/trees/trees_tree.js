// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

frappe.treeview_settings["trees"] = {
    breadcrumb:"material",//not work
    title:"gaget",
    fields:[
        {
            fieldtype: "Data",
            fieldname: "parent_name",
            label: "Name"
        }
    ],
    filters: [

        {
            fieldname: "category",
            fieldtype: "Select",
            label: "Category",
            options: "\nStudent\nEmployee"
        }

    ],
     menu_items: [
        {
            label: "New Member",
            action: function () {
                frappe.new_doc("Members");
            },
         }
    ],
    on_get_node: function (nodes) {
        console.log("Members received:", nodes);
    }
};
