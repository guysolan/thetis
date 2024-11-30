import React from "react";
import { OrderView } from "@/features/orders/types";
const Contact = ({ contact }: { contact: OrderView["to_contact"] }) => {
    return (
        <div>
            <h3>Contact</h3>

            <p>{contact?.name}</p>
            <p className="lowercase">{contact?.email}</p>
            <p className="lowercase">{contact?.phone}</p>
        </div>
    );
};

export default Contact;
