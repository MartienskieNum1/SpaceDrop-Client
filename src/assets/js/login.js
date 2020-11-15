document.addEventListener("DOMContentLoaded", loginInit);

function loginInit() {
    document.querySelector("#submit").addEventListener("click", getLoginCredentials);
    document.querySelector("#reg").addEventListener("click", goToRegisterPage);
}

function getLoginCredentials() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email,password);
}

function login(email,password) {
    //TODO check if mail exists in database
}




function goToRegisterPage(){
    window.location.pathname = 'client/src/register.html';
}

