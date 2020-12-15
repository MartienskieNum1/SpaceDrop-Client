"use strict";
onApiUrlLoaded(adminFlightOverviewInit);

function adminFlightOverviewInit() {
    const flightId = getFlightId();
    getRockets().then(function(rockets){  // TODO: use getRocketById
        let rocket =null;
        for (let i = 0; i < rockets.length; i++) {
            const selectedRocket = rockets[i];
            if(selectedRocket.id.toString()===flightId.toString()){
                rocket = selectedRocket;

            }
        }
        if(rocket!==null){
            showDetails(rocket);
            showOrdersRocket(rocket);
        }
    });
}

function showOrdersRocket(rocket) {
    const containerOrders = document.querySelector("#flightOrders");
    console.log(getUsers());
    getOrders().then(function(orders){
        let ordersRocket ="";
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].rocketId.toString() === rocket.id.toString()) {
                getUsers().then(function (users) {
                    for (let x = 0; x < users.length; x++) {
                        if (users[x].id.toString() === orders[i].userId.toString()) {
                            const name = users[x].firstName + " " + users[x].lastName;
                            const returnAddress = buildReturnAddress(users[x]);
                            ordersRocket += `<tr data-row='${orders[i].orderId}'>
                                <td>${orders[i].orderId}</td>
                                <td>${name}</td>
                                <td>RECEIVER</td>
                                <td>ADDRESS</td>
                                <td>${returnAddress}</td>
                                <td>${orders[i].status}</td>
                                <td><button>delete</button></td>
                                </tr>`;
                        }
                    }
                    containerOrders.innerHTML = getTableHeader2() + ordersRocket;
                });
            }
        }
    });
}

function buildReturnAddress(user){
    return `${user.address.street} ${user.address.number} ${user.address.cityOrDistrict} ${user.address.countryOrColony} ${user.address.planet}`;
}

function showDetails(rocket) {
    const containerDetails = document.querySelector("#flightsContent");
    containerDetails.innerHTML = getTableHeader() + `<tr data-row='${rocket.id}'>
                    <td>${rocket.id}</td>
                    <td>STATUS</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${rocket.maxMass-rocket.availableMass}/${rocket.maxMass} kg</td>
                    <td>${rocket.maxVolume-rocket.availableVolume}/${rocket.maxVolume} m3</td>
                </tr>`;
}
