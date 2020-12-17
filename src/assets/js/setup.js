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

function getOrderByUuid(uuid){
    return apiCall(`orders/qr/${uuid}`, "GET");
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

function getRocketsByFilter(weight, volume, urgency){
    return apiCall( `filteredRockets?weight=${weight}&volume=${volume}&urgency=${urgency}`, "GET");
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
        "rocketId": body[0],
        "statusId": body[1],
        "mass": body[2],
        "width": body[3],
        "height": body[4],
        "depth": body[5],
        "cost": body[6],
        "address": {
            "planet": body[7],
            "countryOrColony": body[8],
            "cityOrDistrict": body[9],
            "street": body[10],
            "number": body[11]
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
            `<a class="AccountButton" href="index.html">Account (user)</a>`;
    }else{
        document.querySelector("a.AccountLoginButton").outerHTML =
            `<a class="AccountLoginButton" href="login.html">Login</a>`;
    }
}

function logInOrAccount(e){
    e.preventDefault();
    if (e.target.classList.contains("AccountLoginButton")){
        window.location.href = "login.html";
    }else if (e.target.classList.contains("AccountButton")){
        window.location.href = "userInfo.html";
    }else{
        window.location.href = "index.html";
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

function fillTableWithContent(flight){
    return `<tr data-row='${flight.id}'>
                    <td>${flight.id}</td>
                    <td>STATUS</td>
                    <td>${flight.departure}</td>
                    <td>${flight.arrival}</td>
                    <td>${flight.maxMass-flight.availableMass}/${flight.maxMass} kg</td>
                    <td>${flight.maxVolume-flight.availableVolume}/${flight.maxVolume} m3</td>
                    <td><button onclick="goToFlightDetail('${flight.id}')">more info</button></td>
                </tr>`;
}

function showProgression(progressionLevel) {
    for(let i=1;i<=5;i++){
        if(progressionLevel>=i){
            document.getElementById(i.toString()).classList.add("active");
        }
        else {
            document.getElementById(i.toString()).classList.remove("active");
        }
    }
}

function onSignIn(googleUser) {
    let accessToken = googleUser.xc.access_token;
    document.querySelector("a.AccountLoginButton").innerHTML = "Logout";
    getLoggedInUserFetch(accessToken);
}

function getLoggedInUserFetch(){ //todo: token in cookie steken
    fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=ya29.a0AfH6SMDc-N4O5v85BKw429A4gGNbOzJ147oj3zqxoyipmVDP8WXE95yeV0NslAXINY_ysGijxchaSNQMKcqOUVvkE1dFYtHo5IlSO6sYu6joq_xd53kDaUSQZFB5oHirmqA8aHbAA8wqVEmQ5-AqOFjnw4n4pe-t_PZ9zc5qwMwo")
        .then(response => response.json())
        .then(user => {
            console.log(user);
        });
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        // document.querySelector("#googleSignOut").innerHTML = "Signed out";
        console.log("Signed out");
    });
}
