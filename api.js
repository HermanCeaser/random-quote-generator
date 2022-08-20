const API_URL = 'https://api.quotable.io';



/*Helper function for making API requests*/

async function get(endpoint, params={}){
    const param = new URLSearchParams(params);
    const requestUrl = `${API_URL}${endpoint}?${param}`;
    const response = await fetch(requestUrl);
    if(!response.ok){
        return { error: await response.json()}
    }
    return response.json();
}

async function getQuotes(params={}){
    
    const { results: quotes=[], ...pageInfo } = await get('/quotes', params);

    return { quotes, pageInfo };

}

export { getQuotes };