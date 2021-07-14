const request = require('request');
const globalTunnel = require('global-tunnel-ng');
const weatherStack_key='e18c16a219b589dfda6f0c80db254f2a';

const forecast = (latitude,longitude, units, callbackFunction) => {
    var weatherUrl = 'http://api.weatherstack.com/current?access_key='+weatherStack_key+'&query='+latitude+','+longitude+'&units='+units;
    console.log(weatherUrl);
    request({url: weatherUrl, json: true}, (error, {body}= {}) => {
      if(error){
        callbackFunction('Unable to connect to Weather service! ' + error,undefined)
      } else if(body.error){
        callbackFunction(body.error.info, undefined)
      } else if (body){
        callbackFunction(undefined, {
          location: body.location.name,
          region: body.location.region,
          weatherDescription: body.current.weather_descriptions[0],
          temperature: body.current.temperature,
          feelsLike: body.current.feelslike,
          precipitation: body.current.precip
        })
      }
    })
  
  }

  module.exports = forecast

  