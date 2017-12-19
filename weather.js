const http = require('http');
const api = require('./api.json');


function get(city) {
    let url = `http://api.wunderground.com/api/${api.key}/conditions/q/CA/${city}.json`
    const request = http.get(url, response => {
        if(response.statusCode === 200) {
            let body = "";
                response.on('data', data => {
                    body += data.toString();
                });
                response.on('end', () => {
                    console.log(body);
                })
        }
    })
};

module.exports.get = get;
