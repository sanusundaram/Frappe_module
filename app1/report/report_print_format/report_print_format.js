// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt


frappe.query_reports["Report print Format"] = {
    filters: [
        {
            fieldname: "marks",
            label: "Marks Above",
            fieldtype: "Int",
            default: 60
        }
    ]
};c