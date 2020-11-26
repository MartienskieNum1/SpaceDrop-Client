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

const MOCK_FLIGHTS = [
    {
        rocketId: 1,
        departure: "01/01/2020",
        arrival: "01/02/2020",
        maxMass: 10,
        maxVolume: 10,
        availableMass: 4,
        availableVolume: 6,
        pricePerKg: 95,
        destination: "earth",
        orders: {
            orderId: "1",
            userId: "Jan jansens",
            rocketId: 1,
            statusId: 4,
            mass: 6,
            width: 2,
            height: 2,
            depth: 400,
            price: 600,
            destination: "earth"
        }
    },
    {
        rocketId: 2,
        departure: "02/01/2020",
        arrival: "02/02/2020",
        maxMass: 10,
        maxVolume: 10,
        availableMass: 4,
        availableVolume: 6,
        pricePerKg: 95,
        destination: "mars",
        orders: {
            orderId: "1",
            userId: "Jan jansens",
            rocketId: 1,
            statusId: 4,
            mass: 6,
            width: 2,
            height: 2,
            depth: 400,
            price: 600,
            destination: "mars"
        }
    },
    {
        rocketId: 3,
        departure: "04/03/2020",
        arrival: "02/04/2020",
        maxMass: 10,
        maxVolume: 10,
        availableMass: 4,
        availableVolume: 6,
        pricePerKg: 95,
        destination: "mars",
        orders: {
            orderId: "1",
            userId: "Jan jansens",
            rocketId: 1,
            statusId: 4,
            mass: 6,
            width: 2,
            height: 2,
            depth: 400,
            price: 600,
            destination: "mars"
        }
    },
    {
        rocketId: 4,
        departure: "05/03/2020",
        arrival: "03/04/2020",
        maxMass: 10,
        maxVolume: 10,
        availableMass: 4,
        availableVolume: 6,
        pricePerKg: 95,
        destination: "earth",
        orders: {
            orderId: "1",
            userId: "Jan jansens",
            rocketId: 1,
            statusId: 4,
            mass: 6,
            width: 2,
            height: 2,
            depth: 400,
            price: 600,
            destination: "earth"
        }
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


