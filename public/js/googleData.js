console.info('Googler - Starting');
console.log('=-=-=-=-=-=-=-=-=-=-=')

var exports = module.exports = {};

class GooglePlace {

    constructor( name, rating, placeID, location, yelpData) {

        this.name = name;
        this.rating = rating;
        this.placeID = placeID;
        this.location = location;
        this.yelpData = yelpData;

    }

}

exports.processGoogleData = function(googlePlace){
var googleLoc = new GooglePlace(googlePlace.name, googlePlace.rating, googlePlace.id, googlePlace.geometry.location);
return googleLoc;
};
