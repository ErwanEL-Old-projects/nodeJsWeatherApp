const weather = require('./weather.js');
const query = process.argv.slice(2);

weather.get(query);
//medellin: /q/zmw:00000.4.80110