// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Test Document", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Test Document',{
    onload: function(frm){
        const tour_name='form tour';
        frm.tour.init({tour_name}).then(()=> frm.tour.start());
    }
});