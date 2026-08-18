import frappe
from frappe.utils.pdf import get_pdf


@frappe.whitelist()
def generate_employee_pdf(employee_name):

    employee = frappe.get_doc("Employee", employee_name)

    html = f"""
    <html>
        <body>
            <h1>Employee Report</h1>

            <p>Employee ID: {employee.name}</p>
            <p>Name: {employee.employee_name}</p>
            <p>Department: {employee.department or ""}</p>
            <p>Designation: {employee.designation or ""}</p>
        </body>
    </html>
    """

    pdf = get_pdf(html)

    frappe.local.response.filename = f"{employee.name}.pdf"
    frappe.local.response.filecontent = pdf
    frappe.local.response.type = "pdf"