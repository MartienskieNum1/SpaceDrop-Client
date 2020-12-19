function showRockets(rockets, ORDER,tableHeaders) {
    let earthOrders = tableHeaders;
    let marsOrders = tableHeaders;
    for (let x = 0; x < rockets.length; x++){
        if(ORDER.rocketId.toString()===rockets[x].id.toString() && rockets[x].departLocation.toString() === "Mars" && ORDER.statusId<3) {
            earthOrders += fillTableWithContent(earthOrders, ORDER, rockets[x]);
        }else if(ORDER.rocketId.toString()===rockets[x].id.toString() && rockets[x].departLocation === "Earth"&& ORDER.statusId<3) {
            marsOrders += fillTableWithContent(marsOrders, ORDER, rockets[x]);
        }
    }
    containerEarth.innerHTML = earthOrders;
    containerMars.innerHTML = marsOrders;
}
