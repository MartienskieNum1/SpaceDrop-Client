
"use strict";

onApiUrlLoaded(userOrderInit);

const tableHeaders = `<tr class=\"tableHeaders\">
                        <th scope="col">From:</th>
                        <th scope="col">To:</th>
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
}

function openUserInfo() {
    window.location.href= "userInfo.html";

}


function showOrders(){
    const userId = getUserId();
    const orders = getOrders();
    console.log(orders);
    const containerEarth = document.querySelector("#flightsToEarthContent");
    const containerMars = document.querySelector("#flightsToMarsContent");

    let earthOrders = "";
    let marsOrders = "";

    for (let i = 0; i < orders.length; i++){
        const ORDER = orders[i];
        if(ORDER.userId ===userId){
            if(ORDER.destination === "earth"){
                earthOrders = fillTableWithContent(earthOrders, ORDER, getRocketById(ORDER.rocketId));
            }else if(ORDER.destination === "mars"){
                marsOrders = fillTableWithContent(marsOrders, ORDER, getRocketById(ORDER.rocketId));
            }
        }
    }

    containerEarth.innerHTML = tableHeaders + earthOrders;
    containerMars.innerHTML = tableHeaders + marsOrders;
}

function goToOrderDetail(orderId) {
    setOrderId(orderId.toString());
    window.location.href = "userOrderTracking.html";
}


function fillTableWithContent(container, order, rocket){
    let orders = container;
    orders +=`<tr data-row='${order.orderId}'>
                    <td>${order.userId}</td>
                    <td>NAME RECIEVER</td>
                    <td>ADDRESS RECIEVER</td>
                    <td>${order.orderId}</td>
                    <td>${order.statusId}</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${order.price}</td>
                    <td><button onclick="goToOrderDetail('${order.orderId}')">view more</button></td>
                 </tr>`;
    return orders;
}
