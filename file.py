# import frappe
# def before_write(*args, **kwargs):
#     frappe.throw("Before Write Hook Executed")
# #def write_file():
#      #frappe.throw("write File Hook Executed")
#     # 1. Receive file
#     # 2. Upload to AWS S3
#     # 3. Get file URL
#     # 4. Return URL to Frappe

# def delete_file(*args, **kwargs):
#     frappe.throw("Delete File Hook Executed")


def resolve_path(path):
    # print("Path received:", path)

    if path.startswith("employee/"):
        emp = path.split("/")[1]
        return f"employee?employee={emp}"

    return path