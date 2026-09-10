# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class article(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		article_name: DF.Data | None
		status: DF.Literal["Draft", "Published", "Outdated"]
	# end: auto-generated types

	pass


import frappe


def get_context(context):
    context.articles = frappe.get_all(
        "article",
        filters={"status": "Published"},
        fields=["article_name", "name"]
    )