"use strict";
const tableHeader = '<tr class="tableHeaders"><th scope="col">Flightname:</th><th scope="col">Flightstatus:</th>' +
    '<th scope="col">Departure:</th><th scope="col">Arrival:</th><th scope="col">Cargo:</th>' +
    '<th scope="col">Volume:</th><td></td></tr>';

const tableHeader2= '<tr class="tableHeaders">' +
    '                <th scope="col">Ordernr:</th>'+
    '                <th scope="col">From:</th>' +
    '                <th scope="col">To:</th>' +
    '                <th scope="col">Return:</th>' +
    '                <th scope="col">Address:</th>' +
    '                <th scope="col">Status:</th>' +
    '                <td></td>' +
    '            </tr>';

onApiUrlLoaded(adminFlightOverviewInit);

function adminFlightOverviewInit() {
    const flightId = getFlightId();
    getRockets().then(function(rockets){
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
                    let name = "";
                    let returnAdress ="";
                    for (let x = 0; x < users.length; x++) {
                        if (users[x].id.toString() === orders[i].userId.toString()) {
                            name= users[x].firstName + " " + users[x].lastName;
                            returnAdress= users[x].address.street + " " + users[x].address.number + " " + users[x].address.cityOrDistrict + " " + users[x].address.countryOrColony + " " + users[x].address.planet;
                            ordersRocket += `<tr data-row='${orders[i].orderId}'>
                                <td>${orders[i].orderId}</td>
                                <td>${name}</td>
                                <td>RECEIVER</td>
                                <td>${returnAdress}</td>
                                <td>${orders[i].status}</td>
                                <td><button>delete</button></td>
                                </tr>`;
                        }
                    }
                    containerOrders.innerHTML = tableHeader2 + ordersRocket;
                })
            }
        }
    })
}

function showDetails(rocket) {
    const containerDetails = document.querySelector("#flightsContent");
    containerDetails.innerHTML = tableHeader + `<tr data-row='${rocket.id}'>
                    <td>${rocket.id}</td>
                    <td>STATUS</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${rocket.maxMass-rocket.availableMass}/${rocket.maxMass} kg</td>
                    <td>${rocket.maxVolume-rocket.availableVolume}/${rocket.maxVolume} m3</td>
                </tr>`;
}
