$(document).ready(function() {

    var queryURL;
    var weatherQueryURL;
    var city;
    var eventDate;
    var activityDate;
    var forecast;


    function buildQueryURL() {


        queryURL = 'https://www.eventbriteapi.com/v3/events/search/?';
        console.log(queryURL);


        var queryParams = '&token=R2LRNHXRFJEYG62UI2Q3';

        // https://www.eventbriteapi.com/v3

        // R2LRNHXRFJEYG62UI2Q3

        // var pages = '&current_page=1&per_page=10&sort=distance';

        // var excludeChildren = '&exclude_children=false';

        console.log(queryParams);

        var activity = $('#search').val().trim();
        var queryActivity = 'q=' + activity;

        // console.log(activity);
        console.log(queryActivity);

        city = $('#city').val().trim();
        var queryCity = '&location.address=' + city;
        // console.log('The city is:'+city);

        console.log(queryCity);

        // var state = $('#state').val().trim();
        // var queryState = '&state=' + "mi" + state;
        // console.log(queryState);

        var radius = $('#miles').val().trim();
        var queryRadius = '&location.within=' + radius + 'mi';
        console.log(queryRadius);

        var weatherStartDate = moment().format('YYYY-MM-DD');
        var weatherEndDate = moment(startDate).add(5, 'days').format('YYYY-MM-DD');
        
        console.log(weatherStartDate);
        console.log(weatherEndDate);


        var startDate = weatherStartDate;
        var queryStartDate = '&start_date=' + startDate + '..'; //two periods at end tell API request to search from that date forward
        console.log(queryStartDate);

        var endDate = moment(startDate).add(1, 'y').format('YYYY-MM-DD');
        var queryEndDate = endDate;
        console.log(queryEndDate);

        // queryState + queryStartDate + queryEndDate + queryActivity
        queryURL = queryURL + queryRadius + queryCity + queryParams;
        console.log(queryURL);
    }

    function buildWeatherQueryURL(weatherStartDate,weatherEndDate,city) {
        var weatherAPIKey = "21523de10c9a466981da36b75e628021";
        city = $('#city').val().trim();

        var weatherQueryCity = 'q=' + city;

        weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?" + weatherQueryCity + ",us&APPID=" + weatherAPIKey;

        console.log(weatherQueryURL);

    }





    $('#run-search').on('click', function () {
        event.preventDefault(); 
        buildQueryURL(); //call function to build query
        buildWeatherQueryURL();

        //     //Data request using AJAX GET request
        //     $.ajax({
        //         url: queryURL, //!!!!!queryURL not getting passed here yet, probably because var set within function
        //         method: "GET",
        //         // contentType: 'application/json',
        //         // dataType: 'jsonp',
        //         beforeSend: function(xhr){
        //           xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        //           // xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
        //           xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, Content-Type, X-Auth-Token");
        //           xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        //         },
        //       }).then(function (response) {
        //         $("#activities-section").text(JSON.stringify(response));
        //         console.log(response);
        //       });


        
        // $.ajax({
        //     url: queryURL, 
        //     method: "GET",
        //     headers: {
        //         'Access-Control-Allow-Credentials': true,
        //         'Access-Control-Allow-Origin': 'http://api.amp.active.com',
        //         'Access-Control-Allow-Methods': 'GET',
        //         'Access-Control-Allow-Headers': 'application/json',
        //     }
        // }).then(function (response) {
        //     $("#activities-section").text(JSON.stringify(response));
        //     console.log(response);
        // });

        // window.location.href = "activity_page.html";

        $.when(
            $.getJSON(queryURL),
            $.getJSON(weatherQueryURL)
        ).done(function (response1,response2) {
            // $("#activities-section").text(JSON.stringify(response));
            console.log(response1);
            console.log(response2);

    

            response1[0].events.forEach (function(events) {

            //   $("#activities-section").append('Activity Date: ' + event.activityStartDate + '<hr>');
                


                eventDate = events.start.local;

                var dateLength = eventDate.length;

                if (dateLength>10) {
                activityDate = eventDate.substr(0,10);
                }

                // $("#activities-section").append('<p> Activity End Date: '+ event.activityEndDate +'</p>');

                var eventText = events.name.text;
                console.log(eventText);
            
                // $('img').remove();


                var activityImage = events.logo.original.url;
                console.log(activityImage);

                var activityLink = events.url;

                // $('.card-image-top').attr('src', activityImage);
            

                // var len = eventText.length;
            
                // if(len>500) {
                //     var shortStr = eventText.substr(0,500)+'...';
                // }

                // Immediatly below code gets weather info
                var unixEventDate = moment(activityDate).unix();
                // console.log(unixEventDate);

                for (i=0; i<response2[0].list.length; i++) {
                    // console.log('i = '+ i)
                    var tempDateVar = response2[0].list[i].dt;
                    // console.log('Date from weather array is :'+ tempDateVar);
                    // var whatTempDate = typeof(tempDateVar);
                    // var whatUnixDate = typeof(unixEventDate);

                    // console.log(whatTempDate);
                    // console.log(whatUnixDate);
                    
                    // console.log(unixEventDate);

                    if (unixEventDate = tempDateVar) {
                        // console.log('It Matches');
                    
                    
                        switch (response2[0].list[i].dt) {
                            case unixEventDate:

                            // console.log('Made it Here!!!!!!!');
                            forecast = response2[0].list[i].weather[0].main;
                            weatherIconCode = response2[0].list[i].weather[0].icon;

                            // console.log('Forecast is for :' + forecast); 
                            break;

                            default:

                            forecast = 'Weather Not Available Yet For This Date.';
                            weatherIconCode = "";

                        }
                    }

                }
                
        
                var weatherOnDate = forecast;
                // console.log(weatherOnDate);
                // console.log(weatherIconCode);
                var weatherIcon = 'http://openweathermap.org/img/w/' + weatherIconCode +'.png';
                // var weatherIcon = response2[0].list[0].weather[0].icon;
            
            

                // $("#activities-section").append('\
                // <div class = "card-deck shadow p-3 mb-5 bg-white rounded activity-card">\
                //     <div class = "card">\
                //         <img class="card-img-top" src="'+ activityImage + '"  alt="Card image cap">\
                //             <div class = "card-header activity-card-header">Activity Date: ' + activityDate + '\
                //                 <div class= "card body activity-card-body">\
                //                     <p class = "activity-text"> Activity Description: '+ eventText +'</p><hr>\
                //                     <div id = "weather"> Weather Forecast: '+ weatherOnDate +'\
                //                     <img id="weather-icon" src="' + weatherIcon +'" alt="Icon for Current Weather">\
                //                     </div>\
                //                 </div>\
                //             </div>\
                //     </div>\
                // </div>');

                $("#activities-section").append(`
                <div class="row">
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
                                     <img id="weather-icon" src=${weatherIcon} alt="Icon for Current Weather">
                                 </div>
                            <div class="card-action">
                                <a href=${activityLink}>Click Here for More Information</a>
                             </div>
                        </div>
                    </div>
                </div>`);


            });


        });
    });

});

// 

//'<img class="card-img-top" src="'+ activityImage + '"  alt="Card image cap">