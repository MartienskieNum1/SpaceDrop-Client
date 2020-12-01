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

function setFlightname(flightname) {
    localStorage.setItem("flightname", JSON.stringify(flightname));
}

function getFlightname(){
    let flightname = localStorage.getItem("flightname");

    if (flightname === null){
        setOrderId(null);
        flightname = localStorage.getItem("flightname");
    }

    return JSON.parse(flightname);
}

function setOrderId(orderId) {
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
    console.log(token);

    if (token === null){
        setToken(null);
        token = localStorage.getItem("token");
    }

    return token;
}
