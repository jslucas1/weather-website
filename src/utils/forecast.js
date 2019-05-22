const request = require('request');

const forecast = (longitude, latitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/1648646ba9337a29e48052be70859898/' + encodeURIComponent(latitude) +
                    ',' + encodeURIComponent(longitude) + '/?lang=en';

    request({url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to weather service', undefined);
            } else if(body.error){
                callback('Unable to find location', undefined);
            } else{
                const a = body.currently.temperature;
                const b = body.currently.precipProbability;
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + a + ' degrees out.  There is a ' + b + '% chance of rain. '+
                                            'The low today will be ' + body.daily.data[0].temperatureLow + ". the high will be " +
                                            body.daily.data[0].temperatureHigh + ".");
            }
    });
}

module.exports = forecast;