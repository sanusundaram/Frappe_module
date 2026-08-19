# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Members(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from app1.app1.doctype.links.links import Links
		from frappe.types import DF

		category: DF.Data | None
		details: DF.Table[Links]
		member_name: DF.Data | None
	# end: auto-generated types

	pass
	
import frappe
@frappe.whitelist()
def set_record():
    doc=frappe.new_doc("Members")
    
    doc.member_name="leader"
    doc.category="employee"
    doc.save()
    return doc.name;