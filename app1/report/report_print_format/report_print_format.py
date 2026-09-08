# # Copyright (c) 2026, sanusha and contributors
# # For license information, please see license.txt

# import frappe
# from frappe import _


# def execute(filters: dict | None = None):
# 	"""Return columns and data for the report.

# 	This is the main entry point for the report. It accepts the filters as a
# 	dictionary and should return columns and data. It is called by the framework
# 	every time the report is refreshed or a filter is updated.
# 	"""
# 	columns = get_columns()
# 	data = get_data()

# 	return columns, data

# def execute_snapshot_report(filters: dict | None = None):
# 	"""Return columns and data for the report.

# 	This is the main entry point for snapshot report. When 'Synced
# 	Report' is enabled in report, framework will call this method
# 	every time the report is refreshed or a filter is updated. It
# 	accepts the same filters as normal execute. But a utility method -
# 	get_latest_sync, is also imported.

# 	"""
# 	from frappe.database.duckdb.database import get_latest_sync

# 	columns = get_columns()
# 	data = get_data()

# 	return columns, data

# def get_columns() -> list[dict]:
# 	"""Return columns for the report.

# 	One field definition per column, just like a DocType field definition.
# 	"""
# 	return [
# 			{
# 				"label": _("Name"),
# 				"fieldname": "name1",
# 				"fieldtype": "Data",
# 			},
# 			{
# 				"label": _("Roll No"),
# 				"fieldname": "roll_no",
# 				"fieldtype": "Data",
# 			},
# 			{
# 				"label": _("Marks"),
# 				"fieldname": "marks",
# 				"fieldtype": "Data",
# 			},
# 		]
		
# def get_data(filters=None) -> list[list]:
#     """Return data for the report."""

#     query = """
#         SELECT
#             name1,
#             roll_no,
#             marks
#         FROM `tabClass Records`
#     """

#     values = {}

#     if filters and filters.get("roll_no"):
#         query += """
#             WHERE roll_no = %(roll_no)s
#         """

#         values["roll_no"] = filters.get("roll_no")

#     return frappe.db.sql(
#         query,
#         values,
#         as_list=True
#     )
	


import frappe


def execute(filters=None):

    columns = [
        {
            "label": "Name",
            "fieldname": "name1",
            "fieldtype": "Data"
        },
        {
            "label": "Roll No",
            "fieldname": "roll_no",
            "fieldtype": "Int"
        },
        {
            "label": "Marks",
            "fieldname": "marks",
            "fieldtype": "Int"
        }
    ]

    conditions = {}

    if filters and filters.get("marks"):
        conditions["marks"] = [">", filters.get("marks")]

    data = frappe.get_all(
        "Class Records",
        filters=conditions,
        fields=[
            "name1",
            "roll_no",
            "marks"
        ]
    )

    return columns, data