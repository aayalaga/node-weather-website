const request = require('request');
const chalk = require('chalk');
const globalTunnel = require('global-tunnel-ng');
//Geocoding with callback format
//First argument is a string to input the city
//Second argument is the name of the callback function to be implemented
//In this case callbackFunction will have to arguments (error, data)
const geocode = (city, callbackFunction) =>  {
    const mapBoxToken='pk.eyJ1IjoiY29yc2FyaW9heWFsYSIsImEiOiJja3BxczM5d2kwOTRvMnZwbzBhajM3eDZrIn0.2PWtifgRKExpRnqZkCyAdw'
    const mapBoxEndpoint='mapbox.places/'
    const mapBoxAPIHost='https://api.mapbox.com/geocoding/v5/';
    const recordsLimit='1'
    const url=mapBoxAPIHost+mapBoxEndpoint+encodeURIComponent(city)+'.json?access_token='+mapBoxToken+'&limit='+recordsLimit;
    
    console.log(url);
    //We are using short hand for url because it is the same name as the variable url
    request({url, json: true}, (error,{body}={}) => {
      if(error){
        callbackFunction('Unable to connect to location services',undefined);
  
      } else if (!body.features || body.features.length === 0) {
        console.log(body)
        console.log('Length '+body.features.length)
        callbackFunction('Unable to find location. Try a different search.',undefined);
  
      } else {
        //console.log(body)
        //console.log('Length '+body.features.length)
        console.log(body.features[0].place_name + ' '+ body.features[0].center[1]+' '+body.features[0].center[0])
        callbackFunction(undefined, {
          place: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0]
        })
      }
    })
  }

  module.exports = geocode