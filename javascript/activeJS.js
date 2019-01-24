$(document).ready(function() {

    var queryURL;
    var weatherQueryURL;
    var city;
    var eventDate;
    var activityDate;
    var forecast;
    var dayWeatherIconCode;
    var weatherIcon;


    function buildQueryURL() {

        queryURL = 'https://www.eventbriteapi.com/v3/events/search/?';
        console.log(queryURL);

        var queryParams = '&token=R2LRNHXRFJEYG62UI2Q3';

        console.log(queryParams);

        city = $('#city').val().trim();
        var queryCity = '&location.address=' + city;


        var radius = $('#miles').val().trim();
        var queryRadius = '&location.within=' + radius + 'mi';
       
        queryURL = queryURL + queryRadius + queryCity + queryParams;
    }

    function buildWeatherQueryURL(city) {
        var weatherAPIKey = "21523de10c9a466981da36b75e628021";
        city = $('#city').val().trim();

        var weatherQueryCity = 'q=' + city;

        weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?" + weatherQueryCity + ",us&APPID=" + weatherAPIKey;

    }


    $('#run-search').on('click', function () {
        $("#activities-section").empty();
        event.preventDefault(); 
        buildQueryURL(); //call function to build query
        buildWeatherQueryURL();

        $.when(
            $.getJSON(queryURL),
            $.getJSON(weatherQueryURL)
        ).done(function (response1,response2) {

            console.log(response2);

            response1[0].events.forEach (function(events) {

                eventDate = events.start.local;

                var dateLength = eventDate.length;

                if (dateLength>10) {
                activityDate = eventDate.substr(0,10);
                }

                var eventText = events.name.text;

                var activityImage = events.logo.original.url;

                var activityLink = events.url;

                // Code below gets weather info
                var unixEventDate = moment(activityDate).unix();
                var regEventDate = moment.unix(unixEventDate).format('YYYY-MM-DD');

                for (i=0; i<response2[0].list.length; i++) {
                    var tempDateVar = response2[0].list[i].dt;
                    var regWeatherDate = moment.unix(tempDateVar).format('YYYY-MM-DD');

                    if (regEventDate === regWeatherDate) {
                            forecast = response2[0].list[i].weather[0].main;
                            weatherIconCode = response2[0].list[i].weather[0].icon + '.png';
                            dayWeatherIconCode = weatherIconCode.replace("n","d");
                            weatherIcon = 'http://openweathermap.org/img/w/' + dayWeatherIconCode;
                            
                            break;
                    }
                    else {forecast = 'Weather Not Available Yet For This Date.';
                        weatherIcon='./images/BLANK_ICON.png';
                    }

                }
                
        
                var weatherOnDate = forecast;

                $("#activities-section").append(`
                    <div class="col s12 m7">
                        <div class="card">
                            <div class="card-image">
                                <img src= ${activityImage}>
                            </div>
                                <div class="card-content">
                                    <div class="card-title"> Date: ${activityDate}</div>
                                    <p>Activity: ${eventText}</p><hr>
                                 </div>
                                 <div id = "weather"> Weather Forecast: ${weatherOnDate}
                                     <img id="weather-icon" src=${weatherIcon}>
                                 </div>
                            <div class="card-action">
                                <a href=${activityLink}>Click Here for More Information</a>
                             </div>
                        </div>
                </div>`);

            });


        });
    });

});
//  Scroll to top
$(document).ready(function(){
    $('body').append('<div id="toTop" class="btn btn-info"><span class="glyphicon glyphicon-chevron-up"></span> Back to Top</div>');
      $(window).scroll(function () {
          if ($(this).scrollTop() != 0) {
              $('#toTop').fadeIn();
          } else {
              $('#toTop').fadeOut();
          }
      }); 
  $('#toTop').click(function(){
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
  });
});

