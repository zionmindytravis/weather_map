'use strict';

console.log('Hello World');

// function display (data) {
//     var weatherData = data;
//     console.log("weatherData: + weatherData);
// }

// $.ajax('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/29.4241,-98.4936')
//     .done(display)


var weatherData = $.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/29.4241,-98.4936');

weatherData.done(function (data) {
   console.log(data);
});

console.log("hello" + weatherData);