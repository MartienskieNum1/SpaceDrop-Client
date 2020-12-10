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




