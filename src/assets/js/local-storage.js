"use strict";

function setDestinationPlanet(planet){
    localStorage.setItem("planet", JSON.stringify(planet));
}

function getDestinationPlanet(){
    let planet = localStorage.getItem("planet");

    if (planet === null){
        setDestinationPlanet(null);
        planet = localStorage.getItem("planet");
    }

    return JSON.parse(planet);
}

function setToken(token){
    localStorage.setItem("token", JSON.stringify(token));
}

function setOrderId(orderID) {
    localStorage.setItem("orderId", JSON.stringify(orderId));
}

function getOrderId(){
    let orderId = localStorage.getItem("orderId");

    if (orderId === null){
        setOrderId(null);
        orderId = localStorage.getItem("orderId");
    }

    return JSON.parse(orderId);
}

function getToken(){
    let token = localStorage.getItem("token");

    if (token === null){
        setToken(null);
        token = localStorage.getItem("token");
    }

    return JSON.parse(token);
}
