
"use strict";

onApiUrlLoaded(userOrderInit);

const tableHeaders = `<tr class=\"tableHeaders\">
                        <th scope="col">Address:</th>
                        <th scope="col">Ordernr:</th>
                        <th scope="col">Orderstatus:</th>
                        <th scope="col">Departure:</th>
                        <th scope="col">Arrival:</th>
                        <th scope="col">Price:</th>
                        <td></td>
                    </tr>`;

const containerEarth = document.querySelector("#flightsToEarthContent");
const containerMars = document.querySelector("#flightsToMarsContent");

function userOrderInit(){
    showOrders();
    document.querySelector("#toUserInfo").addEventListener("click", openUserInfo);
    document.querySelector("#toUserOrdersPast").addEventListener("click", openUserOrdersPast);
    document.querySelector("#toUserOrders").addEventListener("click", openUserOrdersNew);
    document.querySelector("#toUserOrdersCanceled").addEventListener("click", openUserOrdersCanceled);
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
}

function openUserOrdersCanceled() {
    window.location.href= "userOrderCanceled.html";
}

function openUserInfo() {
    window.location.href= "userInfo.html";
}

function openUserOrdersNew() {
    window.location.href = "userOrders.html";
}

function openUserOrdersPast() {
    window.location.href = "userOrdersPast.html";
}


function showOrders(){
    getOrdersUser().then(function (orders) {
        getRockets().then(response => {
            showRockets(response, orders,tableHeaders);
        });
    });
}

function goToOrderDetail(orderId) {
    setOrderId(orderId.toString());
    window.location.href = "UserOrderTracking.html";
}


function fillTableWithContent(container, order, rocket){
    let cancelbutton = '<td></td>';
    if(order.status === "Processing"){
        cancelbutton = '<td><button>cancel order</button></td>';
    }
    return `<tr data-row='${order.orderId}'>
                    <td>${order.address.planet} ${order.address.countryOrColony} ${order.address.cityOrDistrict} ${order.address.street} ${order.address.number}</td>
                    <td>${order.orderId}</td>
                    <td>${order.status}</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${order.cost}</td>
                    <td><button onclick="goToOrderDetail(${order.orderId})">view more</button></td>
                    `+cancelbutton+`
                 </tr>`;
}

