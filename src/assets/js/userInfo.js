onApiUrlLoaded(userInfoInit);

function userInfoInit(){
    loadInUserInfo();

    getUser().then(function(response){
        console.log(response);
    });


}

function loadInUserInfo() {
    const info = getUserMock();
    showUserInfo(info);
}


function showUserInfo(info) {
    const tableUserInfo = "<tr><th>name:</th><td>"+info.user.firstName+" "+info.user.lastName+"</td></tr><tr><th>email:</th><td>"+info.user.email+"</td></tr><tr><th>adress:</th><td>USER ADRESS</td></tr><tr><th>phone:</th><td>"+info.user.phoneNumber+"</td></tr><tr><td><a href='#' class='button'>Edit info</a></td><td><a href='#' class='button'>Edit password</a></td></tr>";
    document.getElementById("userInfo").innerHTML = tableUserInfo;
}
