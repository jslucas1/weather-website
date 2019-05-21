const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Defin paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs'); //setup handlebars templates
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

// route to index handlebars homepage
app.get('', (req, res) =>{


    res.render('index',{
        title: 'Weather',
        name: 'Jeff Lucas'
    });
})

// route to about handlebars page
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Jeff Lucas'});
})

// route to help page 
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Jeff Lucas',
        message: 'Our first help message'
    });
})

// route to weather page
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {   
        if(error){
           return res.send({
               error: error 
            }) 
        }   
        // this code will only run if we don't have an error
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({
                    error: error
                })
            } else {
                res.send({
                    address: req.query.address,
                    forecast: forecastData,
                    location: location
                });
            }
        })
    })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search);
    res.send({
        products: []
    });
    

})

// route for 404 for help page 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Jeff Lucas',
        message: 'Help article not found'})
})

// route for 404 page not found
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Jeff Lucas',
        message: 'Page not found'})
})

//start server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});