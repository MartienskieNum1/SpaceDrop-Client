
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
    console.log(getUserId());
    showOrders();
    document.querySelector("#toUserInfo").addEventListener("click", openUserInfo);
    document.querySelector("#toUserOrdersPast").addEventListener("click", openUserOrdersPast);
    document.querySelector("#toUserOrders").addEventListener("click", openUserOrdersNew);
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
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
    getRockets().then(response => {
        getOrdersUser().then(function (orders) {
        for (let i = 0; i < orders.length; i++){
            console.log(orders);
            const ORDER = orders[i];
            showRockets(response, ORDER,tableHeaders);
        }
    });
    });

}

function goToOrderDetail(orderId) {
    setOrderId(orderId.toString());
    window.location.href = "UserOrderTracking.html";
}


function fillTableWithContent(container, order, rocket){
    return `<tr data-row='${order.orderId}'>
                    <td>${order.address.planet} ${order.address.countryOrColony} ${order.address.cityOrDistrict} ${order.address.street} ${order.address.number}</td>
                    <td>${order.orderId}</td>
                    <td>${order.status}</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${order.cost}</td>
                    <td><button onclick="goToOrderDetail(${order.orderId})">view more</button></td>
                 </tr>`;
}

