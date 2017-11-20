console.info('Yelper - Starting');
console.log('=-=-=-=-=-=-=-=-=-=-=')

var exports = module.exports = {};

class Yelp {

    constructor(yelpID, name, imageUrl, locUrl, review_count, rating, coordinates, location) {
        this.yelpID = yelpID;
        this.name = name;
        this.imageUrl = imageUrl;
        this.locUrl = locUrl;
        this.review_count = review_count;
        this.rating = rating;
        this.coordinates = coordinates;
        this.location = location;

    }

    displayYelpResult() {
        var resultStr = null;
        resultStr = `The Yelp ID: ${this.yelpID} and the location name: ${this.name}.  We found ${this.review_count} reviews and a rating of: ${this.rating}`;

        return (resultStr);

    }

}

exports.processYelpData = function (location) {
    //  console.log('yelpdata 31', location);
    var yelpLoc = new Yelp(location.id, location.name, location.image_url, location.url, location.review_count, location.rating, location.coordinates, location.location)
    //  console.log('yelpdata 33', yelpLoc);

    return (yelpLoc);
}
