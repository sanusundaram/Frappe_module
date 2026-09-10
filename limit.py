import frappe
import random



@frappe.whitelist(allow_guest=True)
@frappe.rate_limiter.rate_limit(limit=5)
def limited_greeting():
    logger = frappe.logger()
    logger.info("Endpoint called.")

    frappe.response["message"] = "Hello, Rate Limited World!"