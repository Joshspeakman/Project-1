//Example API Response

// http://api.amp.active.com/v2/search/?radius=20&city=Denver&state=CO&query=marathon&current_page=1&per_page=10&sort=distance&start_date=2019-01-01..&exclude_children=false&api_key=3bxc5qpjw2rq4ffsnssvztxk
var queryURL;


function buildActiveQuery() {


    queryURL = 'https://api.amp.active.com/v2/search/?';
    console.log(queryURL);


    var queryParams = '&api_key=3bxc5qpjw2rq4ffsnssvztxk';

    var pages = '&current_page=1&per_page=10&sort=distance';

    var excludeChildren = '&exclude_children=false';

    console.log(queryParams);

    var activity = $('#activity-term').val().trim();
    var queryActivity = '&query=' + activity;

    // console.log(activity);
    console.log(queryActivity);

    var city = $('#city-term').val().trim();
    var queryCity = '&city=' + city;
    // console.log('The city is:'+city);

    console.log(queryCity);

    var state = $('#state-term').val().trim();
    var queryState = '&state=' + state;
    console.log(queryState);

    var radius = $('#max-radius').val().trim();
    var queryRadius = 'radius=' + radius;
    console.log(queryRadius);

    var weatherStartDate = moment().format('YYYY-MM-DD');
    var weatherEndDate = moment(startDate).add(5, 'days').format('YYYY-MM-DD');
    
    console.log(weatherStartDate);
    console.log(weatherEndDate);


    var startDate = $('#start-date').val().trim();
    var queryStartDate = '&start_date=' + startDate + '..'; //two periods at end tell API request to search from that data forward
    console.log(queryStartDate);

    var endDate = $('#end-date').val().trim();
    var queryEndDate = endDate;
    console.log(queryEndDate);

    queryURL = queryURL + queryRadius + queryCity + queryState + queryStartDate + queryEndDate + queryActivity + pages + excludeChildren + queryParams;
    console.log(queryURL);
}



$('#run-search').on('click', function () { //begin user submit event

    event.preventDefault(); //halts bubble up which prevents page reload
    buildActiveQuery(); //call function to build queru

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

    $.getJSON(queryURL, function (response) {
        // $("#activities-section").text(JSON.stringify(response));
        console.log(response);

 
 
        response.results.forEach (function(event) {

        //   $("#activities-section").append('Activity Date: ' + event.activityStartDate + '<hr>');

          var eventDate = event.activityStartDate;

          var dateLength = eventDate.length;

          if (dateLength>10) {
            var activityDate = eventDate.substr(0,10);
        }

          // $("#activities-section").append('<p> Activity End Date: '+ event.activityEndDate +'</p>');

          var eventText = event.assetDescriptions[0].description;

          var len = eventText.length;
          
          if(len>500) {
              var shortStr = eventText.substr(0,500)+'...';
          }

          $("#activities-section").append('<div class = "card shadow p-3 mb-5 bg-white rounded activity-card"><div class = "card-header activity-card-header">Activity Date: ' + 
            activityDate +'<div class= "card body activity card body"><p id="weather" class ="activity-text" Activity Description: '+ shortStr +'</p></div><div></div>');

        });

    }) //end active getJSON

    // OPEN WEATHER AJAX ------------------------------------------------------------
    var APIKey = "21523de10c9a466981da36b75e628021";
   
    var city = $('#city-term').val().trim();
    var queryCity = 'q=' + city;

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + queryCity + ",us&APPID=" + APIKey;

    // run AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // store retrieved data inside response object
        .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

            $("#weather").append(response.list[0].weather[0].main);


    }); //end openweather ajax 

  

})//end user submit event 
