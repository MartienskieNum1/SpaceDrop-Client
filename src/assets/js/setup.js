"use strict";

function getMessage() {
    return apiCall("message");
}

function loginUser(email, password){
    return apiCall("login", "POST", {
        "email" : email,
        "password" : password
    });
}

function addUser(body){
    return apiCall("user", "POST", body);
}

function editUser(oldPassword, body){
    return apiCall("update/user", "PATCH",
        [oldPassword,body]);
}

function getUsers(){
    return apiCall("users", "GET");
}

function getUser(){
    return apiCall("details/user", "GET");
}

function addOrder(body){
    return apiCall("order", "POST", body);
}

function getUserId(){
    return apiCall(`userId/user`, "GET");
}

function getOrders(){
    return apiCall("orders", "GET");
}

function getOrdersUser(){
    return apiCall("details/orders", "GET");
}

function getRockets(){
    return apiCall("rockets", "GET");
}

function getOrderById(rocketId){
    return apiCall( `orders/${rocketId}`, "GET");
}

function getRocketById(rocketId){
    return getRockets().then(function (response){
        for(let i=0;i<response.length;i++){
            if(response[i].id === rocketId){
                return response[i];
            }
        }
        return null;
    });
}

function userToJson(...body){
    return {
        "firstName": body[0],
        "lastName": body[1],
        "email": body[2],
        "phoneNumber": body[3],
        "password": body[4],
        "address": {
            "planet": body[5],
            "countryOrColony": body[6],
            "cityOrDistrict": body[7],
            "street": body[8],
            "number": body[9]
        }
    };
}

function orderToJson(...body){
    return {
        "orderId" : -1,
        "userId": body[0],
        "rocketId": body[1],
        "statusId": body[2],
        "mass": body[3],
        "width": body[4],
        "height": body[5],
        "depth": body[6],
        "cost": body[7],
        "address": {
            "planet": body[8],
            "countryOrColony": body[9],
            "cityOrDistrict": body[10],
            "street": body[11],
            "number": body[12]
        }
    };
}

function logout(){
    setToken("");
    window.location.href = "login.html";
}


function getLoggedInStatus(){
    return getToken() !== "";
}

function checkIfLoggedIn(){
    if (getLoggedInStatus()){
        document.querySelector("a.AccountLoginButton").outerHTML =
            `<li class="AccountLogoutButton"><a class="AccountLogoutButton" href="index.html">Logout (user)</a></li>`;
    }else{
        document.querySelector("a.AccountLoginButton").outerHTML =
            `<li class="AccountLoginButton"><a class="AccountLoginButton" href="login.html">Login</a></li>`;
    }
}

function logInOrOut(e){
    e.preventDefault();
    if (e.target.classList.contains("AccountLoginButton")){
        window.location.href = "login.html";
    }else if (e.target.classList.contains("AccountLogoutButton")){
        logout();
    }
}

function getTableHeader(){
    return  '<tr class="tableHeaders"><th scope="col">Flightname:</th><th scope="col">Flightstatus:</th>' +
            '<th scope="col">Departure:</th><th scope="col">Arrival:</th><th scope="col">Cargo:</th>' +
            '<th scope="col">Volume:</th><td></td></tr>';
}

function getTableHeader2(){
    return '<tr class="tableHeaders">' +
        '                <th scope="col">Ordernr:</th>'+
        '                <th scope="col">From:</th>' +
        '                <th scope="col">To:</th>' +
        '                <th scope="col">Address:</th>' +
        '                <th scope="col">Return:</th>' +
        '                <th scope="col">Status:</th>' +
        '                <td></td>' +
        '            </tr>';
}

