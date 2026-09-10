# Copyright (c) 2026, sanusha and Contributors
# See license.txt

# import frappe
from frappe.tests import IntegrationTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]



class IntegrationTestarticle(IntegrationTestCase):
	"""
	Integration tests for article.
	Use this class for testing interactions between multiple components.
	"""

	pass

import frappe
from frappe.tests.utils import FrappeTestCase


class TestArticle(FrappeTestCase):

    def test_article_creation(self):
        article = frappe.get_doc({
            "doctype": "article",
            "article_name": "My First Test",
            "status": "Published"
        })

        article.insert()

        self.assertEqual(article.article_name, "My First Test")
        self.assertTrue(frappe.db.exists("article", article.name))