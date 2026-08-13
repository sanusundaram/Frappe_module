# Copyright (c) 2026, sanusha and Contributors
# See license.txt

import frappe
from frappe.tests import IntegrationTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]



class IntegrationTestdummy(IntegrationTestCase):
	"""
	Integration tests for dummy.
	Use this class for testing interactions between multiple components.
	"""
	print("testing")



from frappe.tests import UnitTestCase
class TestDummy(UnitTestCase):

	def test_dummy(self):
		print("Dummy Test")

		doc = frappe.db.get_value(
			"dummy",
			{"reg_no": "215478"},
			["name1"],
			as_dict=True
		)

		if doc.name1 == "ABC":
			print("Pass")