
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
    const containerEarth = document.querySelector("#flightsToEarthContent");
    const containerMars = document.querySelector("#flightsToMarsContent");

    let earthOrders = "";
    let marsOrders = "";

    getOrdersUser().then(function (orders) {
        for (let i = 0; i < orders.length; i++){
            console.log(orders[i]);
            const ORDER = orders[i];
            getRockets().then(function (rockets) {
                for (let x = 0; x < rockets.length; x++){
                    if(ORDER.rocketId.toString()===rockets[x].id.toString()){
                        if(rockets[x].departLocation === "Mars"){
                            marsOrders += fillTableWithContent(earthOrders, ORDER, rockets[x]);
                        }else if(rockets[x].departLocation === "Earth"){
                            earthOrders += fillTableWithContent(marsOrders, ORDER, rockets[x]);
                        }
                    }
                }
                containerEarth.innerHTML = tableHeaders + earthOrders;
                containerMars.innerHTML = tableHeaders + marsOrders;
            });
        }
    });
}

function goToOrderDetail(orderId) {
    setOrderId(orderId.toString());
    window.location.href = "userOrderTracking.html";
}


function fillTableWithContent(container, order, rocket){
    console.log(order.address);
    return `<tr data-row='${order.orderId}'>
                    <td>${order.address}</td>
                    <td>${order.orderId}</td>
                    <td>${order.statusId}</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${order.cost}</td>
                    <td><button onclick="goToOrderDetail(${order.orderId})">view more</button></td>
                 </tr>`;
}
