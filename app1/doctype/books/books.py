# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.website.website_generator import WebsiteGenerator


class books(WebsiteGenerator):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amended_from: DF.Link | None
		author: DF.Data | None
		book_name: DF.Data
		description: DF.TextEditor | None
		image1: DF.AttachImage | None
		price: DF.Currency
		published: DF.Check
		route: DF.Data | None
		title: DF.Data | None
	# end: auto-generated types

	pass
	def greet(self,name):
		return f"hello {name}"
