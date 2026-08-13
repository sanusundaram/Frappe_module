import frappe


def daily_maintenance():
    frappe.log_error(
        title="Daily Available Maintenance",
        message="From error log"
    )

def msgprint():
    frappe.log_error("Testing")