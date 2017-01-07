//  *** Google Street View Image for each destination
//  *** Weather Underground weather reading for each destination
var tempF = [];
var tempC = [];
var streetView = [];
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=320x120&location=';
destinations.forEach(function(location) {
	// Streetview Image
	streetView.push(streetViewUrl + location.latLang.lat + ',' + location.latLang.lng + '&fov=120&heading=6&pitch=10');
	// Weather Underground Reading
	jQuery(document).ready(function(weather) {
		weather.ajax({
			url: "http://api.wunderground.com/api/32d1c1fe378a9163/geolookup/conditions/q/" + location.latLang.lat + ',' + location.latLang.lng + ".json",
			dataType: "jsonp",
			success: function(parsed_json) {
				if (parsed_json['current_observation']['temp_f'] == NaN) {
					alert("Unable to Get Weather reading for " + location.name);
				} else {
					tempF.push(parsed_json['current_observation']['temp_f']);
					tempC.push(parsed_json['current_observation']['temp_c']);
				}
			}
		});
	})
})