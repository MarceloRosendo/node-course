const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marcelo Maximiano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Marcelo Maximiano '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hello im here to help',
        name: 'Marcelo Maximiano',
        helpText: 'Some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }

            return res.send({
                location,
                forecast
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404 Error help page',
        message: 'Help article not found',
        name: 'Marcelo Maximiano'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404 Error',
        message: 'Page not found',
        name: 'Marcelo Maximiano'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
