"use strict";

document.addEventListener("DOMContentLoaded", registerInit);

function registerInit() {
    document.querySelector("#submit").addEventListener("click", makeAccount);
    document.querySelector(".close").addEventListener("click", closePopUp);
    changeVisable();
}

function changeVisable(){
    if(document.getElementById("planet").value === "mars"){
        document.getElementById("marsLabel").style.display = 'table-row';
        document.getElementById("earthLabel").style.display = 'none';
        document.getElementById("mars").style.display = 'table-row';
        document.getElementById("earth").style.display = 'none';
        document.getElementById("country").removeAttribute("required");
        document.getElementById("city").removeAttribute("required");
        document.getElementById("colony").setAttribute("required","");


    }
    else{
        document.getElementById("marsLabel").style.display = 'none';
        document.getElementById("earthLabel").style.display = 'table-row';
        document.getElementById("mars").style.display = 'none';
        document.getElementById("earth").style.display = 'table-row';
        document.getElementById("country").setAttribute("required","");
        document.getElementById("city").setAttribute("required","");
        document.getElementById("colony").removeAttribute("required");
    }
}

function makeAccount() {
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const street = document.getElementById("street").value;
    const nr = document.getElementById("nr").value;
    const planet = document.getElementById("planet").value;
    const phone = document.getElementById("phone").value;

    let validPass = isPasswordValid(password, repeatPassword);
    let allFieldsFilled = validateRegistration(planet, email, fname, lname, street, nr)

    if(!validPass){
        showPopUp("Passwords are not identical");
    }else if (allFieldsFilled) {
        showPopUp("Please fill in the required fields");
    }else if (validPass && !allFieldsFilled) {
        addUser(fname, lname, email, phone, password).then(response => {
            if (response.message === undefined){
                setToken(response);
                window.location.href = "login.html";
            }else{
                showPopUp("Something went wrong");
            }
        });
    }
}

function isPasswordValid(password, repeatPassword){
    return (password === repeatPassword)
}

function validateRegistration(planet, email, fname, lname, street, nr){

    if(planet === "mars"){
        const colony = document.getElementById("colony").value;
        return (email===""||fname===""||lname===""||street===""||nr===""||colony==="");
    }
    else if(planet === "earth"){
        const country = document.getElementById("country").value;
        const city = document.getElementById("city").value;
        return (email===""||fname===""||lname===""||street===""||nr===""||country===""||city==="");
    }
    else{
        showPopUp("Something went wrong");
    }
}

function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}
