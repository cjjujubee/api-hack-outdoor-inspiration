/* 
- allow user to input location (e.g. "New York City", "California", "Iceland", "10013") & store it somewhere 
- use Flickr place API to fetch the woeID in a json-p object
- use woeID in Flickr search API to fetch images based on user input 
- extract the image data from the object- append to HTML 
- figure out how to do it again
- style it (e.g. layout, typography, color scheme, engaging core features)
- add buttons to sort by X attribute */


$(document).ready(function() {
	$('.imageSearchBox').submit(function(e){
		e.preventDefault();
		$('.imageDisplay').html("");
		fetchFlickrObject();
		$('form')[0].reset();
	});

	$('.seattle').click(function(e){
		e.preventDefault();
		$('.imageDisplay').html("");
		getOutdoorImages(2490383);
	});
	
	$('.wyoming').click(function(e){
		e.preventDefault();
		$('.imageDisplay').html("");
		getOutdoorImages(2347609);
	});

	$('.india').click(function(e){
		e.preventDefault();
		$('.imageDisplay').html("");
		getOutdoorImages(23424848);
	});

	var apiKey = '617d443e314d492176c1b9f46580dfcd';

	//extracts woeID

	var fetchFlickrObject = function() {
	    var url = 'https://api.flickr.com/services/rest/?method=flickr.places.find&jsoncallback=?';
	    var data = {
	        api_key: '617d443e314d492176c1b9f46580dfcd',
	        query: $('.userLocationInput').val(),
	        format: "json"
	      };
	    
	    $.ajax({
	        dataType: "json",
	        url: url,
	        data: data
	    }).done(function(data) {
	        var woeId = data.places.place[0].woeid;
	        console.log(woeId);
	        console.log(data.places.place[0]);
	        
	       	//retrieves images based on woeID extracted from fetchFlickrObject
	        getOutdoorImages(woeId); 

	    });
	};

	var FlickrSearchUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json";


	var getOutdoorImages = function(woeId) {
		var request = {
			woe_id: woeId,
			//geo_context: 2,
			content_type: 1,
			tags: 'nature, outdoors',
			api_key: apiKey,
			sort: 'interestingness-desc',
			per_page: 20
		
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

	        for(var i=0; i < data.photos.photo.length; i++) {
	        	var farmId = data.photos.photo[i].farm;
		        var serverId = data.photos.photo[i].server;
		        var photoId = data.photos.photo[i].id;
		        var secretId = data.photos.photo[i].secret;

		        //appends image to HTML with thumbnail of image and link to the appropropriate Flickr account
		        $('.imageDisplay').append("<div class='imageResult'><a href='http://flickr.com/photo.gne?id=" + photoId + "'><img src='https://farm" + farmId + ".static.flickr.com/" + serverId + "/" + photoId + "_" + secretId + "_q.jpg'><a></div>");

	        }
		});
	};
	getOutdoorImages();
});

