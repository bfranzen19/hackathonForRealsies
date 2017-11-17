// jQuery
$(document).ready(function() {
  console.log('js is linked')

  var map = new google.maps.Map(document.getElementById('map'),{
    center: {lat:40.0149856, lng:-105.2705456},
    zoom: 3,
    mapTypeId: 'terrain'
  });


/*
  var marks = [];
  var marker = new google.maps.Marker({
    position: { lat: 40.016703, lng: -105.281401 },
    map: map
  });
//marks.push(marker);
  var marker = new google.maps.Marker({
    position: { lat: 40.0071104, lng: -105.2581543 },
    map: map
  });
  //marks.push(marker);
  var marker = new google.maps.Marker({
    position: { lat: 39.9999177, lng: -105.263087 },
    map: map
  });
  //marks.push(marker);
  var marker = new google.maps.Marker({
    position: {lat:40.0149856, lng:-105.2705456},
    map: map
  });
  //marks.push(marker);
*/

  var autocomplete = new google.maps.places.Autocomplete(place);
  autocomplete.bindTo('bounds', map);


  $('#searchBtn').on('click', function(event) {
    event.preventDefault();

    //console.log(event);
    var searchWhatToDo = $('#whatToDo').val();
    var searchPlaceToGo = $('#place').val();

    var searchTerm =  {
      searchWhat : searchWhatToDo,
      searchPlace : searchPlaceToGo
    }

    var resultsArr = [];
    $.post('/search', searchTerm, (dataFromServer) => {
      //console.log(dataFromServer, 'Server Data');

//console.log(dataFromServer.GooglePlace.location);

resultsArr = dataFromServer.map(function(element){
  return(new google.maps.Marker({
    position: element.location,
    map: map
  }));

console.log(resultsArr, 'result maian 68');

});





       var displayDetails = new Vue({
           el:'#displayMe',
           data:{
             dataList : dataFromServer
             }
       });


    });
  });
});  // end of jQ doc ready
