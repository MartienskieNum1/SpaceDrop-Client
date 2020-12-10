"use strict";

onApiUrlLoaded(registerInit);

function registerInit() {
    document.querySelector("#submit").addEventListener("click", makeAccount);
    document.querySelector(".close").addEventListener("click", closePopUp);
    changeVisible();
    renderCountryList();
}

function makeAccount() {
    //TODO: put every form value and put it in an array instead of the monster below
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const street = document.getElementById("street").value;
    const nr = document.getElementById("nr").value;
    const planet = document.getElementById("planet").value;
    const phone = document.getElementById("phone").value;
    const colony = document.getElementById("colony").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;

    const validPass = isPasswordValid(password, repeatPassword);
    const allFieldsFilled = !includesEmptyField(planet, email, fname, lname, street, nr, colony, country, city);

    if(!validPass){
        showPopUp("Passwords are not identical");
    }else if (!allFieldsFilled) {
        showPopUp("Please fill in the required fields");
    }else{
        const COLONY_OR_COUNTRY = checkColonyOrCountry(colony, country);

        addUser(fname, lname, email, phone, password, planet, COLONY_OR_COUNTRY, city, street, parseInt(nr)).then(response => {
            if (response.message === undefined){
                setToken(response);
                window.location.href = "login.html";
            }else{
                showPopUp("Something went wrong");
            }
        });
    }
}

function checkColonyOrCountry(colony, country){
    if(colony === ""){
        return country;
    }else{
        return colony;
    }
}


function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}
