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

