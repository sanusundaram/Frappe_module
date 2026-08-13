# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class dummy(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		address: DF.SmallText | None
		disease: DF.Data | None
		img: DF.Attach | None
		mobile_no: DF.Data | None
		name1: DF.Data | None
		reg_no: DF.Data | None
		status: DF.Literal["Pending", "Approved", "Cancelled"]
	# end: auto-generated types

	# def custom(self):
	# 	return f"{self.name1}{self.reg_no}"
	# def before_insert(self):
	# 	self.reg_no=self.reg_no.strip()
	# 	self.status="Pending"
	# 	frappe.msgprint("before_insert")
	# def before_naming(self):
	# 	self.name1=self.name1.upper()
	# def autoname(self):
	# 	self.name=self.name1
	# def validate(self):
	# 	if(self.status=="Approved"):
	# 		self.status="Approved"
	# 	else:
	# 		frappe.msgprint("validate")
	# def before_save(self):
	# 	self.status="Approved"
	# 	'''idhu mela iruka munnu function um intha order la tha excecute aagum'''
	# def after_insert(self):
	# 	self.disease="headache"
	# def on_update(self):
	# 	self.disease="stomach pain"
	# 	'''after_insert iruka data save panrapo varathu, on_update la irukrathu tha varum, even if the data is 1st tym saved'''
	# def before_submit(self):
	# 	if(len(self.mobile_no)==10):
	# 		frappe.msgprint("befor_submit")
	# 	else:
	# 		frappe.msgprint("invalid no---before_submit")
	# def on_submit(self):
	# 	if(self.disease=="a"):
	# 		frappe.msgprint("on_submit")
	# def before_cancel(self):
	# 	frappe.msgprint("befor_cancel")
	# def on_cancel(self):
	# 	frappe.msgprint("cancel")
	# def on_change(self):
	# 	frappe.msgprint("alltime -- on_change")

	# def on_trash(self):
	# 	if self.status == "Cancelled":
	# 		frappe.throw("Cannot delete cancelled employee")

	# def before_rename(self, old, new, merge=False):
	# 	frappe.msgprint(f"Renaming {old} to {new}")

def get_employee():
	doc=frappe.get_doc("dummy","ABC")
	print(doc.name1)




# @frappe.whitelist()
# def create_book():
#     frappe.publish_realtime(
#         "dummylist",
#         {"name1": "uyir"}
#     )

