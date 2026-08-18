import frappe

frappe.utils.logger.set_log_level("DEBUG")

logger = frappe.logger(
    "api",
    allow_site=True,
    file_count=50
)


@frappe.whitelist()
def update(value):
    user = frappe.session.user

    logger.info(
        f"{user} accessed counter_app.update with value={value}"
    )

    logger.debug(
        f"Received value: {value}"
    )

    return {
        "message": "Counter updated",
        "value": value
    }