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

function addUser(firstName, lastName, email, phoneNumber, password, planet, country_or_colony, city_or_district, street, number){
    return apiCall("user", "POST",
        userToJson(firstName, lastName, email, phoneNumber, password, planet, country_or_colony, city_or_district, street, number));
}

function editUser(oldPassword,firstName, lastName, email, phoneNumber, password, planet, country_or_colony, city_or_district, street, number){
    console.log(userToJson(firstName, lastName, email, phoneNumber,password, planet, country_or_colony, city_or_district, street, number));
    return apiCall("update/user", "PATCH",
        [oldPassword,userToJson(firstName, lastName, email, phoneNumber,password, planet, country_or_colony, city_or_district, street, number)]);
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

function userToJson(firstName, lastName, email, phoneNumber, password, planet, country_or_colony, city_or_district, street, number){
    return {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password,
        "address": {
            "planet": planet,
            "countryOrColony": country_or_colony,
            "cityOrDistrict": city_or_district,
            "street": street,
            "number": number
        }
    };
}

function orderToJson(userId, rocketId, statusId, mass, width, height, depth, cost, planet, countryOrColony, cityOrDistrict, street, number){
    return {
        "orderId" : -1,
        "userId": userId,
        "rocketId": rocketId,
        "statusId": statusId,
        "mass": mass,
        "width": width,
        "height": height,
        "depth": depth,
        "cost": cost,
        "address": {
            "planet": planet,
            "countryOrColony": countryOrColony,
            "cityOrDistrict": cityOrDistrict,
            "street": street,
            "number": number
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
    console.log("YO")
    if (e.target.classList.contains("AccountLoginButton")){
        console.log("LOG IN")
        window.location.href = "login.html";
    }else if (e.target.classList.contains("AccountLogoutButton")){
        console.log("LOG OUT")
        logout();
    }
}

