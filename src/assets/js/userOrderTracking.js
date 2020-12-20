"use strict";

onApiUrlLoaded(userOrderTrackingInit);

const tableHeaders ="<tr>" +
    "            <th scope=\"col\">Address:</th>" +
    "            <th scope=\"col\">Ordernr:</th>" +
    "            <th scope=\"col\">Orderstatus:</th>" +
    "            <th scope=\"col\">Departure:</th>" +
    "            <th scope=\"col\">Arrival:</th>" +
    "            <th scope=\"col\">Price:</th>" +
    "            <th scope=\"col\">Dimensions:</th>" +
    "            <th scope=\"col\">Weight:</th>" +
    "        </tr>";

function userOrderTrackingInit(){
    showOrderdetails(getOrderId());
    document.querySelector("#toUserInfo").addEventListener("click", openUserInfo);
    document.querySelector("#toUserOrders").addEventListener("click", openUserOrders);
    document.querySelector("#toUserOrdersPast").addEventListener("click", openUserOrdersPast);
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
}

function openUserOrders() {
    window.location.href= "userOrders.html";
}

function openUserInfo() {
    window.location.href= "userInfo.html";
}

function openUserOrdersPast() {
    window.location.href = "userOrdersPast.html";
}

function showOrderdetails(orderId) {
    getOrdersUser().then(function (orders) {
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].orderId.toString() === orderId.toString()) {
                getRockets().then(function (rockets) {
                    for (let y = 0; y < rockets.length; y++) {
                        if (orders[i].rocketId.toString() === rockets[y].id.toString()) {
                            fillInDetails(orders[i], rockets[y]);
                            showProgression(orders[i].statusId);
                        }
                    }
                });
            }
        }
    });
}

function fillInDetails(order, flight){
    const CONTAINER_MARS = document.querySelector("#orderInfo");
    const ORDER_DETAILS = `<tr>
            <td>${order.address.planet} ${order.address.countryOrColony} ${order.address.cityOrDistrict} ${order.address.street} ${order.address.number}</td>
            <td>${order.orderId}</td>
            <td>${order.status}</td>
            <td>${flight.departure}</td>
            <td>${flight.arrival}</td>
            <td>${order.cost}</td>
            <td>${order.width}cm x ${order.depth}cm x ${order.height}cm</td>
            <td>${order.mass} kg</td>
        </tr>`;
    CONTAINER_MARS.innerHTML = tableHeaders + ORDER_DETAILS;
    const TODAY = new Date();
    const DATE = TODAY.getFullYear()+35+'-'+(TODAY.getMonth()+1)+'-'+TODAY.getDate();
    const PROGRESSION = (new Date(DATE)-new Date(flight.departure)) / (new Date(flight.arrival)-new Date(flight.departure));
    initCanvas(PROGRESSION,flight.departLocation);


}
