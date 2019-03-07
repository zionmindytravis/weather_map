'use strict';

// function display (data) {
//     var weatherData = data;
//     console.log("weatherData: + weatherData);
// }

// $.ajax('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/29.4241,-98.4936')
//     .done(display)

$().ready(function() {
var weatherData = $.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/29.4241,-98.4936');

//add san antonio conditions

weatherData.done(function (data) {
   $('#today').html(buildDays(data));
});

function buildDays(data) {
   var today = new Date(data.daily.data[0].time * 1000);
   console.log(today);
   console.log(data.daily.data[0].summary);
   console.log(data.daily.data[0].apparentTemperatureHigh);
   console.log(data.daily.data[0].apparentTemperatureLow);
   console.log(data.daily.data[0].humidity);
   console.log(data.daily.data[0].pressure);
   console.log(data.daily.data[0].windSpeed);
   console.log(data);
   var html ='';

   html += '<div class="row mx-auto"><h4>' + 'Today' + '<br>' + '</h4>' + today + '</div>';
   html += '<div class="row">';
   html += '<div class="col">'
   html += '<div id="icon"></div>';
   html += '<div>' + data.daily.data[0].summary + '</div>';
   html += '</div>';
   html += '<div class="col">' + data.daily.data[0].apparentTemperatureHigh + '<br>' + data.daily.data[0].apparentTemperatureLow + '</div>';
   html += '</div>';
   html += '<div class="row"><ul class="list-inline">';
   html += '<li class="list-inline-item">' + data.daily.data[0].humidity + '</li>';
   html += '<li class="list-inline-item">' + data.daily.data[0].pressure + '</li>';
   html += '<li class="list-inline-item">' + data.daily.data[0].windSpeed + '</li>';
   html += '</ul></div>';

   return html
}

console.log("hello" + weatherData);

});