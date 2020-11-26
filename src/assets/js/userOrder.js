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
    showOrders();
}

function getOrdersByUser(){
    return apiCall(`users/${getToken()}/orders`, "GET"); // this won't even be necessary if we add a "destination" field to an order
}

function showOrders(){
    // let orders = getOrdersByUser(); // via api call
    const orders = MOCK_ORDERS;
    const containerEarth = document.querySelector("#flightsToEarthContent");
    const containerMars = document.querySelector("#flightsToMarsContent");

    let earthOrders = "";
    let marsOrders = "";

    for (let i = 0; i < orders.length; i++){
        const ORDER = orders[i];
        if(ORDER.userId === getToken()){
            if(ORDER.destination === "earth"){
                earthOrders = fillTableWithContent(earthOrders, ORDER);
            }else if(ORDER.destination === "mars"){
                marsOrders = fillTableWithContent(marsOrders, ORDER);
            }
        }
    }

    containerEarth.innerHTML = tableHeaders + earthOrders;
    containerMars.innerHTML = tableHeaders + marsOrders;
}

function goToOrderDetail(orderId) {
    console.log(orderId);
    setOrderId(orderId.toString());
    window.location.href = "userOrderTracking.html";
}


function fillTableWithContent(container, order){
    let orders = container;
    orders +=`<tr data-row='${order.orderId}'>
                    <td>${order.userId}</td>
                    <td>NAME RECIEVER</td>
                    <td>ADDRESS RECIEVER</td>
                    <td>${order.orderId}</td>
                    <td>${order.statusId}</td>
                    <td>${order.rocketId}</td>
                    <td>${order.rocketId}</td>
                    <td>${order.price}</td>
                    <td><button onclick="goToOrderDetail(${order.orderId})">view more</button></td>
                 </tr>`;
    return orders;
}
