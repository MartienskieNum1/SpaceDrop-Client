const MOCK_ORDERS = [
    {
        orderId: 1,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 3,
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
        rocketId: 1,
        statusId: 3,
        mass: 8,
        width: 10,
        height: 200,
        depth: 10,
        price: 650,
        destination: "earth"
    },
    {
        orderId: 3,
        userId: "Jeff jefferson",
        rocketId: 1,
        statusId: 3,
        mass: 20,
        width: 2,
        height: 2,
        depth: 300,
        price: 900,
        destination: "earth"
    },
    {
        orderId: 4,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 2,
        mass: 6,
        width: 2,
        height: 2,
        depth: 400,
        price: 600,
        destination: "mars"
    },
    {
        orderId: 5,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 2,
        mass: 8,
        width: 10,
        height: 200,
        depth: 10,
        price: 650,
        destination: "mars"
    },
    {
        orderId: 6,
        userId: "Jeff jefferson",
        rocketId: 1,
        statusId: 2,
        mass: 20,
        width: 2,
        height: 2,
        depth: 300,
        price: 900,
        destination: "mars"
    },
    {
        orderId: 7,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 2,
        mass: 6,
        width: 2,
        height: 2,
        depth: 400,
        price: 600,
        destination: "mars"
    },
    {
        orderId: 8,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 2,
        mass: 8,
        width: 10,
        height: 200,
        depth: 10,
        price: 650,
        destination: "mars"
    },
    {
        orderId: 9,
        userId: "Jeff jefferson",
        rocketId: 1,
        statusId: 2,
        mass: 20,
        width: 2,
        height: 2,
        depth: 300,
        price: 900,
        destination: "mars"
    },
    {
        orderId: 10,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 3,
        mass: 6,
        width: 2,
        height: 2,
        depth: 400,
        price: 600,
        destination: "earth"
    },
    {
        orderId: 11,
        userId: "Jan jansens",
        rocketId: 1,
        statusId: 3,
        mass: 8,
        width: 10,
        height: 200,
        depth: 10,
        price: 650,
        destination: "earth"
    },
    {
        orderId: 12,
        userId: "Jeff jefferson",
        rocketId: 1,
        statusId: 3,
        mass: 20,
        width: 2,
        height: 2,
        depth: 300,
        price: 900,
        destination: "earth"
    }
];


const MOCK_FLIGHTS = [
    {
        rocketId: 1,
        departure: "01/01/2020",
        arrival: "01/02/2020",
        maxMass: 1000,
        maxVolume: 9000,
        availableMass: 180,
        availableVolume: 1500,
        pricePerKg: 95,
        destination: "earth"
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
        destination: "mars"
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
        destination: "mars"
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
        destination: "earth"
    }
];

function getOrderMock() {
    return {
            orderId: "1",
            userId: "Jan jansens",
            rocketId: 456464,
            statusId: 4,
            mass: 6,
            width: 2,
            height: 2,
            depth: 400,
            price: 600,
            orderStatus: 4
    };
}

function getFlightMock() {
    return {
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


