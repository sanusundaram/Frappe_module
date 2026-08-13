# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Employee(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		depart: DF.Link | None
		department: DF.Data | None
		department_id: DF.Link | None
		details: DF.JSON | None
		email: DF.Data
		employee_id: DF.Data
		employee_name: DF.Data
		employee_photo: DF.AttachImage | None
		gender: DF.Literal["Male", "Female", "Other"]
		is_active: DF.Check
		mobile_number: DF.Data | None
		skill: DF.SmallText | None
	# end: auto-generated types

	pass
	'''def before_insert(self):
		record=frappe.db.get_list("Employee",fields=["employee_id"])
	def validate(self):
		if (not self.email.endswith("@gmail.com") ) or frappe.db.exists("Employee",{
			"email":self.email,
			"name":["!=" , self.name]
		}):
			frappe.throw("invalid")
		if self.department_id:
			self.department=frappe.db.get_value("Department",self.department_id,"department_name")
	def before_save(self):
		if self.is_active==0:
			self.is_active=1'''
