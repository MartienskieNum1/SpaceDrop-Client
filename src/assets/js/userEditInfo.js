"use strict";

onApiUrlLoaded(editInfoInit);

function editInfoInit() {
    getUser().then(function(response){
        showInputfields(response);
    });
}

function editAccount() {
    addOrEdit("edit");
}

function showInputfields(user) {
    let selectedMars ;
    let selectedEarth;
    if(user.address.planet === "mars"){
        selectedMars ="selected";
        selectedEarth = "";
    }else if(user.address.planet === "earth"){
        selectedEarth ="selected";
        selectedMars = "";
    }
    document.getElementById("tableUserInfo").innerHTML = `
        <caption>Fill in your details</caption>
        <tr>
            <th colspan="2" scope="row"><label for="email">Email:</label></th>
        </tr>
        <tr>
            <td colspan="2"><input class="wide" type="email" id="email" name="email" value="${user.email}" required></td>
        </tr>
        <tr>
            <th scope="row"><label for="fname">First name:</label></th>
            <th scope="row"><label for="lname">Last name:</label></th>
        </tr>
        <tr>
            <td><input type="text" id="fname" name="fname" value="${user.firstName}" required></td>
            <td><input type="text" id="lname" name="lname" value="${user.lastName}" required></td>
        </tr>
        <tr>
            <th scope="row"><label for="planet">Planet:</label></th>
            <th scope="row"><label for="phone">Phone:</label></th>
        </tr>
        <tr>
            <td>
                <select name="planet" id="planet" onchange="changeVisible()">
                    <option value="earth" ${selectedEarth}>Earth</option>
                    <option value="mars" ${selectedMars}>Mars</option>
                </select>
            </td>
            <td>
                <input type="text" id="phone" name="phone" value="${user.phoneNumber}">
            </td>
        </tr>
        <tr id="earthLabel">
            <th scope="row"><label for="country">Country:</label></th>
            <th scope="row"><label for="city">City:</label></th>
        </tr>
        <tr id="earth">
                <td>
                    <input id="country" name="country"  required list="country-list" value="${user.address.countryOrColony}" />
                    <datalist id="country-list"></datalist>
                </td>
                <td>
                    <input type="text" id="city" name="city" value="${user.address.cityOrDistrict}" >
                </td>
            </tr>
        <tr id="marsLabel">
            <th colspan="2" scope="row"><label for="colony">Colony:</label></th>
        </tr>
        <tr id="mars">
            <td colspan="2"><input class="wide" type="text" id="colony" name="colony" value="${user.address.countryOrColony}"></td>
        </tr>
        <tr>
            <th scope="row"><label for="street">Street:</label></th>
            <th scope="row"><label for="nr">Nr:</label></th>
        </tr>
        <tr>
            <td><input type="text" id="street" name="street" value="${user.address.street}"></td>
            <td><input type="text" id="nr" name="nr" value="${user.address.number}"></td>
        </tr>
        <tr>
            <th scope="row"><label for="password">New password:</label></th>
            <th scope="row"><label for="repeatPassword">Repeat new password:</label></th>
        </tr>
        <tr>
            <td><input type="password" id="password" name="password" value="" required></td>
            <td><input type="password" id="repeatPassword" name="repeatPassword" value="" required></td>
        </tr>
        <tr>
            <th scope="row" colspan="2"><label for="oldPassword">Old password:</label></th>
        </tr>
        <tr>
            <td colspan="2"><input class="wide" type="password" id="oldPassword" name="password" value="" required></td>
        </tr>
        <tr>
        <th class="wide" colspan="2"><input class="wide" id="submit" type="submit" value="Edit"></th>
    </tr>

    `;
    document.querySelector("#submit").addEventListener("click", editAccount);
    changeVisible();
    document.querySelector(".close").addEventListener("click", closePopUp);
    renderCountryList();


}

