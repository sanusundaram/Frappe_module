# Copyright (c) 2026, sanusha and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters: dict | None = None):
	"""Return columns and data for the report.

	This is the main entry point for the report. It accepts the filters as a
	dictionary and should return columns and data. It is called by the framework
	every time the report is refreshed or a filter is updated.
	"""
	columns = get_columns()
	data = get_data()

	return columns, data

def execute_snapshot_report(filters: dict | None = None):
	"""Return columns and data for the report.

	This is the main entry point for snapshot report. When 'Synced
	Report' is enabled in report, framework will call this method
	every time the report is refreshed or a filter is updated. It
	accepts the same filters as normal execute. But a utility method -
	get_latest_sync, is also imported.

	"""
	from frappe.database.duckdb.database import get_latest_sync

	columns = get_columns()
	data = get_data()

	return columns, data

def get_columns() -> list[dict]:
	"""Return columns for the report.

	One field definition per column, just like a DocType field definition.
	"""
	return [
		{
			"label": _("Customer Name"),
			"fieldname": "customer_id",
			"fieldtype": "Data",
		},
		{
			"label": _("Phone No"),
			"fieldname": "product_name",
			"fieldtype": "Table",
			"options":"Items"
		},
		{
			"label": _("name"),
			"fieldname": "name",
			"fieldtype": "Data"
		},
		{
			"label": _("Name"),
			"fieldname": "parent",
			"fieldtype": "Data"
		},
		{
			"label": _("Name"),
			"fieldname": "stock",
			"fieldtype": "Int"
		}
	]


def get_data() -> list[list]:
	"""Return data for the report.

	The report data is a list of rows, with each row being a list of cell values.
	"""
	data=frappe.db.sql("""
		select c.customer_id,i.product_name,i.name,i.parent,p.stock
		from `tabCart` c
		join `tabItems` i 
		on i.parent=c.name
		join `tabProduct` p
		on p.name=i.product_name
		group by i.parent
		
	""")
	return data