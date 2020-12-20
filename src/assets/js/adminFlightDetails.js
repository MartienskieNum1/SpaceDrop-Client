"use strict";
onApiUrlLoaded(adminFlightOverviewInit);

function adminFlightOverviewInit() {
    const FLIGHT_ID = getFlightId();
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
    getRockets().then(function(rockets){
        let rocket = null;
        for (let i = 0; i < rockets.length; i++) {
            const SELECTED_ROCKET = rockets[i];
            if(SELECTED_ROCKET.id.toString()===FLIGHT_ID.toString()){
                rocket = SELECTED_ROCKET;
            }
        }
        if(rocket!==null){
            showDetails(rocket);
            showOrdersRocket(rocket);
        }
    });
}

function showOrdersRocket(rocket) {
    const CONTAINER = document.querySelector("#flightOrders");
    console.log(getUsers());
    getOrders().then(function(orders){
        let ordersRocket ="";
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].rocketId.toString() === rocket.id.toString()) {
                ordersRocket += `<tr data-row='${orders[i].orderId}'>
                                <td>${orders[i].orderId}</td>
                                <td>${orders[i].userId}</td>
                                <td>${orders[i].address.street} ${orders[i].address.number} ${orders[i].address.cityOrDistrict} ${orders[i].address.countryOrColony}</td>
                                <td>${orders[i].width} x ${orders[i].depth} x ${orders[i].height} m3</td>
                                <td>${orders[i].mass}kg</td>
                                <td>${orders[i].status}</td>
                                <td><button>delete</button></td>
                                </tr>`;
                CONTAINER.innerHTML = getTableHeader2() + ordersRocket;
            }
        }
    });
}

function buildReturnAddress(user){
    return `${user.address.street} ${user.address.number} ${user.address.cityOrDistrict} ${user.address.countryOrColony} ${user.address.planet}`;
}

function showDetails(rocket) {
    const CONTAINER_DETAILS = document.querySelector("#flightsContent");
    CONTAINER_DETAILS.innerHTML = getTableHeader() + `<tr data-row='${rocket.id}'>
                    <td>${rocket.id}</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${rocket.maxMass-rocket.availableMass}/${rocket.maxMass} kg</td>
                    <td>${rocket.maxVolume-rocket.availableVolume}/${rocket.maxVolume} m3</td>
                </tr>`;
}
