function getMessage() {
    return apiCall2point0("message");
}

function apiCall(uri) {
    const request = new Request(api + uri, {
        method: 'GET',
        credentials: 'include'
    });
    return fetch(request)
        .then(response => response.json());
}

function addUser(){

    let body = {
        "firstName" : "Thomas",
        "lastName" : "Thomas",
        "email" : "Thomas",
        "phoneNumber" : "Thomas",
        "password" : "Thomas"
    }

    return apiCall2point0("user", "POST", body)
}

function apiCall2point0(uri, httpVerb, requestBody) {
    const request = new Request(api + uri, {
        method: httpVerb,
        credentials: 'include',
        body: JSON.stringify(requestBody)
    });

    return fetch(request)
        .then((response) => {
            if (!response.ok){
                console.error("! An error occurec while calling the API");
                console.table(response);
            }
            return response.json();
        })
        .then((jsonResponse) => {
            return jsonResponse;
        });
}
