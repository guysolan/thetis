# Stock and Orders

Orders relate to changes in item_quantities.

For a sale, if we order items, the invoice should say 100 items, but the item_quantities quantity_change should be -100.

For a purchase, if we order items the item_quantities quantity_change should be positive for parts we produce or order in but negative for parts we consume.

For a shipment, the item_quantities quantity_change should be the negative where items are shipped from and positive where items are shipped to.

For a stocktake, the item_quantities quantity_change should be the difference between the actual quantity and the expected quantity.

We want to keep the backend logic simple so quantity_change is always the real quantity change

e.g. if we sell 100 items for £10, we record -100 in quantity_change and £1000 in price.

Sale price = quantity_change x item_price x *-1*

e.g. if we buy 100 items for £10, we record -100 in quantity_change and £1000 in price.

Purchase price = quantity_change x item_price

Therefore in the database we save

order_type    quantity_change    price    total
sale          -100               10       1000
purchase      100                10       1000
