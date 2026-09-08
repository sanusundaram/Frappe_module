# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Customer(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		customer_id: DF.Data | None
		customer_name: DF.Data | None
		email: DF.Data | None
		phone_no: DF.Data | None
	# end: auto-generated types

	pass
