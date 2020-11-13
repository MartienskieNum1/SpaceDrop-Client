function apiCall(uri, httpVerb, requestBody) {
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

