const prequest = require('postman-request');

const forcast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=18b88fcd91f3dac0b6406752dc9f9662&query=' + lat + ',' + long + '&units=f';

    prequest ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees outside. The humidity is ' + body.current.humidity + '.');
        }
    })
}

module.exports = forcast;