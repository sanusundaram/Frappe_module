import frappe
from frappe.model.document import Document
'''def custom_print():
    frappe.msgprint("hello this is sanu")'''
@frappe.whitelist()
def get_leave_details():

    leaveapp=frappe.qb.DocType("Leave Application")
    employee=frappe.qb.DocType("Employee")


    query=(frappe.qb.from_(leaveapp).
    inner_join(employee).
    on(leaveapp.employee==employee.employee_name).
    select( employee.name,
    employee.employee_name,
    employee.email,
    leaveapp.leave_type))


    result= query.run(as_dict=True)


    if not result:
        return "no record"


    doc=frappe.get_doc("Employee",result[0]["name"])
    doc.is_active=1
    doc.save(ignore_permissions=True)

    for row in result:
        frappe.db.set_value(
            "Employee",row["name"],"mobile_number","9843816532"
        )

    frappe.db.commit()
    return result
