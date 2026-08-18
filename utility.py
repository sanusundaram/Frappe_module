import frappe
from frappe.query_builder import DocType
from frappe.utils import now

@frappe.whitelist()
def getter():

    employees = frappe.get_list(
        "Employee",
        fields=["name", "employee_name", "owner"],
        order_by="creation desc",
        limit_page_length=5
    )

    for employee in employees:
        employee["email"] = frappe.db.get_value(
            "User",
            employee["owner"],
            "email"
        )

    return {
        "timestamp": frappe.utils.now(),
        "records": employees
    }