"use strict";

onApiUrlLoaded(registerInit);

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
        let colonyOrCountry = checkColonyOrCountry(colony, country);

        addUser(fname, lname, email, phone, password, planet, colonyOrCountry, city, street, parseInt(nr)).then(response => {
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

function isPasswordValid(password, repeatPassword){
    return (password === repeatPassword);
}

function includesEmptyField(planet, email, fname, lname, street, nr, colony, country, city){
    if(planet === "mars"){
        const marsFields = [planet, email, fname, lname, street, nr, colony];
        return marsFields.includes("");
    }
    else if(planet === "earth"){
        const earthFields = [planet, email, fname, lname, street, nr, country, city];
        return earthFields.includes("");
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
