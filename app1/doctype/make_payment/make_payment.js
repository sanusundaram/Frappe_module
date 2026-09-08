// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Make Payment", {
    refresh(frm){
        if(frm.is_new()){
            if(!frm.doc.balance_amount){
                frm.set_value("balance_amount",frm.doc.total_amount);
            }
        }
    },
	before_save(frm){
        frm.set_value("balance_amount",frm.doc.balance_amount-frm.doc.enter_amount_to_be_pay)
    }
});
