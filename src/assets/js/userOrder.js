document.addEventListener("DOMContentLoaded", userOrderInit);
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
    let orders = MOCK_ORDERS;
    let containerEarth = document.querySelector("#flightsToEarthContent");
    let containerMars = document.querySelector("#flightsToMarsContent");

    let earthOrders = "";
    let marsOrders = "";

    for (let i = 0; i < orders.length; i++){
        let order = orders[i];

        if(order.destination === "earth"){
            earthOrders = fillTableWithContent(earthOrders, order);
        }else if(order.destination === "mars"){
            marsOrders = fillTableWithContent(marsOrders, order);
        }
    }

    containerEarth.innerHTML = tableHeaders + earthOrders;
    containerMars.innerHTML = tableHeaders + marsOrders;
}

function fillTableWithContent(container, order){
    container +=`<tr data-row='${order.orderId}'>
                    <td>${order.userId}</td>
                    <td>NAME RECIEVER</td>
                    <td>ADDRESS RECIEVER</td>
                    <td>${order.orderId}</td>
                    <td>${order.statusId}</td>
                    <td>${order.rocketId}</td>
                    <td>${order.rocketId}</td>
                    <td>${order.price}</td>
                    <td><button>view more</button></td>
                 </tr>`;
    return container;
}