const request = require('request')

const geocode = (address, callback) => {
    const wheater_box_access_token = 'pk.eyJ1IjoibWFyY2Vsb3Jvc2VuZG8iLCJhIjoiY2tvdmd1cmFnMDc1NTJ3cHVxNmNpYmZiaSJ9.Bi2y_6MjwMOQykB3aEjIWQ' 
    const url_wheater_box = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${wheater_box_access_token}`
    request({ url: url_wheater_box, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to mapbox service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to found location. Try another search.', undefined)
        } else {
            const { center:coordinates, place_name:location } = response.body.features[0]
            callback(undefined, {
                latitude: coordinates[1],
                longitude: coordinates[0],
                location
            })
        }
    })
}

module.exports = geocode