from pathlib import Path
import frappe

def after_build():
    print("build completed")

def after_build():
    file=Path("/home/sindhu/bench1/sites/assets/build.txt")
    file.write_text("latest build updated")


def before_tests():
    print("========== BEFORE TESTS ==========")

    frappe.get_doc({
        "doctype": "dummy",
        "name1": "ABC",
        "reg_no": "215478",
        "address": "abc@gmail.com",
        "disease": "cancer"
    }).insert(ignore_if_duplicate=True)

    print("Dummy record created")



def get_sender_details():
    return "Sanusha","santhiyab075@gmail.com"


def send(self, sender, recipient, msg):
    print(sender)
    print(recipient)

    self.update_status("Send")



def boot_session(bootinfo):
    bootinfo["name"]="sanusha"
    bootinfo["company"]="tridots"