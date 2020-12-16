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

function setflightId(flightId) {
    localStorage.setItem("flightId", JSON.stringify(flightId));
}

function getFlightId(){
    let flightId = localStorage.getItem("flightId");

    if (flightId === null){
        setOrderId(null);
        flightId = localStorage.getItem("flightId");
    }

    return JSON.parse(flightId);
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

    if (token === null){
        setToken(null);
        token = localStorage.getItem("token");
    }

    return JSON.parse(token);
}

function setTempOrder(order){
    localStorage.setItem("tempOrder", JSON.stringify(order));
}

function getTempOrder(){
    let tempOrder = localStorage.getItem("tempOrder");

    if (tempOrder === null){
        setTempOrder(null);
        tempOrder = localStorage.getItem("tempOrder");
    }

    return JSON.parse(tempOrder);
}

function setFinalOrder(order){
    localStorage.setItem("finalOrder", JSON.stringify(order));
}

function getFinalOrder(){
    let finalOrder = localStorage.getItem("finalOrder");

    if (finalOrder === null){
        setFinalOrder(null);
        finalOrder = localStorage.getItem("finalOrder");
    }

    return JSON.parse(finalOrder);
}

function setFilterOptions(filterOptions){
    localStorage.setItem("filterOptions", JSON.stringify(filterOptions));
}

function getFilterOptions(){
    let filterOptions = localStorage.getItem("filterOptions");

    if (filterOptions === null){
        setFilterOptions(null);
        filterOptions = localStorage.getItem("filterOptions");
    }

    return JSON.parse(filterOptions);
}

