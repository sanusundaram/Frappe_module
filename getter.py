import frappe
@frappe.whitelist()
def set_record(member_name):
    doc=frappe.new_doc("Members")
    
    doc.member_name=member_name
    doc.category="employee"
    doc.save()
    return doc.name;
