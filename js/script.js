var map;
var markersArray = [];
/*
function mySTLMap() {
	var myMap = document.createElement('script');
	myMap.type = 'text/javascript';
	myMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB8OVhyfSHQ8SayTU9nBkC6OKHbFx8aTog&callback=initMap';
	document.body.appendChild(myMap);
}
window.onload = mySTLMap;
//Initialize map
function initMap() {
	var mapOptions = {
		center: {
			lat: 38.620627,
			lng: -90.257623
		},
		zoom: 13,
		maxZoom: 14,
		minZoom: 12,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT,
			style: google.maps.ZoomControlStyle.SMALL
		}
	};
	map = new google.maps.Map(document.getElementById('StLMap'), mapOptions);
    setMarkers(destinations);

}*/

function initMap() {
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
		center: {
			lat: 38.620627,
			lng: -90.257623
		},
		zoom: 13,
		maxZoom: 14,
		minZoom: 12,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT,
			style: google.maps.ZoomControlStyle.SMALL
		}
	};
    
    map = new google.maps.Map(document.getElementById('StLMap'), mapOptions);
    setMarkers(destinations);
}

//  *** Seting Markers and Creating infoWindows 

function setMarkers(location) {
	for (i = 0; i < location.length; i++) {
		location[i].holdMarker = new google.maps.Marker({
			position: new google.maps.LatLng(location[i].lat, location[i].lng),
			map: map,
			name: location[i].name,
			icon: location[i].symbol,
			animation: google.maps.Animation.DROP
		});
		// *** Place street view images within infoWindow
		determineImage();
		// *** InfoWindow content 
		location[i].contentString = '<img class="image" src="' + streetViewImage + '" alt="Street View Image of ' + location[i].name + '"><br><hr style="margin-bottom: 6px"><h2>' + location[i].name + '</h2><p class="weather">' + "Weather: " + location[i].tempF + '\u2109</p>' + "Weather: " + location[i].tempC + '\u2103</p>' + '<a class="webLink" href="' + location[i].webUrl + '" target="_blank">' + "Website" + '</a><br><a class="direction" href="http://maps.google.com/?q=' + location[i].lat + "," + location[i].lng + '"target="_blank">' + "Directions" + '</a><br><a class="wiki" href="https://en.wikipedia.org/wiki/' + location[i].name + '"target="_blank">' + "Wikepedia" + '</a>';
		var infowindow = new google.maps.InfoWindow({
			content: destinations[i].contentString
		});
		//  *** Marker Bounce TimeOut Function stops bouncing after TWO bounce
		function stopAnimation(marker) {
			setTimeout(function() {
				marker.setAnimation(null);
			}, 1420);
		}
		// *** Centers & Zooms the infoWindow - Upon marker click
		new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(location[i].contentString);
				infowindow.open(map, this);
				var windowWidth = $(window).width();
				map.setZoom(16);
				map.setCenter(marker.getPosition());
				location[i].picBoolTest = true;
				marker.setAnimation(google.maps.Animation.BOUNCE);
				stopAnimation(marker);
			};
		})(location[i].holdMarker, i));
		// *** Centers & Zooms the infoWindow - Upon search (nav) window selection
		var searchNav = $('#nav' + i);
		searchNav.click((function(marker, i) {
			return function() {
				infowindow.setContent(location[i].contentString);
				infowindow.open(map, marker);
				map.setZoom(16);
				map.setCenter(marker.getPosition());
				location[i].picBoolTest = true;
				marker.setAnimation(google.maps.Animation.BOUNCE);
				stopAnimation(marker);
			};
		})(location[i].holdMarker, i));
	}
}


/*this.listToggle = function() {
    if(self.toggleSymbol() === 'hide') {
      self.toggleSymbol('show');
    } else {
      self.toggleSymbol('hide');
    }
  };*/

function setAllMap() {
	for (var r = 0; r < destinations.length; r++) {
		if (destinations[r].boolTest === true) {
			destinations[r].holdMarker.setMap(map);
		} else {
			destinations[r].holdMarker.setMap(null);
		}
	}
}