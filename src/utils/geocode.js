const prequest = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiaml2aW5tYXp1bWRlcjExIiwiYSI6ImNrOWV0d3RlMzAxamUzZW8zbXN2NmNkemQifQ.D2CVw9-ft6r7LrRtlW9D0w&limit=1';

    prequest({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longutude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;