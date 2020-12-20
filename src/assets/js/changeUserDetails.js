function changeVisible(){
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

function includesEmptyField(planet, email, phone, fname, lname, street, nr, colony, country, city){
    if(planet === "mars"){
        const MARS_FIELDS = [planet, email, phone, fname, lname, street, nr, colony];
        return MARS_FIELDS.includes("");
    }
    else if(planet === "earth"){
        const EARTH_FIELDS = [planet, email, phone, fname, lname, street, nr, country, city];
        return EARTH_FIELDS.includes("");
    }
    else{
        showPopUp("Something went wrong");
        const PLANET_FIELDS = [planet, email, phone, fname, lname, street, nr, country, city];
        return PLANET_FIELDS.includes("");
    }
}

function isPasswordValid(password, repeatPassword){
    return (password === repeatPassword);
}

function addOrEdit(addEdit){
    const EMAIL = document.getElementById("email").value;
    const FIRST_NAME = document.getElementById("fname").value;
    const LAST_NAME = document.getElementById("lname").value;
    const PASSWORD = document.getElementById("password").value;
    const REPEAT_PASSWORD = document.getElementById("repeatPassword").value;
    const STREET = document.getElementById("street").value;
    const NR = document.getElementById("nr").value;
    const PLANET = document.getElementById("planet").value;
    const PHONE = document.getElementById("phone").value;
    const COLONY = document.getElementById("colony").value;
    const COUNTRY = document.getElementById("country").value;
    const CITY = document.getElementById("city").value;

    const VALID_PASS = isPasswordValid(PASSWORD, REPEAT_PASSWORD);
    const FIELDS_ARGS = [PLANET, EMAIL, PHONE, FIRST_NAME, LAST_NAME, STREET, NR, COLONY, COUNTRY, CITY];
    const ALL_FIELDS_FILLED = !includesEmptyField(...FIELDS_ARGS);

    if(!VALID_PASS){
        showPopUp("Passwords are not identical");
    }else if (!ALL_FIELDS_FILLED) {
        showPopUp("Please fill in the required fields");
    }else{
        const COLONY_OR_COUNTRY = checkColonyOrCountry(COLONY, COUNTRY);
        const USER_ARGS = [FIRST_NAME, LAST_NAME, EMAIL, PHONE, PASSWORD, PLANET, COLONY_OR_COUNTRY, CITY, STREET, parseInt(NR)];
        if(addEdit ==="add"){
            addUser(userToJson(...USER_ARGS)).then(response => {
                if (response.message === undefined){
                    setToken(response);
                    window.location.href = "login.html";
                }else{
                    showPopUp("Something went wrong");
                }
            });
        }else if(addEdit ==="edit"){
            const OLD_PASSWORD = document.getElementById("oldPassword").value;
            editUser(OLD_PASSWORD, userToJson(...USER_ARGS)).then(response => {
                if (response.message === undefined){
                    window.location.href = "userInfo.html";
                }else{
                    showPopUp("Something went wrong");
                }
            });
        }
    }
}

function checkColonyOrCountry(colony, country){
    return ( (colony === "") ? country : colony);
}

function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}
