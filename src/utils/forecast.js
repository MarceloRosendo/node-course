const request = require('request')

const forecast = (latitude, longitude , callback) => {
    const access_key = 'd00c48d0b6c42620cdb0b4e2b7edc4c0'
    const query = `${longitude},${latitude}`
    const units = 'm'
    const url = `http://api.weatherstack.com/current?access_key=d00c48d0b6c42620cdb0b4e2b7edc4c0&query=${query}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect forecast webservice', undefined)
        } else if (body.error) {
            callback('Unable to find current location. Try another coordinates!', undefined)
        } else {
            const {weather_descriptions, temperature, precip, humidity} = body.current
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain. And the humidity is ${humidity}%`)
        }
    })
}

module.exports = forecast