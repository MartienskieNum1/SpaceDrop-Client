document.addEventListener("DOMContentLoaded", userOrderInit);
let tableHeaders = "<tr class=\"tableHeaders\"><th scope=\"col\">From:</th><th scope=\"col\">To:</th><th scope=\"col\">Address:</th><th scope=\"col\">Ordernr:</th><th scope=\"col\">Orderstatus:</th><th scope=\"col\">Departure:</th><th scope=\"col\">Arrival:</th><th scope=\"col\">Price:</th><td></td></tr>";

function userOrderInit(){
    loadInOrders();

}

function loadInOrders() {


    let ordersMock = {
        "orders": [
            {
                "orderId": "1",
                "userId": "Jan jansens",
                "rocketId": 456464,
                "statusId": 4,
                "mass": 6,
                "width": 2,
                "height": 2,
                "depth": 400,
                "price": 600
            },
            {
                "orderId": 2,
                "userId": "Jan jansens",
                "rocketId": 666664,
                "statusId": 2,
                "mass": 2,
                "width": 2,
                "height": 2,
                "depth": 400,
                "price": 200
            },
            {
                "orderId": 3,
                "userId": "Jan jansens",
                "rocketId": 754874,
                "statusId": 1,
                "mass": 2,
                "width": 2,
                "height": 2,
                "depth": 400,
                "price": 600
            },
        ]
    };



    showOrders(ordersMock.orders);

}

function showOrders(orders) {
    let orderRows = "";
    for(let i in orders){
        orderRows += "<tr data-row='" + orders[i].orderId + "'><td>"+orders[i].userId+"</td><td>NAME RECIEVER</td><td>ADDRESS RECIEVER</td><td>"+orders[i].orderId+"</td><td>"+orders[i].statusId+"</td><td>"+orders[i].rocketId+"</td><td>"+orders[i].rocketId+"</td><td>"+orders[i].price+"</td><td><button>view more</button></td></tr>";
        console.log(orders);
        console.log(orderRows);

    }
    document.getElementById("flightsToEarthContent").innerHTML = tableHeaders + orderRows;

}