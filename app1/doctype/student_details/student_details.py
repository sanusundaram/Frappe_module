# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.website.website_generator import WebsiteGenerator


class StudentDetails(WebsiteGenerator):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		confirmemail: DF.Link | None
		email: DF.DynamicLink | None
		name1: DF.Data
		password: DF.Data | None
		published: DF.Check
		refereddoc: DF.Link | None
		route: DF.Data | None
		signature: DF.DynamicLink | None
		status: DF.Literal["Completed", "Incomplete", "Pending"]
		studentimage: DF.AttachImage | None
		title: DF.Data | None
	# end: auto-generated types

	pass
