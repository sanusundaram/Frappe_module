frappe.listview_settings["Members"] = {
    formatters: {
        category(value) {
            if (value === "Student") {
                return "🔵 Success";
            }

            return value;
        }
    },
    onload(listview) {
        console.log("MEMBERS LIST LOADED");
        console.log(listview);
    }
};

frappe.listview_settings["Members"] = {
    add_fields: ['member_name', 'category'],
    //hide_name_filter: true,
    get_indicator(doc) {

        if (doc.category === "Student") {
            return ["Student", "green", "category,=,Student"];
        }

        return ["Other", "darkgrey", "category,!=,Student"];
    },
    has_indicator_for_draft: false,
    onload(listview) {

        listview.page.add_inner_button("Say Hello", () => {

            frappe.msgprint("Hello from Members List!");

        });

    },

    filters: [
        ['category', '=', 'Student']
    ],//wont work

    // get_form_link(doc) {
    //     return `app/members/${doc.name}`;
    // },//by default epdi work aagumo,same thing happening
    button: {

        show(doc) {
            return doc.category === "Student";
        },

        get_label() {
            return "View";
        },

        get_description(doc) {
            return __("View member {0}", [doc.member_name]);
        },

        action(doc) {
            frappe.set_route("Form", "Members", doc.name);
        },
        primary_action() {
            frappe.msgprint("Members primary action clicked");
        }

    },
    

};
