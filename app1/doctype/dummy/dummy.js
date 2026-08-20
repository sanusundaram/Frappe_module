// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

// frappe.ui.form.on("dummy", {
// 	refresh(frm) {
//         new frappe.ui.Scanner({
//             dialog: true, // open camera scanner in a dialog
//             multiple: false, // stop after scanning one value
//             on_scan(data) {
//                 console.log(data.decodedText);
//             }
//         });
// 	},
// });

// js api assignment2
frappe.ui.form.on("dummy",{ 
    refresh(frm){ 
        const dialog=new frappe.ui.Dialog({ 
            title:"Adder", 
            fields:[{ 
                label:"First Name", 
                fieldtype:"Data", 
                fieldname:"first_name" 
            }], 
            primary_action_label:"submit", 
            primary_action(values){ 
                const data=values.first_name; 
                dialog.hide(); 
                frappe.route_options={ 
                    name1:data 
                }; 
                frappe.new_doc("Student Details"); 
            } 
        }); 
        dialog.show(); 
    } 
});