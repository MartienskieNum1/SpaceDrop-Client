function apiCall(uri, httpVerb, requestBody) {
    let token = getToken();

    const request = new Request(api + uri, {
        method: httpVerb,
        headers: {
            'Content-type': 'application/json',
            'Authorization' : 'Bearer ' + token
        },
        body: JSON.stringify(requestBody)
    });

    return fetch(request)
        .then((response) => {
            if (!response.ok){
                console.error("! An error occurred while calling the API");
                console.table(response);
            }
            return response.json();
        })
        .then((jsonResponse) => {
            return jsonResponse;
        });
}

