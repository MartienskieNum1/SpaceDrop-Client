"use strict";

onApiUrlLoaded(uuidOrderTrackingInit);

const QUERY = window.location.search;
const PARAMS = new URLSearchParams(QUERY);
const UUID = PARAMS.get("uuid");

const ORDER = document.querySelector("#orderInfo");

const TABLE_HEADERS =
    `<tr>
            <th scope="col">Address:</th>
            <th scope="col">Ordernr:</th>
            <th scope="col">Orderstatus:</th>
            <th scope="col">Departure:</th>
            <th scope="col">Arrival:</th>
            <th scope="col">Dimensions:</th>
            <th scope="col">Weight:</th>
     </tr>`;

function uuidOrderTrackingInit() {
    getOrderByUuid(UUID).then(order => {
        getRockets().then(rockets => {
            for (let i = 0; i < rockets.length; i++) {
                if (rockets[i].id === order.rocketId) {
                    showShortDetails(order, rockets[i]);
                    showProgression(order.statusId);
                    const TODAY = new Date();
                    const DATE = TODAY.getFullYear()+35+'-'+(TODAY.getMonth()+1)+'-'+TODAY.getDate();
                    const PROGRESSION = (new Date(DATE)-new Date(rockets[i].departure)) / (new Date(rockets[i].arrival)-new Date(rockets[i].departure));
                    console.log(PROGRESSION);
                    init(PROGRESSION,rockets[i].departLocation);
                }
            }
        });
    });
}

function showShortDetails(order, flight) {
    const TABLE_ORDER =
        `<tr>
            <td>${order.address.planet} ${order.address.countryOrColony} ${order.address.cityOrDistrict} ${order.address.street} ${order.address.number}</td>
            <td>${order.orderId}</td>
            <td>${order.status}</td>
            <td>${flight.departure}</td>
            <td>${flight.arrival}</td>
            <td>${order.width}cm x ${order.depth}cm x ${order.height}cm</td>
            <td>${order.mass} kg</td>
        </tr>
`;

    ORDER.innerHTML = TABLE_HEADERS + TABLE_ORDER;
}
