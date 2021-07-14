const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');



console.log(__dirname);
console.log(path.join(__dirname,'../public'));
//Init express to generate a new instance for the application
const app = express();
//Configure the app to use the path to HTML resources in public folder
const resources = path.join(__dirname, '../public');

//To use a different path for the VIEWS/TEMPLATES
const viewPath = path.join(__dirname, '../templates/views');
//Define a different path for HBS partials
const partialsPath = path.join(__dirname, '../templates/partials');



//CONFIGURE THE APP TO USE TEMPLATING FOR
//DYNAMIC CONTENT WITH HBS ENGINE (HANDLE BARS)
app.set('view engine','hbs');
//Tell Express where to find the views/templates 
app.set('views', viewPath);
//Setup static content folder
app.use(express.static(resources));
//Setup HBS partials folder
hbs.registerPartials(partialsPath);

//Route to call the HBS (Handle Bars) page
//Listeting on base root route
app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather App',
        forecast: 'Your day looks bright when using HBS.',
        footer: 'Andres Ayala'

    });
})

//Listening on the /help route
app.get('/help', (req,res) => {
/*     res.send({
        hello: 'Hello my friend',
        message: 'This is under construction',
        names: [{ 
            name: 'Andres'},{
            name: 'lse'
        }
        ]
    }); */
    //Now is using the help.hbs (Handle Bars) file 
    res.render('help', {
        title: 'Help',
        inspirational: 'I\'m here whenever you need me!',
        footer: 'Andres Ayala'
    })
})

//Setting the /about route
app.get('/about', (req,res) => {
    //res.send('<h1>About</h1><br><p>Learning to develop Express/Node applications in Udemy</p>');
    res.render('about', {
        title: 'About page',
        content: 'Geocordinate and weather',
        server: 'NodeJs and Express',
        footer: 'Andres Ayala'

    })

})

//Setting the /weather route
//This route sends back a json object with 
//3 fields
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, {place, latitude, longitude}={}) => {
        if (error) {
            return res.send({
                error
            })
        } else if (place && latitude && longitude) {
          console.log('City: ' + place);
          console.log('Latitute: ' + latitude);
          console.log('Longitude: ' + longitude);
          forecast(latitude, longitude, 'f', (error, {location, region, weatherDescription, temperature, feelsLike, precipitation}={}) => {
            if (error) {
                return res.send({
                    error
                })
              
            } else if (temperature) {
              console.log(chalk.greenBright("The forecast for " + location + " " + region));
              console.log('     ' + chalk.yellowBright(weatherDescription + ".\n     It is currently: " + temperature + " degrees, It feels like: " + feelsLike + " degrees.\n     There is a " + precipitation + "% chance of rain right now."));
              weatherDescription + ".\n     It is currently: " + temperature + " degrees, It feels like: " + feelsLike + " degrees.\n     There is a " + precipitation + "% chance of rain right now."
              res.send({
                  forecast:{
                      location:"The forecast for "+place,
                      weatherDescription,
                      temperature:"It is currently: " + temperature + " degrees, It feels like: " + feelsLike + " degrees.",
                      precipitation:"There is a " + precipitation*100 + "% chance of rain right now."
                  }
              })
            }
          })
        }
      })

   
/*     res.send({
        title: 'It is a beatiful day, go out and enjoy it',
        location: req.query.address,
        footer: 'Andres Ayala'
    }); */

})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term as query parameter"
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }


})

//Setting the route for the 404 page
//We use the wildcard * to catch all the routes that were 
//not defined previously
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help',
        message: 'Help article not found',
        footer: 'Andres Ayala'
    })
})

//Setting the route for the 404 page
//We use the wildcard * to catch all the routes that were 
//not defined previously
app.get('*', (req,res) => {
    res.render('404', {
        title: 'Page not found',
        message: '404 Ups something went wrong...',
        footer: 'Andres Ayala'
    })
})

//This is going to initialize the server to launch
//and start listening on port 3000
app.listen(3000, () => {
    console.log('Server is up and running in port 3000')
})


