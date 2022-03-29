const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4102265651359731bdca52f437e8c07f&query='
        + latitude + ',' + longitude + ',-122.4233&units=f';
    
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('unable to find location, try another search', undefined);
        } else {
            callback(undefined, "It's currently "
                + body.current.temperature + " degrees and "
                + body.current.weather_descriptions[0] + " with a " 
                + body.current.precip + "% chance of rain"
            );
        }
    });
}

module.exports = forecast;