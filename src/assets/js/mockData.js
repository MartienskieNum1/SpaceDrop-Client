const MOCK_ORDERS = [
    {
        orderId: "1",
        userId: "Jan jansens",
        rocketId: 456464,
        statusId: 4,
        mass: 6,
        width: 2,
        height: 2,
        depth: 400,
        price: 600,
        destination: "earth"
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
        price: 200,
        destination: "mars"
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
        price: 600,
        destination: "earth"
    },
    {
        orderId: 4,
        userId: "Jan jansens",
        rocketId: 754874,
        statusId: 1,
        mass: 2,
        width: 2,
        height: 2,
        depth: 400,
        price: 600,
        destination: "mars"
    }
];

function getOrderMock() {
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

function getUserMock() {
    return {
        user: {
            firstName: "Jan",
            lastName: "jansens",
            email: "jan.jansens@gmail.com",
            phoneNumber: "+324514616",
            password: "password",
        }
    };
}

