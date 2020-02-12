const yargs = require('yargs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


yargs.version('1.1.1');

if (yargs.argv._.length === 0) {
    return console.log('Please enter a location')
}

const location = yargs.argv._[0]

geocode(location, (error, {latitude, longitude, location}) => {
    if ( error ) {
        return console.log(error)
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }
        console.log(location)
        console.log(forecastData)
    })
})



