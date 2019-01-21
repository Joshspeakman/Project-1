//Example API Response

// http://api.amp.active.com/v2/search/?radius=20&city=Denver&state=CO&query=marathon&current_page=1&per_page=10&sort=distance&start_date=2019-01-01..&exclude_children=false&api_key=3bxc5qpjw2rq4ffsnssvztxk
var queryURL;


function buildQueryURL() {


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



$('#run-search').on('click', function () {
    event.preventDefault(); //halts bubble up which prevents page reload
    buildQueryURL(); //call function to build queru

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
          
           $('img').removeAttr('src');

          var activityImage = event.logoUrlAdr;
          console.log(activityImage);
          

          var len = eventText.length;
          
          if(len>500) {
              var shortStr = eventText.substr(0,500)+'...';
          }

          $("#activities-section").append('<div class = "card-deck shadow p-3 mb-5 bg-white rounded activity-card"><div class = "card-header activity-card-header">Activity Date: ' + activityDate + '<div class= "card body activity-card-body"><p class = "activity-text" Activity Description: '+ shortStr +'</p></div><div></div>');

        //   var backgroundImg = event.logoUrlAdr;
        //   $('.activity-card-body').css('background-image', 'url(' + backgroundImg + ')');


        });




    })
});

function limit_dates() {
 
}





// console.log(queryURL);
