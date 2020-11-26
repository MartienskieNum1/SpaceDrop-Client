document.addEventListener("DOMContentLoaded", userOrderTrackingInit);

function userOrderTrackingInit(){
    showOrderdetails();
}

function showOrderdetails() {
    const order = getOrderMock();
    fillInDetails(order);
    showProgression(order.orderStatus);

}

function showProgression(progressionLevel) {
    console.log(progressionLevel);
    for(let i=1;i<=5;i++){
        if(progressionLevel>=i){
            document.getElementById(i.toString()).classList.add("active");
        }
        else {
            document.getElementById(i.toString()).classList.remove("active");
        }
    }
}

function fillInDetails(order){
}
