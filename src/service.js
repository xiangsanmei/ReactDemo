import fetch from 'node-fetch';

const FetchData = function (url,method,body) {
    const options = {};
    if(method != 'get'){
        options.method = method;
        options.body = JSON.stringify(body);
    }
    return fetch(url)
        .then(function(res) {
            return res.json();
        })
}

export default FetchData
