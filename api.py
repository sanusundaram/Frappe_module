# import frappe
# from frappe.model.document import Document
# '''def custom_print():
#     frappe.msgprint("hello this is sanu")'''
# @frappe.whitelist()
# def get_leave_details():

#     leaveapp=frappe.qb.DocType("Leave Application")
#     employee=frappe.qb.DocType("Employee")
import frappe
# import random


# @frappe.whitelist()
# def generate_random_value():

#     value = random.randint(1, 100)

#     print("Generated value:", value)

#     return value


@frappe.whitelist(allow_guest=True)
@frappe.rate_limiter.rate_limit(limit=5)
def limited_greeting():
    logger = frappe.logger()
    logger.info("Endpoint called.")

    frappe.response["message"] = "Hello, Rate Limited World!"



#     query=(frappe.qb.from_(leaveapp).
#     inner_join(employee).
#     on(leaveapp.employee==employee.employee_name).
#     select( employee.name,
#     employee.employee_name,
#     employee.email,
#     leaveapp.leave_type))


#     result= query.run(as_dict=True)


#     if not result:
#         return "no record"


#     doc=frappe.get_doc("Employee",result[0]["name"])
#     doc.is_active=1
#     doc.save(ignore_permissions=True)

#     for row in result:
#         frappe.db.set_value(
#             "Employee",row["name"],"mobile_number","9843816532"
#         )

#     frappe.db.commit()
#     return result









# import frappe


# def after_commit_action():
#     frappe.logger().info("Employee transaction completed successfully")

# @frappe.whitelist()
# def create_employee():

#     doc = frappe.get_doc({
#         "doctype": "Employee",
#         "employee_name": "Transaction Test",
#         "employee_id": "EMP-TXN-001",
#         "email": "transaction@example.com"
#     })

#     doc.insert()

#     return {
#         "success": True,
#         "message": "Employee created successfully",
#         "name": doc.name
#     }



# import frappe


# @frappe.whitelist()
# def send_realtime_message(message):

#     frappe.publish_realtime(
#         "my_custom_event",
#         {
#             "message": message
#         }
#     )

#     return {
#         "success": True,
#         "message": "Message sent successfully"
#     }




# import frappe
# import time


# @frappe.whitelist()
# def test_progress():

#     for i in range(0, 101, 10):

#         frappe.publish_progress(
#             i,
#             title="Employee Processing",
#             description=f"Processing... {i}% completed"
#         )

#         time.sleep(1)

#     return {
#         "success": True,
#         "message": "Employee processing completed"
#     }