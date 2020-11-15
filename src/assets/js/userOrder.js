document.addEventListener("DOMContentLoaded", userOrderInit);
const tableHeaders = "<tr class=\"tableHeaders\"><th scope=\"col\">From:</th><th scope=\"col\">To:</th><th scope=\"col\">Address:</th><th scope=\"col\">Ordernr:</th><th scope=\"col\">Orderstatus:</th><th scope=\"col\">Departure:</th><th scope=\"col\">Arrival:</th><th scope=\"col\">Price:</th><td></td></tr>";

function userOrderInit(){
    loadInOrders();

}

function loadInOrders() {
    const orders = getUserOrdersMock();
    //split up orders based on destination
    showOrdersToEarth(orders);
    showOrdersToMars(orders);
}

function showOrdersToEarth(orders) {
    let orderRowsToEarth ="";
    for(const i in orders){
        orderRowsToEarth += "<tr data-row='" + orders[i].orderId + "'><td>"+orders[i].userId+"</td><td>NAME RECIEVER</td><td>ADDRESS RECIEVER</td><td>"+orders[i].orderId+"</td><td>"+orders[i].statusId+"</td><td>"+orders[i].rocketId+"</td><td>"+orders[i].rocketId+"</td><td>"+orders[i].price+"</td><td><button>view more</button></td></tr>";
        console.log(orderRowsToEarth);
    }
    document.getElementById("flightsToEarthContent").innerHTML = tableHeaders + orderRowsToEarth;
}

function showOrdersToMars(orders){
    let orderRowsToMars="";
    for(const i in orders){
        orderRowsToMars += "<tr data-row='" + orders[i].orderId + "'><td>"+orders[i].userId+"</td><td>NAME RECIEVER</td><td>ADDRESS RECIEVER</td><td>"+orders[i].orderId+"</td><td>"+orders[i].statusId+"</td><td>"+orders[i].rocketId+"</td><td>"+orders[i].rocketId+"</td><td>"+orders[i].price+"</td><td><button>view more</button></td></tr>";
        console.log(orderRowsToMars);
    }
    document.getElementById("flightsToMarsContent").innerHTML = tableHeaders + orderRowsToMars;
}
