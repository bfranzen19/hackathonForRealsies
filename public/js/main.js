// jQuery
$(document).ready(function () {
    console.log('js is linked')
    $("#accordion").toggle();

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.0149856,
            lng: -105.2705456
        },
        zoom: 4,
        mapTypeId: 'terrain',
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    }, {

        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: true
    });



    var inpPlace = document.getElementById('place')

    var autocomplete = new google.maps.places.Autocomplete(inpPlace);
    autocomplete.bindTo('bounds', map);


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



    $('#searchBtn').on('click', function (event) {
        event.preventDefault();

        var searchWhatToDo = $('#whatToDo').val();
        var searchPlaceToGo = $('#place').val();

        var searchTerm = {
            searchWhat: searchWhatToDo,
            searchPlace: searchPlaceToGo
        }


        var resultsArr = [];
        $.post('/search', searchTerm, (dataFromServer) => {
            resultsArr = dataFromServer.map(function (element, index) {

                if (index === 0) {
                    map.setZoom(10);
                    map.setCenter(element.location);
                }


                //console.log(element.location)
                return (new google.maps.Marker({
                    position: element.location,
                    map: map
                }));

            });

            var displayDetails = new Vue({
                el: '#displayMe',
                data: {
                    dataList: dataFromServer,
                },
                methods: {
                    getYelp: function (googLoc) {
                        $.get('/yelpSearch', googLoc, (dataFromServer) => {
                            console.log(dataFromServer, 'main 104 yelpSearch')
                        })
                    }
                }
            });
        });


        $("#accordion").toggle();
    });

    $('#yelpSearchBtn').click(function () {

    })


}); // end of jQ doc ready
