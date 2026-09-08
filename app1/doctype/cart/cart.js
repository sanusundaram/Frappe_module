// // Copyright (c) 2026, sanusha and contributors
// // For license information, please see license.txt

// Copyright (c) 2026, sanusha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Items", {
    quantity(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
        frappe.model.set_value(
            cdt,
            cdn,
            "total",
            row.price * row.quantity
        );
        let old_qty=row.__old_qty ||0;
        let new_qty=row.quantity ||0;
        let diff=new_qty-old_qty;
        frappe.db.get_value("Product",row.product_name,"stock").then(r=>{
            let stock=r.message.stock || 0;
            if(stock<diff&&diff>0){
                frappe.throw("No such quantity");
                
            }
            frappe.db.set_value("Product",row.product_name,"stock",stock-diff);
            row.__old_qty=new_qty;
        })
    },
    total(frm, cdt, cdn) {
        calculate_sub_amount(frm);  
    },
    product_list_remove(frm,cdt,cdn){
        calculate_sub_amount(frm); 
    },
    before_product_list_remove(frm,cdt,cdn){
        let row = frappe.get_doc(cdt, cdn);
        let old_qty=row.__old_qty || row.quantity || 0;
        frappe.db.get_value("Product",row.product_name,"stock").then(r=>{
            let stock=r.message.stock || 0;
            frappe.db.set_value("Product",row.product_name,"stock",stock+old_qty);
        })
    }
});
frappe.ui.form.on("Cart",{
    sub_amount(frm){
        discount(frm);
    },
    balance_amount(frm){
        discount(frm);

    },
    coupon(frm){
        discount(frm);
    },
    refresh(frm){
        if(frm.doc.docstatus==1 ){
            frm.add_custom_button("Payment",()=>{
                frappe.db.get_list("Make Payment",{
                    filters: {cart: frm.doc.name},
                    fields:["enter_amount_to_be_pay"]
                }).then(r=>{
                    let paid=0;
                    r.forEach(row=>{
                        paid+=row.enter_amount_to_be_pay ||0;
                    });
                    let balance=(frm.doc.total_amount||0)-paid;
                    balance = Math.max(balance, 0);
                    frm.set_value("balance_amount", balance);
                    frappe.new_doc("Make Payment",{},doc=>{
                    doc.cart=frm.doc.name,
                    doc.customer_id=frm.doc.customer_id,
                    doc.customer_name=frm.doc.customer_name,
                    doc.mobile_no=frm.doc.phone_no,
                    doc.total_amount=frm.doc.total_amount,
                    doc.balance_amount=balance
                });
                console.log(frm.doc.phone_no);
                console.log(frm.doc.total_amount);
                })
                
            })
    }
    },
    
});
function calculate_sub_amount(frm){
    let total = 0;
    frm.doc.product_list.forEach(row => {
        total += row.total || 0;
        });
    frm.set_value("sub_amount", total);
    frm.set_value("balance_amount",total);
}
function discount(frm){
        let coupon=frm.doc.coupon;
        if (!coupon) {
            frm.set_value("discount_amount", 0);
            frm.set_value("total_amount", frm.doc.sub_amount);
            frm.set_value("balance_amount",frm.doc.sub_amount);
            return;
        }
        frappe.db.get_value("Discount",coupon,
                ["is_active","min_amount","discount_percent"])
        .then(r=>{
            if(!r.message){
                frappe.show_alert("no such discount avaliable");
                frm.set_value("total_amount",frm.doc.sub_amount);
                frm.set_value("balance_amount",frm.doc.sub_amount);
                frm.set_value("discount_amount",0)
            }
            let doc=r.message;
            if(!doc.is_active){
                frappe.show_alert("no such discount avaliable");
                frm.set_value("total_amount",frm.doc.sub_amount);
                frm.set_value("balance_amount",frm.doc.sub_amount);
                frm.set_value("discount_amount",0)
            }
            else{
                if(frm.doc.sub_amount<doc.min_amount){
                    frm.set_value("total_amount",frm.doc.sub_amount)
                    frm.set_value("balance_amount",frm.doc.sub_amount);
                }
                else{
                    let amt=(frm.doc.sub_amount*doc.discount_percent)/100.0;
                    let total=(frm.doc.sub_amount-amt)
                    frm.set_value("discount_amount",amt);
                    frm.set_value("total_amount",total);
                    frm.set_value("balance_amount",total);
                }
            }
        })
    
    
        // if(frm.doc.sub_amount>20000){
        //     frm.doc.discount_amount=2000;
        //     frm.refresh_field("discount_amount");
        // }
        // else if(frm.doc.sub_amount>10000){
        //     frm.doc.discount_amount=1000;
        //     frm.refresh_field("discount_amount");
        // }
        // else if(frm.doc.sub_amount>9000){
        //     frm.doc.discount_amount=100;
        //     frm.refresh_field("discount_amount");
        // }
        // else{
        //     frm.doc.discount_amount = 0;
        //     frm.refresh_field("discount_amount");
        // }
        // frm.set_value("total_amount",frm.doc.sub_amount-(frm.doc.discount_amount||0));
}


frappe.ui.form.on("Cart", {
    refresh(frm) {
        set_workflow_indicator(frm);
    },
    workflow_state(frm) {
        set_workflow_indicator(frm);
    }
});

function set_workflow_indicator(frm) {
    let status = frm.doc.workflow_state;
    if (!status) {
        return;
    }
    if (status === "Pending") {
        frm.page.set_indicator(
            "Pending",
            "red"
        );
    }
    else if (status === "Yet to pay") {
        frm.page.set_indicator(
            "Yet to pay",
            "orange"
        );
    }
    else if (status === "Payment Sucess") {
        frm.page.set_indicator(
            "Payment Sucess",
            "green"
        );
    }
}

frappe.ui.form.on("Cart", {
    refresh(frm){
    if(frm.doc.workflow_state=="Payment Sucess"){
        frm.remove_custom_button("Payment");
    }

}

}); 


frappe.ui.form.on("Cart",{
    phone_no(frm){

        if(frm.doc.phone_no && frm.doc.phone_no.toString().length===10){
            frappe.db.get_value("Customer",
                {phone_no:frm.doc.phone_no},
                "customer_name"
            ).then(r=>{
                if(r.message && r.message.customer_name){
                    frm.set_value("customer_name",r.message.customer_name)
                }
                else{
                    frm.set_df_property("create","hidden",0)
                }
            })
        }
    },
    create(frm){
        let d=new frappe.ui.Dialog({
            title:"Add Customer",
                fields: [
                    {
                        label: 'Customer Name',
                        fieldname: 'customer_name',
                        fieldtype: 'Data'
                    },
                    {
                        label: 'Customer Id',
                        fieldname: 'customer_id',
                        fieldtype: 'Data'
                    },
                    {
                        label: 'Phone No',
                        fieldname: 'phone_no',
                        fieldtype: 'Data',
                        default:frm.doc.phone_no
                    }
                ],
                primary_action_label:"Create",
                primary_action(value){
                    frappe.call({
                        method:"app1.app1.doctype.cart.cart.add_customer",
                        args:{
                            customer_name:value.customer_name,
                            customer_id:value.customer_id,
                            phone_no:value.phone_no
                        },
                        callback:(r=>{
                            if(r.message){
                                frm.set_value("customer_name",r.message.customer_name)
                            }
                            d.hide();
                        })
                    })
                    d.hide();
                }
            });
            d.show();
            frm.set_df_property("create","hidden",1)
    }
})

frappe.ui.form.on("Cart",{
    refresh(frm){
        frm.get_field("product_list").grid.wrapper.find(".grid-add-row").hide();   
        frm.add_custom_button("Add Items",()=>{
            frappe.db.get_list("Product",{
                fields:["name","product_name","price"]
            }
            ).then(products=>{
                let table_data=products.map(product=>({
                    p_name:product.name,
                    p_product_name:product.product_name,
                    p_price:product.price,
                    quantity:1
                }))
                let d=new frappe.ui.Dialog({
                title:"Add Items",
                fields:[
                    {
                        label:"Search",
                        fieldname:"search",
                        fieldtype:"Data",
                        placeholder:"Search Product..."
                    },
                    {
                        fieldname:"items_list",
                        fieldtype:"Table",
                        data:table_data,
                        cannot_add_rows:true,
                        fields:[
                            {
                                fieldname: "select",
                                fieldtype: "Check",
                                in_list_view: 1
                            },
                            {
                                fieldname:"p_name",
                                fieldtype:"Data",
                                label:"Name",
                                read_only:1,
                                in_list_view:1,
                                reqd:1
                            },
                            {
                                fieldname:"p_product_name",
                                fieldtype:"Data",
                                label:"Product Name",
                                read_only:1,
                                in_list_view:1,
                                reqd:1
                            },
                            {
                                fieldname:"p_price",
                                fieldtype:"Data",
                                label:"Price",
                                read_only:1,
                                in_list_view:1,
                                reqd:1
                            },
                            {
                                fieldname:"quantity",
                                fieldtype:"Int",
                                label:"Quantity",
                                in_list_view:1,
                                reqd:1
                            },
                        ]
                }],
                primary_action_label:"ADD",
                primary_action(values){
                    values.items_list.forEach(item=>{
                        if(item.select){
                            let existing_row = frm.doc.product_list.find(
                            row => row.product === item.p_name
                        );
                        if (existing_row) {
                            existing_row.quantity =
                                (existing_row.quantity || 0) + (item.quantity || 0);
                            existing_row.total =
                                existing_row.price * existing_row.quantity;
                        } else {
                            let row=frm.add_child("product_list")
                            row.product = item.p_name;
                            row.product_name = item.p_product_name;
                            row.price = item.p_price;
                            row.quantity = item.quantity;
                            row.total = row.price * row.quantity;
                        }
                    }
                })
                    calculate_sub_amount(frm);
                    frm.refresh_field("product_list")
                    d.hide();
                }
            });
            
            d.show();
            let search = d.get_field("search");
            let table = d.get_field("items_list");
            search.$input.on("input", function () {
                let text = $(this).val().toLowerCase();
                let filtered_data = table_data.filter(item => {
                    return (
                        item.p_name.toLowerCase().includes(text) ||
                        item.p_product_name.toLowerCase().includes(text)
                    );
                });
                table.df.data = filtered_data;
                table.refresh();
            });
            d.$wrapper.find(".grid-row-check").hide();
            d.$wrapper.find(".grid-row-check").closest(".grid-row").find("> .grid-static-col").first().hide();
            })
            
           
        })
    }

})

// frappe.ui.form.on("Cart", {
//     refresh(frm){
//         frm.add_custom_button("Add Item",function(){
//             frappe.db.get_list("Product",{
//                 fields:[
//                     "name",
//                     "product_name",
//                     "price"
//                 ],
//                 limit_page_length: 0
//             }).then(products=>{
//                 let html=`
//                     <div style="margin-bottom:10px;">
//                         <input
//                             type="text"
//                             class="form-control product-search"
//                             placeholder="Search Product">
//                     </div>
//                     <div style="max-height:400px;overflow-y:auto;">
//                         <table class="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th style="width:50px;">Select</th>
//                                     <th>Product</th>
//                                     <th>Price</th>
//                                     <th style="width:120px;">Quantity</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                 `;
//                 products.forEach(product=>{
//                     html+=`
//                         <tr>
//                             <td>
//                                 <input
//                                     type="checkbox"
//                                     class="product-check"
//                                     data-name="${product.name}">
//                             </td>
//                             <td>
//                                 ${product.product_name || product.name}
//                             </td>
//                             <td>
//                                 ${product.price || 0}
//                             </td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     class="form-control product-qty"
//                                     data-name="${product.name}"
//                                     min="1"
//                                     value="1">
//                             </td>
//                         </tr>
//                     `;
//                 });
//                 html+=`
//                             </tbody>
//                         </table>
//                     </div>
//                 `;
//                 let d=new frappe.ui.Dialog({
//                     title:"Add Items",
//                     fields:[
//                         {
//                             fieldname:"items_html",
//                             fieldtype:"HTML"
//                         }
//                     ],
//                     primary_action_label:"Add",
//                     primary_action(){
//                         let selected=[];
//                         d.$wrapper
//                             .find(".product-check:checked")
//                             .each(function(){
//                                 let product_name=$(this).data("name");
//                                 let qty_input=d.$wrapper
//                                     .find('.product-qty[data-name="' + product_name + '"]');
//                                 let quantity=parseFloat(qty_input.val()) || 0;
//                                 if(quantity<=0){
//                                     frappe.throw(
//                                         "Please enter quantity for selected product"
//                                     );
//                                 }
//                                 selected.push({
//                                     product_name:product_name,
//                                     quantity:quantity
//                                 });
//                             });
//                         if(selected.length===0){
//                             frappe.msgprint(
//                                 "Please select at least one product"
//                             );
//                             return;
//                         }
//                         selected.forEach(item=>{
//                             let existing_row=null;
//                             frm.doc.product_list.forEach(row=>{
//                                 if(row.product_name==item.product_name){
//                                     existing_row=row;
//                                 }
//                             });
//                             if(existing_row){
//                                 frappe.model.set_value(
//                                     existing_row.doctype,
//                                     existing_row.name,
//                                     "quantity",
//                                     (existing_row.quantity || 0) + item.quantity
//                                 );
//                             }
//                             else{
//                                 let row=frm.add_child("product_list");
//                                 row.product_name=item.product_name;
//                                 row.quantity=item.quantity;
//                                 frappe.db.get_value(
//                                     "Product",
//                                     item.product_name,
//                                     "price"
//                                 ).then(r=>{
//                                     row.price=r.message.price || 0;
//                                     row.total=
//                                         row.price * row.quantity;
//                                     frm.refresh_field("product_list");
//                                 });
//                             }
//                         });
//                         frm.refresh_field("product_list");
//                         d.hide();
//                     }
//                 });
//                 d.fields_dict.items_html.$wrapper.html(html);
//                 d.show();
//             });
//         });
//     }
// });