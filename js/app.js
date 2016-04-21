/* 
- allow user to input location (e.g. "New York City", "California", "Iceland", "10013") & store it somewhere 
- use Flickr place API to fetch the woeID in a json-p object
- use woeID in Flickr search API to fetch images based on user input 
- extract the image data from the object- append to HTML 
- sort images by interestingness
- figure out how to do it again
- also add photographer's name, the date the image was taken, and a link to the Flickr page- style it 
- add buttons to sort by X attribute */


$(document).ready(function() {
	$('.imageSearchBox').submit(function(e){
		e.preventDefault();
		fetchFlickrObject();
	});

	var apiKey = '617d443e314d492176c1b9f46580dfcd';

	var flickrPlaceUrl = "https://api.flickr.com/services/rest/?method=flickr.places.find&jsoncallback=?";


	var fetchFlickrObject = function() {
		var request = {
			api_key: apiKey,
			query: $('.userLocationInput').val()
		};
		
		$.ajax({
			url: flickrPlaceUrl,
			data: request,
			dataType: 'jsonp',
			type: 'GET',
		})
		.done(function(data){
			//Woe = Where on earth (via Flickr)
			console.log(data);
			var woeId = data.places.place[0];
			console.log(woeId);

		});
	};

	var FlickrSearchUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json";

	var getOutdoorImages = function(woeId) {
		var request = {
			woe_id: woeId,
			geo_context: 2,
			content_type: 1,
			api_key: apiKey,
			sort: 'interestingness-desc',
		
		};
		
		$.ajax({
			url: FlickrSearchUrl + '&jsoncallback=?',
			data: request,
			dataType: "jsonp",
			type: "GET",
		})
		.done(function(data){
			//Woe = Where on earth (via Flickr)
			console.log(data);

		});
	};
	getOutdoorImages();


});

