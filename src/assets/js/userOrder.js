document.addEventListener("DOMContentLoaded", userOrderInit);
const tableHeaders = "<tr class=\"tableHeaders\"><th scope=\"col\">From:</th><th scope=\"col\">To:</th><th scope=\"col\">Address:</th><th scope=\"col\">Ordernr:</th><th scope=\"col\">Orderstatus:</th><th scope=\"col\">Departure:</th><th scope=\"col\">Arrival:</th><th scope=\"col\">Price:</th><td></td></tr>";

function userOrderInit(){
    loadInOrders();
}

function loadInOrders() {
    showOrders("earth");
}

function getOrdersByPlanet(planet){
    return apiCall(`orders/${planet}`, "GET"); // for now we will use the MOCK_DATA in the respective file
}

function showOrders(toPlanet /*earth or mars*/){
    // let orders = getOrdersByPlanet(toPlanet); // api call that filters on the planet you pass with it --> let's use mock data first
    let orders = MOCK_DATA;
    let containerEarth = document.querySelector("#flightsToEarthContent");
    let containerMars = document.querySelector("#flightsToMarsContent");

    containerEarth.innerHTML = tableHeaders;
    containerMars.innerHTML = tableHeaders;

    for (let i = 0; i < orders.length; i++){ // same as before but built with template literals
        if(orders[i].destination === "earth"){
            fillTableWithContent(containerEarth, orders[i]);
        }else if(orders[i].destination === "mars"){
            fillTableWithContent(containerMars, orders[i]);
    }
}

function fillTableWithContent(container, order){
    container.innerHTML +=`<tr data-row='" + orders[i].orderId + "'>
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
}
}

/*function showOrdersToEarth(orders) {
    let orderRowsToEarth ="";
    for(const i in orders){
        orderRowsToEarth += "<tr data-row='" + orders[i].orderId + "'>" +
                                "<td>"+orders[i].userId+"</td>" +
                                "<td>NAME RECIEVER</td>" +
                                "<td>ADDRESS RECIEVER</td>" +
                                "<td>"+orders[i].orderId+"</td>" +
                                "<td>"+orders[i].statusId+"</td>" +
                                "<td>"+orders[i].rocketId+"</td>" +
                                "<td>"+orders[i].rocketId+"</td>" +
                                "<td>"+orders[i].price+"</td>" +
                                "<td><button>view more</button></td>" +
                            "</tr>";
        console.log(orderRowsToEarth);
    }
    document.getElementById("flightsToEarthContent").innerHTML = tableHeaders + orderRowsToEarth;
}

function showOrdersToMars(orders){
    let orderRowsToMars="";
    for(const i in orders){
        orderRowsToMars += "<tr data-row='" + orders[i].orderId + "'>" +
                                "<td>"+orders[i].userId+"</td>" +
                                "<td>NAME RECIEVER</td>" +
                                "<td>ADDRESS RECIEVER</td>" +
                                "<td>"+orders[i].orderId+"</td>" +
                                "<td>"+orders[i].statusId+"</td>" +
                                "<td>"+orders[i].rocketId+"</td>" +
                                "<td>"+orders[i].rocketId+"</td>" +
                                "<td>"+orders[i].price+"</td>" +
                                "<td><button>view more</button></td>" +
                            "</tr>";
        console.log(orderRowsToMars);
    }
    document.getElementById("flightsToMarsContent").innerHTML = tableHeaders + orderRowsToMars;
}
*/