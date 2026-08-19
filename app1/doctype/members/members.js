// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Members", {
// 	refresh(frm) {

// 	},
// });
// frappe.ui.form.on("Members", {

//     refresh(frm) {
//         console.log("Members form loaded");

//         console.log("Member Name:", frm.doc.member_name);
//         console.log("Category:", frm.doc.category);
//         console.log("Details:", frm.doc.details);
//     },

//     member_name(frm) {
//         frappe.msgprint("Member Name changed:"+ frm.doc.member_name);
//     },

//     category(frm) {
//         console.log("Category changed:", frm.doc.category);
//     }

//     setup(frm) {
//         console.log("SETUP");
//     },
//     before_load(frm) {
//         console.log("BEFORE LOAD");
//     },
//     onload(frm) {
//         console.log("ONLOAD");
//     },
//     refresh(frm) {
//         frm.add_custom_button("Hello", () => {
//             frappe.msgprint("Hello");
           
//         });
//         console.log("refresh");
//     },
//     onload_post_render(frm) {
//         console.log("FORM COMPLETELY RENDERED");
//     },
//     before_discard(frm) {
//         console.log("Before discard");
//     },
//     after_discard(frm) {
//         console.log("After discard");
//     },
//     timeline_refresh(frm) {
//         console.log("Timeline refreshed");
//     },
//     details_on_form_rendered(frm, grid_row) {
//         console.log("Child row opened as form....");
//         console.log(grid_row);
//     },
//     get_email_recipients(frm) {
//         if(frm.field=='recipient') 
//             return ["support@examonline.in"];
//     },
//     refresh(frm) {

//         let row = frm.doc.details[0];

//         row.dept = "IT";
//         frm.refresh_field("details");

//         if(!frm.doc.category){
//             frm.set_intro("please fill category","red");
//         }


//         frm.add_custom_button("closed",()=>{
//             let selected = frm.get_selected()
//             console.log(selected)
//         },"set status");
//         frm.change_custom_button_type('Closed', 'Set Status', 'danger');

//         frappe.ui.form.make_control({
//             parent: frm.fields_dict.custom_html.$wrapper,
//             df: {
//                 label: "Active",
//                 fieldname: "active",
//                 fieldtype: "Check"
//             },
//             render_input: true
//         });     
//     }

    

// });




// frappe.ui.form.on("Links", {
    // mobile_number(frm, cdt, cdn) {
    //     let row = frappe.get_doc(cdt, cdn);

    //     frappe.msgprint("Mobile No: " + row.mobile_number);
    // },
    
    // skills(frm, cdt, cdn) {

    //     let row = frappe.get_doc(cdt, cdn);

    //     frappe.msgprint("Skills:"+ row.skills);
    // },
//     details_add(frm,cdt,cdn){
//         // let row = frappe.get_doc(cdt, cdn);
//         // frappe.msgprint("dept:"+ row.dept);
//         console.log("New row added");
//     },
//     form_render(frm, cdt, cdn) {
//         console.log("Child row form rendered");
//     },
//     details_remove(frm, cdt, cdn) {
//         console.log("Row removed");
//     },

//     details_move(frm, cdt, cdn) {
//         console.log("Row moved");
//     },
//     before_details_remove(frm, cdt, cdn) {
//         frappe.msgprint("This row is going to be removed");
//     }
       
// });


   // =====================================================
    // dialog in js
    // =====================================================
// frappe.ui.form.on("Members", {

//     refresh(frm) {

//         frm.add_custom_button("dialog", () => {

//             let dialog = new frappe.ui.Dialog({

//                 title: "Add Member",

//                 fields: [
//                     {
//                         fieldname: "member_name",
//                         fieldtype: "Data",
//                         label: "Member Name",
//                         reqd: 1
//                     },
//                     {
//                         fieldname: "category",
//                         fieldtype: "Select",
//                         label: "Category",
//                         options: "\nStudent\nEmployee",
//                         reqd: 1
//                     }
//                 ],

//                 primary_action_label: "Save",

//                 primary_action(values) {

//                     console.log("Values:", values);

//                     frappe.msgprint({
//                         title: "Member Details",
//                         message: `
//                             Member: ${values.member_name}<br>
//                             Category: ${values.category}
//                         `,
//                         indicator: "green"
//                     });

//                     dialog.hide();
//                 }

//             });

//             dialog.show();

//         });
//         frm.add_custom_button("prompt", () => {
//             frappe.prompt(
//             {
//                 fieldname: "member_name",
//                 fieldtype: "Data",
//                 label: "Member Name",
//                 reqd: 1
//             },
//             function(values) {

//                 console.log(values);

//             },
//             "Add Member",
//             "Save"
//             );
//         });

//     }

// });


//---------------
// CHart api
//---------------

const dia = new frappe.ui.Dialog({

    title: "Adding Members",

    fields: [
        {
            label: "Member Name",
            fieldtype: "Data",
            fieldname: "member_name",
            reqd: 1
        }
    ],

    primary_action_label: "Submit",

    primary_action(value) {

        frappe.call({

            method: "app1.getter.set_record",

            args: {
                member_name: value.member_name
            },

            callback: function(r) {

                console.log("Response:", r.message);

                dia.hide();

                frappe.msgprint({
                    title: "Success",
                    message: "Member created successfully",
                    indicator: "green"
                });
                frappe.set_route("Form","Members",r.message);
            }

        });

    }

});

dia.show();
