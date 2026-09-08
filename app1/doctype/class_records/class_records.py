# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ClassRecords(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		marks: DF.Int
		name1: DF.Data | None
		roll_no: DF.Data | None
	# end: auto-generated types

	pass
