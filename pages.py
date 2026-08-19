# def context_404(context):
#     print("404 Hook Executed")
#     context["my_key"] = "Hello from App1"
#     context["new_key"] = "welcomeeee"


# def context_about(context):
#     print("ABOUT HOOK EXECUTED")
#     context["message"] = "Hello"


import frappe

@frappe.whitelist()
def send_member_update():

    frappe.publish_realtime(
        "member_update",
        10
    )

    return "Realtime event sent"