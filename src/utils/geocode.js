const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianNsdWNhcyIsImEiOiJjanZyMTl5ajgycWdsNGNvaXc2d3Z6NW04In0.yCTSfm1xrDAAtHUNAzFodQ&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services',undefined);
        } else if(body.features.length ===0){
            callback('Unable to find location.  Try another search', undefined);
        } else{
            const myResults = {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback(undefined, myResults);
        }
    })

}

module.exports = geocode;