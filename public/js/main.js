// jQuery
$(document).ready(function () {
    console.log('js is linked')

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



    //    // Vue
    //    var displayDetails = new Vue({
    //        el: '#displayMe',
    //        data: {
    //            dataList: [],
    //            panelStrings: []
    //        },
    //        // methods: {
    //        //     addHtml: function(event){
    //        //         if (event){
    //        //             event.preventDefault();
    //        //         }
    //        //         console.log('ran');
    //        //         console.log(this.dataList[0])
    //        //         for(var i =0; i<this.dataList.length;i++){
    //        //             this.dataList[i].panelString =
    //        //                 `
    //        //          <div class="card-header" role="tab" id="heading${i}">
    //        //              <h5 class="mb-0">
    //        //                  <a class="collapsed" data-toggle="collapse" href="#collaps${i}" aria-expanded="false" aria-controls="collapse${i}">${this.dataList[i].name} ${this.dataList[i].rating}</a>
    //        //              </h5>
    //        //          </div>
    //        //          <div id="collaps${i}" class="collapse" role="tabpanel" aria-labelledby="heading${i}" data-parent="#accordion">
    //        //              <div class="card-body">Latitude: ${this.dataList[i].location.lat}, Longitute: ${this.dataList[i].location.lng}</div>
    //        //          </div>
    //        //      `;
    //
    //
    //        //         };
    //        //     }
    //        // }
    //    });
    // End Vue

    $('#searchBtn').on('click', function (event) {
        event.preventDefault();

        //console.log(event);
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
            console.log(resultsArr[0].map, 'result main 125');


            // displayDetails.dataList = dataFromServer;


            console.log(map, ' main 123')






            //
            var displayDetails = new Vue({
                el: '#displayMe',
                data: {
                    dataList: dataFromServer
                },
                methods: {
                    collapse: function () {
                        console.log('Click Me')
                    }
                }
            });
            //
            //
            //      // displayDetails.addHtml();
            //      console.log(displayDetails.dataList);


        });
    });
}); // end of jQ doc ready
