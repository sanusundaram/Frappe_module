// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

frappe.ui.form.on("dummy", {
	refresh(frm) {
        new frappe.ui.Scanner({
            dialog: true, // open camera scanner in a dialog
            multiple: false, // stop after scanning one value
            on_scan(data) {
                console.log(data.decodedText);
            }
        });
	},
});
