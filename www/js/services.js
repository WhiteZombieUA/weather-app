'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
  function($q, $resource, $http, FORECASTIO_KEY) {
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    var weatherResource = $resource(url, {
      callback: 'JSON_CALLBACK',
    }, {
      get: {
        method: 'JSONP'
      }
    });

    return {
      //getAtLocation: function(lat, lng) {
      getCurrentWeather: function(lat, lng) {
        return $http.jsonp(url + lat + ',' + lng + '?units=si&callback=JSON_CALLBACK');
      }
    }
  }];

angular.module('starter.services', ['ngResource'])
  .factory('Cities', function() {
    var cities = [
      { id: 0, name: 'Miami', lat: 25.7823 , lgn: -80.2310 },
      { id: 1, name: 'New York City', lat: 40.7059 , lgn: -73.9780 },
      { id: 2, name: 'London', lat:51.5288, lgn: -0.1015 },
      { id: 3, name: 'Los Angeles', lat: 34.0210 , lgn: -118.4117 },
      { id: 4, name: 'Lviv' ,lat: 49.8327 , lgn: 24.0122  },
      { id: 5, name: 'Frankfurt' ,lat:50.1213 , lgn: 8.6365 },
      { id: 6, name: 'New Delhi' ,lat:28.6472 , lgn: 77.0932 }
    ];

    return {
      all: function() {
        return cities;
      },
      get: function(cityId) {
        // Simple index lookup
        return cities[cityId];
      }
    }
  }).
  factory('DataStore', function() {
    //create datastore with default values
    var DataStore = {
      city:       'Lviv',
      latitude:   49.8444,
      longitude:  24.0254};

    DataStore.setCity = function (value) {
      DataStore.city = value;
    };

    DataStore.setLatitude = function (value) {
      DataStore.latitude = value;
    };

    DataStore.setLongitude = function (value) {
      DataStore.longitude = value;
    };

    return DataStore;
  })
  .factory('Weather', forecastioWeather);
