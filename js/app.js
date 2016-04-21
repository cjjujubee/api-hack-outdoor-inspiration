/* 
- allow user to input location (e.g. "New York City", "California", "Iceland", "10013") & store it somewhere 
- use Flickr place API to fetch the woeID in a json-p object
- use woeID in Flickr search API to fetch images based on user input 
- extract the image data from the object- append to HTML 
- sort images by interestingness
- figure out how to do it again
- also add photographer's name, the date the image was taken, and a link to the Flickr page- style it 
- add buttons to sort by X attribute */

var query = "california";

var apiKey = '617d443e314d492176c1b9f46580dfcd';

var url = "https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=617d443e314d492176c1b9f46580dfcd&query=seattle&format=json";


var fetchFlickrObject = function() {
	// var request = {
	// 	api_key: apiKey,
	// 	query: location
	// };
	
	$.ajax({
		url: url + '&jsoncallback=?',
		// data: request,
		dataType: "jsonp",
		type: "GET"
	})
	.done(function(data){
		woeId = data.places.place[0];
		console.log(woeId);

	})
};

fetchFlickrObject()

//Woe = Where on earth (via Flickr)



// var getOutdoorImages = function(tag) {
// 	var request = {
// 		woe_id: getWoeId,
// 		geo_context: 2,
// 		content_type: 1,
// 		api_key: apiKey,
// 		sort: 'interestingness-desc',
	
// 	};
	
// 	$.ajax({
// 		url: url,
// 		data: request,
// 		dataType: "jsonp",
// 		type: "GET",
// 	})