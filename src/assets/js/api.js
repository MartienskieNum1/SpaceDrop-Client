function apiCall(uri, httpVerb, requestBody) {
    const TOKEN = getToken();

    const request = new Request(api + uri, {
        method: httpVerb,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (getToken() !== ""){
        request["Authorization"] = TOKEN;
    }

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

