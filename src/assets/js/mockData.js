function getUserOrdersMock() {
    return [
            {
                orderId : "1",
                userId: "Jan jansens",
                rocketId: 456464,
                statusId: 4,
                mass: 6,
                width: 2,
                height: 2,
                depth: 400,
                price: 600
            },
            {
                orderId: 2,
                userId: "Jan jansens",
                rocketId: 666664,
                statusId: 2,
                mass: 2,
                width: 2,
                height: 2,
                depth: 400,
                price: 200
            },
            {
                orderId: 3,
                userId: "Jan jansens",
                rocketId: 754874,
                statusId: 1,
                mass: 2,
                width: 2,
                height: 2,
                depth: 400,
                price: 600
            }
        ];
}

function getUserOrderMock() {
    return {
        order: {
            orderId: "1",
            userId: "Jan jansens",
            rocketId: 456464,
            statusId: 4,
            mass: 6,
            width: 2,
            height: 2,
            depth: 400,
            price: 600
        }
    };
}
