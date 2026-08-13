import frappe
import time


def my_background_job():

    print("Background job started")

    time.sleep(5)

    print("Background job finished")


@frappe.whitelist()
def start_background_job():

    frappe.enqueue(
        "app1.backgroundjob.my_background_job",
        queue="short"
    )

    return "Background job has been added to the queue"