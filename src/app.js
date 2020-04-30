//
// Required NPM Modules & Variables
//

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const publicDirectory = path.join(__dirname, '../public');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');
const viewsPath = path.join(__dirname, '../src/views')

//
// The App Variable
//

const app = express();
const port = process.env.PORT || 3000;

//
// The App
//


app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(path.join(__dirname, '../src/views/partials'))
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jivin Mazumder'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Weather app by Jivin Mazumder. Created with Node.js. Not owned by Node.js.',
        name: 'Jivin Mazumder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jivin Mazumder'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    });
});

//
// 404 Request
//

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found, Sorry!',
        name: 'Jivin Mazumder'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found, Sorry!',
        name: 'Jivin Mazumder'
    })
})

//
// Start the app on 'localhost:3000'
//

app.listen(port, () => {
    console.log('The server has served you. On port ' + port);
});