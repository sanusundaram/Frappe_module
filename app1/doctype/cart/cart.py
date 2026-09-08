# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Cart(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from app1.app1.doctype.items.items import Items
		from frappe.types import DF

		amended_from: DF.Link | None
		balance_amount: DF.Int
		coupon: DF.Data | None
		customer_id: DF.Link | None
		customer_name: DF.Data | None
		discount_amount: DF.Int
		phone_no: DF.Data | None
		product_list: DF.Table[Items]
		sub_amount: DF.Currency
		total_amount: DF.Currency
		workflow_state: DF.Data | None
	# end: auto-generated types

	pass

@frappe.whitelist()
def add_customer(customer_name, customer_id, phone_no):

    customer = frappe.get_doc({
        "doctype": "Customer",
        "customer_name": customer_name,
        "customer_id": customer_id,
        "phone_no": phone_no
    })

    customer.insert()

    return {
        "customer_name": customer.customer_name
    }