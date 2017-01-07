// Map error function
function googleError() {
	$('body').html('').append('<div class="google-error">Google Maps API load error.</div>');
}
var timeOut = window.setTimeout('googleError()', 10000);
var map;
var markers = [];

function initMap() {
	window.clearTimeout(timeOut);
	// Map Style
	var styles = [{
		elementType: 'geometry',
		stylers: [{
			color: '#ebe3cd'
		}]
	}, {
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#523735'
		}]
	}, {
		elementType: 'labels.text.stroke',
		stylers: [{
			color: '#f5f1e6'
		}]
	}, {
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [{
			color: '#c9b2a6'
		}]
	}, {
		featureType: 'administrative.land_parcel',
		elementType: 'geometry.stroke',
		stylers: [{
			color: '#dcd2be'
		}]
	}, {
		featureType: 'administrative.land_parcel',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#ae9e90'
		}]
	}, {
		featureType: 'landscape.natural',
		elementType: 'geometry',
		stylers: [{
			color: '#dfd2ae'
		}]
	}, {
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [{
			color: '#dfd2ae'
		}]
	}, {
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#93817c'
		}]
	}, {
		featureType: 'poi.park',
		elementType: 'geometry.fill',
		stylers: [{
			color: '#a5b076'
		}]
	}, {
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#447530'
		}]
	}, {
		featureType: 'road',
		elementType: 'geometry',
		stylers: [{
			color: '#f5f1e6'
		}]
	}, {
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [{
			color: '#fdfcf8'
		}]
	}, {
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [{
			color: '#f8c967'
		}]
	}, {
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [{
			color: '#e9bc62'
		}]
	}, {
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [{
			color: '#e98d58'
		}]
	}, {
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry.stroke',
		stylers: [{
			color: '#db8555'
		}]
	}, {
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#806b63'
		}]
	}, {
		featureType: 'transit.line',
		elementType: 'geometry',
		stylers: [{
			color: '#dfd2ae'
		}]
	}, {
		featureType: 'transit.line',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#8f7d77'
		}]
	}, {
		featureType: 'transit.line',
		elementType: 'labels.text.stroke',
		stylers: [{
			color: '#ebe3cd'
		}]
	}, {
		featureType: 'transit.station',
		elementType: 'geometry',
		stylers: [{
			color: '#dfd2ae'
		}]
	}, {
		featureType: 'water',
		elementType: 'geometry.fill',
		stylers: [{
			color: '#b9d3c2'
		}]
	}, {
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [{
			color: '#92998d'
		}]
	}];
	// Initial map option
	var mapOptions = {
		center: {
			lat: 28.680585,
			lng: 115.882247
		},
		zoom: 13,
		maxZoom: 14,
		minZoom: 12,
		styles: styles
	};
	//create the map
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var infoWindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();
	//  List item
	var DestinationListItem = function(data) {
		this.name = ko.observable(data.name);
		this.visible = ko.observable(true);
		this.marker = new google.maps.Marker({
			position: data.latLang,
			name: data.name,
			id: data.id,
			animation: google.maps.Animation.DROP,
			icon: data.symbol
		});
		//   Click to open infowindow
		this.marker.addListener('click', function() {
			populateInfoWindow(this, infoWindow);
		});
		markers.push(this.marker);
		this.marker.setMap(map);
		bounds.extend(this.marker.position);
		map.fitBounds(bounds);
	};
	//  Viewmodel
	var ViewModel = function() {
		var self = this;
		this.searchQuery = ko.observable('');
		//  Toggle List
		this.showList = ko.observable(false);
		this.destinationList = ko.observableArray([]);
		destinations.forEach(function(destination) {
			self.destinationList.push(new DestinationListItem(destination));
		});
		//  Hide list, when list item is clicked
		this.openInfoWindow = function() {
			self.toggleList();
			populateInfoWindow(this.marker, infoWindow);
		};
		//   Update list
		this.filteredList = ko.computed(function() {
			this.showList(true);
			return ko.utils.arrayFilter(self.destinationList(), function(listItem) {
				if (listItem.name().toLowerCase().indexOf(self.searchQuery().toLowerCase()) >= 0) {
					listItem.marker.setMap(map);
					return true;
				} else {
					listItem.marker.setMap(null);
					return false;
				}
			})
		}, this);
		//  Toggle list function
		this.toggleList = function() {
			self.showList(!self.showList());
			if (self.showList()) {
				$('.toggleArrows img').attr('src', 'img/updown.png');
			} else {
				$('.toggleArrows img').attr('src', 'img/updown.png');
			}
		};
	}
	ko.applyBindings(new ViewModel());
}
//  Create info window when a marker or a list item clicked
function populateInfoWindow(marker, infoWindow) {
	marker.setAnimation(google.maps.Animation.BOUNCE);
	stopAnimation(marker);
	if (infoWindow.marker != marker) {
		infoWindow.marker = marker;
		infoWindow.addListener('closeclick', function() {
			infoWindow.setMap(null);
			marker.setAnimation(null);
		});
		var r = marker.id;
		infoWindow.setContent('<img src="' + streetView[r] + '" alt="Street View Image of "><h2>' + marker.name + '</h2><p class="weather">' + "Weather: " + tempF[r] + '\u2109' + "  or  " + tempC[r] + '\u2103' + "    " + '<img src = "img/wu.png"</p> <br>' + '<a class="webLink" href="' + destinations[r].webUrl + '" target="_blank">' + "Website" + '</a><br><a class="direction" href="http://maps.google.com/?q=' + destinations[r].latLang.lat + "," + destinations[r].latLang.lng + '"target="_blank">' + "Directions" + '</a><br><a class="wiki" href="https://en.wikipedia.org/wiki/' + marker.name + '"target="_blank">' + "Wikepedia" + '</a>');
		infoWindow.open(map, marker);
	}
}
//  Selected marker bounces THREE times
function stopAnimation(marker) {
	setTimeout(function() {
		marker.setAnimation(null);
	}, 2110);
}