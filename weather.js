const http = require('http');
const api = require('./api.json');

function print (temp, city) {
    let message = `Hace ${temp} grados en ${city}`
    console.log(message);
}
function printError (error) {
    console.error(error);
}

function get(city) {
    try {
        let url = `http://api.wunderground.com/api/${api.key}/conditions${city}.json`
        const request = http.get(url, response => {
            if(response.statusCode === 200) {
                let body = "";
                    response.on('data', data => {
                        body += data.toString();
                    });
                    response.on('end', () => {
                        try {
                            let data = JSON.parse(body);
                            let city = data.current_observation.display_location.city;
                            let temp = data.current_observation.temp_c;
                            print(temp, city);
                        } catch (error) {
                            printError('ville non localisée');
                        }
                    })
            } else {
                const message = `Error getting the localisation of ${city} (${http.STATUS_CODES[response.statusCode]})`
                printError(message);            }
        })//fin de requete
        request.on('error', error => printError(`La syntaxe de l'url n'est pas bonne`));
    } catch (error) {
        printError(`Nom de domaine introuvable(https://)`);
    }
};

module.exports.get = get;
