# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Employee(Document):
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
