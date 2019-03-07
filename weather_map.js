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
   console.log(data);

   var dataToday = buildDays('Today', data.daily.data[0]);
   var dataTomorrow = buildDays('Tomorrow', data.daily.data[1]);
   var dataDayAfter = buildDays('The Day After', data.daily.data[2]);

   $('#today').html(buildHTML(dataToday));
   $('#tomorrow').html(buildHTML(dataTomorrow));
   $('#dayAfter').html(buildHTML(dataDayAfter));
});


function buildDays(title, data) {
   return {
      title: title,
      today: new Date(data.time * 1000),
      summary: data.summary,
      hiTemp: Math.round(data.apparentTemperatureHigh) + '°F',
      loTemp: Math.round(data.apparentTemperatureLow) + '°F',
      humidity: 'Humidity: ' + data.humidity,
      pressure: 'Pressure: ' + data.pressure,
      windSpeed: 'Wind Speed: ' + data.windSpeed
   }
}


function buildHTML(data) {

   var html ='';

   html += '<div class="row mx-auto"><h4>' + data.title + '<br></h4>';
   html += data.today + '</div><div class="row"><div class = "col">';
   html += '<div id="icon"></div><div>' + data.summary + '</div>';
   html += '</div><div class="col">' + data.hiTemp + '<br>';
   html += data.loTemp + '</div></div><div class="row">';
   html += '<ul class="list-inline"><li class="list-inline-item">';
   html += data.humidity + '</li><li class="list-inline-item">';
   html += data.pressure + '</li><li class="list-inline-item">';
   html += data.windSpeed + '</li></ul></div>';

   return html
}

});