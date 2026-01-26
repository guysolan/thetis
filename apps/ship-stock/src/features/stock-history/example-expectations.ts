import dayjs from "dayjs";

const item1 = [
    {
        item_id: 1,
        item_name: "Item 1",
        quantity: 150,
        change: -50,
        address_id: 1,
    },
    {
        item_id: 1,
        item_name: "Item 1",
        quantity: 200,
        change: 200,
        address_id: 1,
    },
    { item_id: 1, item_name: "Item 1", quantity: 0, change: 0, address_id: 1 },
];

const item2 = [
    { item_id: 2, item_name: "Item 2", quantity: 6, change: 4, address_id: 2 },
    { item_id: 2, item_name: "Item 2", quantity: 2, change: 2, address_id: 2 },
    { item_id: 2, item_name: "Item 2", quantity: 0, change: 0, address_id: 2 },
];

const item3 = {
    item_id: 3,
    item_name: "Item 3",
    quantity: 10,
    change: 0,
    address_id: 2,
};

const orders = [
    {
        order_id: 1,
        order_date: dayjs().subtract(1, "day").toISOString(),
        items: [item1[0], item2[0]],
    },
    {
        order_id: 2,
        order_date: dayjs().subtract(2, "day").toISOString(),
        items: [item1[1], item2[1]],
    },
    {
        order_id: 3,
        order_date: dayjs().subtract(3, "day").toISOString(),
        items: [item1[2], item2[2], item3],
    },
];

const expectedAddress1 = [
    [
        "Date",
        "Item 1 Change",
        "Item 1 Quantity",
        "Item 2 Change",
        "Item 2 Quantity",
    ],
    [
        dayjs().subtract(1, "day").toISOString(),
        item1[0].change,
        item1[0].quantity,
        0,
        0,
    ],
    [
        dayjs().subtract(2, "day").toISOString(),
        item1[1].change,
        item1[1].quantity,
        0,
        0,
    ],
];

const expectedAddress2 = [
    [
        "Date",
        "Item 1 Change",
        "Item 1 Quantity",
        "Item 2 Change",
        "Item 2 Quantity",
        "Item 3 Quantity",
        "Item 3 Change",
    ],
    [
        dayjs().subtract(1, "day").toISOString(),
        0,
        0,
        item2[0].change,
        item2[0].quantity,
        0,
        10,
    ],
    [
        dayjs().subtract(2, "day").toISOString(),
        0,
        0,

        item2[1].change,
        item2[1].quantity,
        0,
        10,
    ],
    [
        dayjs().subtract(3, "day").toISOString(),
        item2[2].quantity,
        item2[2].quantity,
        item1[4],
        0,
        10,
    ],
];
