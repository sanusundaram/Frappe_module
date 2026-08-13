import frappe

def get_context(context):
    context.students = frappe.get_all(
        "Employee",
        fields=["employee_name"],
        ignore_permissions=True
    )
