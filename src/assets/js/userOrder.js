
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
let earthOrders = tableHeaders;
let marsOrders = tableHeaders;

function userOrderInit(){
    console.log(getUserId());
    showOrders();
    document.querySelector("#toUserInfo").addEventListener("click", openUserInfo);
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
}

function openUserInfo() {
    window.location.href= "userInfo.html";
}


function showOrders(){
    getOrdersUser().then(function (orders) {
        for (let i = 0; i < orders.length; i++){
            const ORDER = orders[i];
            getRockets().then(response => {
                showRockets(response, ORDER);
            });
        }
    });

}

function goToOrderDetail(orderId) {
    setOrderId(orderId.toString());
    window.location.href = "userOrderTracking.html";
}


function fillTableWithContent(container, order, rocket){
    return `<tr data-row='${order.orderId}'>
                    <td>${order.address}</td>
                    <td>${order.orderId}</td>
                    <td>${order.status}</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${order.cost}</td>
                    <td><button onclick="goToOrderDetail(${order.orderId})">view more</button></td>
                 </tr>`;
}

function showRockets(rockets,ORDER) {
    for (let x = 0; x < rockets.length; x++){
        if(ORDER.rocketId.toString()===rockets[x].id.toString() && rockets[x].departLocation.toString() === "Mars") {
            earthOrders += fillTableWithContent(earthOrders, ORDER, rockets[x]);
        }else if(ORDER.rocketId.toString()===rockets[x].id.toString() && rockets[x].departLocation === "Earth") {
            marsOrders += fillTableWithContent(marsOrders, ORDER, rockets[x]);
        }
    }
    containerEarth.innerHTML = marsOrders;
    containerMars.innerHTML = earthOrders;
}
