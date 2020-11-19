function apiCall(uri, httpVerb, requestBody) {

    console.log(api+uri)

    const request = new Request(api + uri, {
        method: httpVerb,
        headers: {
            'Content-Type': 'application/json;',
            'Authorization' : getToken()
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

