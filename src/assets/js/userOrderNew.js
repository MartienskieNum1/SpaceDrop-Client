function showRockets(rockets, orders,tableHeaders) {
    let earthOrders = tableHeaders;
    let marsOrders = tableHeaders;
    for (let x = 0; x < rockets.length; x++){
        for(let y = 0; y < orders.length; y++)
            if(orders[y].rocketId.toString()===rockets[x].id.toString() && rockets[x].departLocation === "Mars" && orders[y].statusId<3) {
                earthOrders += fillTableWithContent(earthOrders, orders[y], rockets[x]);
            }else if(orders[y].rocketId.toString()===rockets[x].id.toString() && rockets[x].departLocation === "Earth"&& orders[y].statusId<3) {
                marsOrders += fillTableWithContent(marsOrders, orders[y], rockets[x]);
            }
    }
    containerEarth.innerHTML = earthOrders;
    containerMars.innerHTML = marsOrders;
}
