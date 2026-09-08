# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class MakePayment(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		balance_amount: DF.Int
		cart: DF.Link | None
		customer_id: DF.Data | None
		customer_name: DF.Data | None
		enter_amount_to_be_pay: DF.Int
		mobile_no: DF.Data | None
		mode_of_pay: DF.Literal["Credit Card", "UPI", "Cash"]
		total_amount: DF.Int
	# end: auto-generated types

	pass
