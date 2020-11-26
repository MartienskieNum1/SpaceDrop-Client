document.addEventListener("DOMContentLoaded", userOrderTrackingInit);

function userOrderTrackingInit(){
    showOrderdetails();
}

function showOrderdetails() {
    //get order details from api
    fillInDetails();
    showProgression(3);

}

function showProgression(progressionLevel) {
    for(let i=1;i<=5;i++){
        if(progressionLevel>=i){
            document.getElementById("1").classList.add("active");
        }
        else {
            document.getElementById(i.toString()).classList.remove("active");
        }
    }
}

function fillInDetails(){
}
