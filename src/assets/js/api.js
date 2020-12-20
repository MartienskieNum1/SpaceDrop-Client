function apiCall(uri, httpVerb, requestBody) {
    const TOKEN = getToken();

    const REQUEST = new Request(api + uri, {
        method: httpVerb,
        headers: {
            'Content-type': 'application/json',
            'Authorization': TOKEN
        },
        body: JSON.stringify(requestBody)
    });

    return fetch(REQUEST)
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
