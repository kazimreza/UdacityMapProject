alert("API");

 weatherWUArray =[]; 

for (r = 0; r < attractions.length; r++) {
jQuery(document).ready(function(weather) {
    weather.ajax({
        url: "http://api.wunderground.com/api/af4314f2ce84f68b/geolookup/conditions/q/"+attractions[0].lat+","+attractions[r].lng+".json",
        dataType: "jsonp",
        success: function(parsed_json) {
            var localTemp = parsed_json['current_observation']['temp_f'];
            console.log ('yes');
            // console.log (localTemp);
           // weatherWUArray.push (localTemp);
            //console.log (weatherWUArray[0].localTemp);
           
            
            
  /*attractions[r].info = '<div id="info_content">' +
    '<h3>' + attractions[r].name + '</h3>' + "Weather: " + attractions.temp +
    '<br><a class="web-links" href="' + attractions[r].webUrl + '" target="_blank">' + "Website: " + '</a>' +
    '</div>';
            
            alert(localTemp);
          // attractions[0].temp = localTemp;
            
            //var location = parsed_json['location']['city'];
           // attractions.temp = parsed_json['current_observation']['temp_f']; alert("WU Test");
           //window.temp = temp; 
            }, 
        error: function(textStatus, errorThrown) {
            alert('Temperature API failed to load.');
            //alert(attractions[0].temp); */
        }
    });
            
        });
}

var flickrJSON;

//Binds click handler to flickr image to open modal
/*$("#flickr").click(function() {
    $(".modal").css("z-index", "3");
    $(".modal").show();
});*/

//Binds click handler to x button to close modal
/*$("#exit-modal").click(function() {
    $(".modal").css("z-index", "0");
    $(".modal").hide();
    $('.flickr-image-container img').hide();
    imagesAreSet = true;
});*/

//GET JSON from flickr
//Display message if error getting flickr JSON

alert("API");
var flickrPhotoArray = [];
for (r = 0; r < attractions.length; r++) {
function getFlickrImages() {
		var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d8c382ca8a48d5a4ddf5e86bcaa29cfd&accuracy=16&lat=' +  attractions[r].lat + '&' + attractions[r].lng + '&format=json';
        $.ajax({
            url: flickrUrl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function(data) {
                var photo = data.photos.photo;
                flickrJSON = photo;
                var flckrPhoto = 'https://farm' + flickrJSON[number].farm + '.staticflickr.com/' + flickrJSON.server + '/' + flickrJSON.id + '_' + flickrJSON.secret + '.jpg';
                attractions.push ({"flckrPhoto": flckrPhoto});
                console.log(attractions[r].flckrPhoto);
            }, 
            error: function() {
				$('.flickr-image-container').append('<h1 style="text-align: center;">Sorry!</h1><br><h2 style="text-align: center;">Flickr Images Could Not Be Loaded</h2>');
				$("#right-arrow").hide();
				$("#left-arrow").hide();

				}
        });
}}
alert("api2");

/*
getFlickrImages();

var flickrPhotoArray = [];
var counter = 0;
var imagesAreSet = false;

//Get 25 random images from flickr JSON
//Store image data in flickrPhotoArray
//Hide all images except the first
function setFlickrImages() {
	if(imagesAreSet === false) {
		for(var i=0; i < 25; i++) {
			var number = Math.floor((Math.random() * 250) + 1);
			var photo = 'https://farm' + flickrJSON[number].farm + '.staticflickr.com/' + flickrJSON[number].server + '/' + flickrJSON[number].id + '_' + flickrJSON[number].secret + '.jpg';
			flickrPhotoArray.push(photo);
			$('.flickr-image-container').append('<img id="flickr-image' + i + '" src="' + photo + '" alt="' + flickrJSON[number].title + ' Flickr Image">');
			$("#flickr-image" + i).hide();	
			if(i < 1) {
				$("#flickr-image" + i).show();
			}
		}
	} else {
		$("#flickr-image" + counter).show();
	}
}
$("#flickr").click(setFlickrImages);

//Bind click handler to arrow button to view next image
function scrollForward() {
	$('#flickr-image' + counter).hide();
	counter += 1;
	if(counter >= 24) {
		counter = 0;
	}
	$('#flickr-image' + counter).fadeIn(300);	
}

//Bind click handler to arrow button to view previous image
function scrollBackWard() {
	$('#flickr-image' + counter).hide();
	counter -= 1;
	if(counter < 0) {
		counter = 24;
	}
	$('#flickr-image' + counter).fadeIn(300);	
}

$("#right-arrow").click(scrollForward);
$("#left-arrow").click(scrollBackWard);  
*/