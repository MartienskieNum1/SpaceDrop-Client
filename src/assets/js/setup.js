"use strict";

function getMessage() {
    return apiCall("message");
}

function addUser(firstName, lastName, email, phoneNumber, password){
    return apiCall("user", "POST", userToJson(firstName, lastName, email, phoneNumber, password))
}

function getUsers(){
    return apiCall("users", "GET")
}

function addOrder(){

}

function getOrders(){
    return apiCall("users", "GET")
}

// function apiCall(uri) {
//     const request = new Request(api + uri, {
//         method: 'GET',
//         credentials: 'include'
//     });
//     return fetch(request)
//         .then(response => response.json());
// }

function userToJson(firstName, lastName, email, phoneNumber, password){
    return {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password
    };
}