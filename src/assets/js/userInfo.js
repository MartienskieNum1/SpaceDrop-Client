"use strict";

onApiUrlLoaded(userInfoInit);

function userInfoInit(){
    loadInUserInfo();
}

function loadInUserInfo() {
    getUser().then(function(response){
        showUserInfo(response);
    });
    document.querySelector("#toUserOrders").addEventListener("click", openUserOrders);
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
}

function openUserOrders() {
    window.location.href= "userOrders.html";
}

function showUserInfo(user) {
    document.getElementById("userInfo").innerHTML = `
        <tr><th scope="row" colspan="2">Account Info</th></tr>
        <tr><th>name:</th><td>${user.firstName} ${user.lastName}</td></tr>
        <tr><th>email:</th><td>${user.email}</td></tr>
        <tr><th>adress:</th><td>${user.address.street} ${user.address.number} ${user.address.cityOrDistrict} ${user.address.countryOrColony} ${user.address.planet}</td></tr>
        <tr><th>phone:</th><td>${user.phoneNumber}</td></tr>
        <tr><td colspan="2"><a href='UserEditInfo.html' class='button'>Edit info</a></td</tr>`;
}
