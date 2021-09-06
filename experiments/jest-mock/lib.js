import db from "./db.js";
import mail from "./mail.js";


function notifyCustomer(order) {
    const customer = db.getCustomerSync(order.customerId);

    mail.send(customer.email,'Order was placed successfully!');
}


export default {
    notifyCustomer
};