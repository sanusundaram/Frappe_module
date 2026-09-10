# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Department(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		active: DF.Check
		budget: DF.Currency
		department_head: DF.Data | None
		department_name: DF.Literal["AIDS", "AIML", "AGRI", "CSE", "ISE", "CSD", "BIO", "EEE", "ECE"]
		description: DF.SmallText | None
	# end: auto-generated types

	pass
