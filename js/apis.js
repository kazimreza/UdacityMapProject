//  *** Google Street View Image for each destination
//  *** Weather Underground weather reading for each destination
//  *** Passed destination lat and lng through forEach loop to solve timing issue
var tempF = [];
var tempC = [];
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=320x120&location=';

function determineImage() {
	streetViewImage = streetViewUrl + destinations[i].lat + ',' + destinations[i].lng + '&fov=120&heading=6&pitch=10';
}


destinations.forEach(function(location) {
	jQuery(document).ready(function(weather) {
		weather.ajax({
			url: "http://api.wunderground.com/api/32d1c1fe378a9163/geolookup/conditions/q/" + location.lat + "," + location.lng + ".json",
			dataType: "jsonp",
			success: function(parsed_json) {
				tempF.push ( parsed_json['current_observation']['temp_f']);
                tempC.push( parsed_json['current_observation']['temp_c']);
                
                console.log(parsed_json['current_observation']['temp_f']);
                console.log (tempF);
                
			},
            
			error: function(textStatus, errorThrown) {
				alert('Temperature API failed to load.');
				
			}
            
		});
        // console.log (tempC);
        
	})
})
console.log (tempF);