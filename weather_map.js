'use strict';

// function display (data) {
//     var weatherData = data;
//     console.log("weatherData: + weatherData);
// }

// $.ajax('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/29.4241,-98.4936')
//     .done(display)

$().ready(function() {

var lat = 29.4241;
var long = -98.4936;
var weatherData = $.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/' + lat + ', ' + long);

var conditionsArray = [
   {
      condition: 'clear-day',
      icon:'icon/Sun.svg'
   }, {
      condition: 'clear-night',
      url:'icon/Moon.svg'
   }, {
      condition: 'rain',
      icon:'icon/Cloud-Rain.svg'
   }, {
      condition: 'snow',
      icon:'icon/Snowflake.svg'
   }, {
      condition: 'sleet',
      icon: 'icon/Cloud-Snow-Alt.svg'
   }, {
      condition: 'wind',
      icon: 'icon/Wind.svg'
   }, {
      condition: 'fog',
      icon:'icon/Cloud-Fog.svg'
   }, {
      condition: 'cloudy',
      icon:'icon/Cloud.svg'
   }, {
      condition: 'partly-cloudy-day',
      icon:'icon/Cloud-Sun.svg'
   }, {
      condition: 'partly-cloudy-night',
      icon: 'icon/Cloud-Moon.svg'
   }];

//add san antonio conditions

weatherData.done(function (data) {
   console.log(data);

   var dataToday = buildDays('Today', data.daily.data[0]);
   var dataTomorrow = buildDays('Tomorrow', data.daily.data[1]);
   var dataDayAfter = buildDays('The Day After', data.daily.data[2]);

   $('#today').html(buildHTML(dataToday, conditionsArray));
   $('#tomorrow').html(buildHTML(dataTomorrow, conditionsArray));
   $('#dayAfter').html(buildHTML(dataDayAfter, conditionsArray));
});

   function customWeather(data) {
      console.log(data);

      var dataToday = buildDays('Today', data.daily.data[0]);
      var dataTomorrow = buildDays('Tomorrow', data.daily.data[1]);
      var dataDayAfter = buildDays('The Day After', data.daily.data[2]);

      $('#today').html(buildHTML(dataToday, conditionsArray));
      $('#tomorrow').html(buildHTML(dataTomorrow, conditionsArray));
      $('#dayAfter').html(buildHTML(dataDayAfter, conditionsArray));
   }


function buildDays(title, data) {
   return {
      title: title,
      today: new Date(data.time * 1000),
      summary: data.summary,
      icon: data.icon,
      hiTemp: Math.round(data.apparentTemperatureHigh) + '°F',
      loTemp: Math.round(data.apparentTemperatureLow) + '°F',
      humidity: 'Humidity: ' + data.humidity,
      pressure: 'Pressure: ' + data.pressure,
      windSpeed: 'Wind Speed: ' + data.windSpeed
   }
}
// function findIcon(icon, conditionsArray) {
//
//    conditionsArray.forEach(function(condition) {
//       if (icon === condition.condition) {
//          console.log(condition.icon);
//          console.log(typeof condition.icon);
//          return condition.icon;
//       }
//    });
//
//    // return conditions[1].icon;
// }


function buildHTML(data, conditionsArray) {

   var html ='';

   var weatherPicture = '';

   conditionsArray.forEach(function(condition) {
      if (data.icon === condition.condition) {
         weatherPicture = condition.icon;
      }
   });

   html += '<div class="row mx-auto"><h4>' + data.title + '<br></h4>';
   html += data.today + '</div><div class="row"><div class = "col">';
   html += '<div id="icon">' + '<img src="' + weatherPicture + '">';
   html += '</div><div>' + data.summary + '</div>';
   html += '</div><div class="col">' + data.hiTemp + '<br>';
   html += data.loTemp + '</div></div><div class="row">';
   html += '<ul class="list-inline"><li class="list-inline-item">';
   html += data.humidity + '</li><li class="list-inline-item">';
   html += data.pressure + '</li><li class="list-inline-item">';
   html += data.windSpeed + '</li></ul></div>';

   return html;
}

$('#submit').on('click', function() {
   lat = $('#lat').val();
   long = $('#long').val();
   $.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkskyToken + '/' + lat + ',' + long)
      .done(customWeather)
})

});