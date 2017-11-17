// i work

var express = require('express');
var app = express();

var request = require('request');
var bodyParser = require('body-parser');
var google = require('googleapis');

var yelpStuff = require('./public/js/yelpData');
var googleStuff = require('./public/js/googleData');


// google places API key
// const key = 'AIzaSyCditWW_QbHS5b178NVjooCD4Fh3QocDBY'; // bt
// const key = 'AIzaSyBgKtLj3nXJOMVpkQ_ENKb_qMa3ioxeamE';
// const key = 'AIzaSyBeVcb5qQbkrqEZVBFcFK31FSnuK7qt_DM'; // bt
const key = 'AIzaSyB_yfGwMryurHa2DyxgAlsoQWwQmm90GZA'

//yelp info
var clientId = 'UtyLSFBLA3jr8SlJOJqo5w';
var clientSecret = 'zO1EZZ8xEjvYOphOynISAFIBDierIKR72nuCZBlhR64l1RAbwzmKY8ZtD8xYz6Gg';
var theToken = 'JqH4ujv0z1eIH77HlYIbMtPkbEQwFON9TwVRiHfl0LexSjSfj4gyNBgRcDvS9Zc84ob3imo5zWuZC68YdvmCQLE8aTxlHG-fDiv5aXp6iWBcV-Nlzli4MEioed0JWnYx';

const yelp = require('yelp-fusion');
const yelpClient = yelp.client(theToken);


app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', function(req,res) {
  res.sendFile('./public/html/index.html', {root:'./'});
});

var searchPlaceOrig = null;
var searchWhatOrig = null;

// current search input
//var query = 'Denver, CO, United States'

// google places api request
app.post('/search', function(req,res) {
  //console.log(req.body, 'server 46');
searchPlaceOrig = req.body.searchPlace;
searchWhatOrig = req.body.searchWhat;

var query2 = req.body.searchWhat + ' ' + req.body.searchPlace;
console.log(query2,'server 54 q-2')

  request({
    url:
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query2}&rankby=prominence&key=${key}`
  },
  function(error, response, reqQuery) {
    if(error || (response.statusCode !== 200) || response.status === 'OVER_QUERY_LIMIT') {
      console.log('error: ', error)
      console.log('status code: ', response.statusCode)
      res.send('oops...');
    } else {
      //console.log(reqQuery);
      var reqQueryAsObj = JSON.parse(reqQuery);
      //console.log(reqQueryAsObj.results);

      var placeID = reqQueryAsObj.results[0].place_id;

      // place details request
      request({
        url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${key}`
      }, function(error, response, req) {
        if(error || (response.statusCode !== 200)) {
          console.log('error: ', error)
          console.log('status code: ', response.statusCode)
          res.send('oops...')
        } else {
          var reqAsObj = JSON.parse(req);
          let length = reqQueryAsObj.results.length;
          let top20 = [];

          var workArr = Array.from(reqQueryAsObj.results);
          var yelpResults = [];

          workArr.forEach(function(element){
            console.log(element.name, 'server 87');
            yelpResults = getYelp(element.name);
            // console.log(yelpResults, 'server 89');
            //var googleLoc = googleStuff.processGoogleData(element, yelpResults);
            var googleLoc = googleStuff.processGoogleData(element);

          console.log(top20, 'top20');
            top20.push(googleLoc);

            //console.log(top20, 'top20 server 112');


    });

          // // sends the top20 array back to the main.js
          res.send(top20);

        }
      });
    }
  });

});  // end of google places api get request

function getYelp(googPlace){
  var yelpLocations = [];
 if(searchWhatOrig === ''){
   searchWhatOrig = 'coffee';
 }


    yelpClient.search({
      term: searchWhatOrig,
      location: googPlace,
      limit : 3
  }).then(response => {
      var yelpDataArr = Array.from(response.jsonBody.businesses);
      yelpDataArr.forEach(function (yelpReturnData) {
        //googleLoc.yelpData = yelpStuff.processYelpData(yelpReturnData);
       // console.log('server 103', gPlaceData.yelpData);
      //gPlaceData.yelpData = yelpStuff.processYelpData(yelpReturnData);
        //console.log(gPlaceData, 'server 100');
        yelpLocations.push(yelpStuff.processYelpData(yelpReturnData));
        //return(gPlaceData);

      });
      return(yelpLocations);
      console.log(yelpLocations, 'yelp locs');
      console.log('Sent Something');
      console.log('=-=-=-=-=-=-=-=-=-=-=');

  }).catch(e => {
      console.log(e);
  });


}



// app.post('/yelpMe', function (req, res) {
// console.log('yelpMe');
//   client.search({
//         term: 'Loveland Coffee',
//         //location: 'loveland, co'
//         location: '80538'
//         //term: 'Four Barrel Coffee',
//         //location: 'san francisco, ca'
//     }).then(response => {


//         //console.log(response.jsonBody.businesses, 'business');
//         var temp = Array.from(response.jsonBody.businesses)
//         // console.log(temp);

//         temp.forEach(function (element) {
//             yelpLocations.push(yelpStuff.processYelpData(element));

//         })

//         console.log('Sent Something')
//         //      console.log('******Locations******', yelpLocations, '&&&&&&&&&Locations&&&&&&&&&');
//         //console.log(response.jsonBody.businesses, 'business');
//         //    console.log(response.jsonBody.businesses[0].name);
//         console.log('=-=-=-=-=-=-=-=-=-=-=')
//         res.send(yelpLocations)
//     }).catch(e => {
//         console.log(e);
//     });


// })


/* -=-=-=-=-=-=- 404 catch -=-=-=-=-=-=- */
app.use(function(request,response) {
  response.send(`hmm. that's a 404, yo!`)
})

/* -=-=-=-=-=-=- app listen -=-=-=-=-=-=- */
app.listen(8080, function() {
  console.log('app running on port 8080')
})
