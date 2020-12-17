"use strict";

document.addEventListener("DOMContentLoaded", headerInit);

function headerInit(){
    checkIfLoggedIn();
    document.querySelector("ul.nav").addEventListener("click", logInOrAccount);

    getLoggedInUserFetch();

}
