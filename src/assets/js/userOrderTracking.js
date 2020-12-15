"use strict";

onApiUrlLoaded(userOrderTrackingInit);

const tableHeaders ="<tr>" +
    "            <th scope=\"col\">From:</th>" +
    "            <th scope=\"col\">To:</th>" +
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
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
}

function openUserOrders() {
    window.location.href= "userOrders.html";

}

function openUserInfo() {
    window.location.href= "userInfo.html";

}

function showOrderdetails(orderId) {
    const order = getOrderMock();
    const flight = getFlightMock();
    fillInDetails(order, flight);
    showProgression(order.orderStatus);

}

function showProgression(progressionLevel) {
    for(let i=1;i<=5;i++){
        if(progressionLevel>=i){
            document.getElementById(i.toString()).classList.add("active");
        }
        else {
            document.getElementById(i.toString()).classList.remove("active");
        }
    }
}

function fillInDetails(order, flight){
    const containerMars = document.querySelector("#orderInfo");
    const orderDetails = `<tr>
            <td>${order.userId}</td>
            <td>RECIEVER</td>
            <td>ADRESS</td>
            <td>${order.orderId}</td>
            <td>${order.orderStatus}</td>
            <td>${flight.departure}</td>
            <td>${flight.arrival}</td>
            <td>${order.price}</td>
            <td>${order.width}mm x ${order.depth}mm x ${order.height}mm</td>
            <td>${order.mass} kg</td>
        </tr>`;
    containerMars.innerHTML = tableHeaders + orderDetails;

}
