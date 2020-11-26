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

function getUsers(){
    return apiCall("users", "GET");
}

function getUser(){
    return apiCall("details/user", "GET");
}

function addOrder(orderId, userId, rocketId, statusId, mass, width, height, depth, cost){
    return apiCall("order", "POST",
        orderToJson(orderId, userId, rocketId, statusId, mass, width, height, depth, cost));
}

function getOrders(){
    return apiCall("orders", "GET");
}

function getRockets(){
    return apiCall("rockets", "GET");
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

function orderToJson(orderId, userId, rocketId, statusId, mass, width, height, depth, cost){
    return {
        "orderId": orderId,
        "userId": userId,
        "rocketId": rocketId,
        "statusId": statusId,
        "mass": mass,
        "width": width,
        "height": height,
        "depth": depth,
        "cost": cost
    };
}

