import frappe

def get_context(context):
    emp_id = frappe.form_dict.get("employee")

    if not emp_id:
        frappe.throw("Employee ID is missing in the URL")

    context.employee = frappe.get_doc(
        "Employee",
        emp_id
    )