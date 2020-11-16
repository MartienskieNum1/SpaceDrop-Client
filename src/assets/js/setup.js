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

function addUser(firstName, lastName, email, phoneNumber, password){
    return apiCall("user", "POST",
        userToJson(firstName, lastName, email, phoneNumber, password));
}

function getUsers(){
    return apiCall("users", "GET");
}

function addOrder(orderId, userId, rocketId, statusId, mass, width, height, depth, cost){
    return apiCall("order", "POST",
        orderToJson(orderId, userId, rocketId, statusId, mass, width, height, depth, cost));
}

function getOrders(){
    return apiCall("orders", "GET");
}

function userToJson(firstName, lastName, email, phoneNumber, password){
    return {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password
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

