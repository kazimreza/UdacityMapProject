/** Globals  */
var map;
var markers = [];
var infoWindow;


/** Google Map Intilization */
function mapster() {
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
        zoom: 12,
        scrollwheel: false,
        maxZoom: 13,
        minZoom: 11
    };

    // Map Display
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // Loops Through List of Destinations and Places Markers
    for (r = 0; r < attractions.length; r++) {
        var position = new google.maps.LatLng(attractions[r].lat, attractions[r].lng);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP,
            title: attractions[r].name
        });
        // Displays ALL the markers on a map
        infoWindow = new google.maps.InfoWindow(), marker, r;

        markers.push(marker);

        // Destination Info Window    
        google.maps.event.addListener(markers[r], 'click', (function(marker, r) {
            return function() {
                showMarkerContent(marker, r);
            }
        })(markers[r], r));

        markers[r].setMap(map);
    }

    // Map Center at Initial Load
    map.fitBounds(bounds);
}

/** Shows Info Window with Destination Selection */
function showContent(name) {
    for (var k = 0; k < markers.length; k++) {
        if (markers[k].title.indexOf(name) >= 0) {
            markers[k].setAnimation(google.maps.Animation.BOUNCE);
            stopAnimation(markers[k]);
            showMarkerContent(markers[k], k);
        }
    }
}



/** Shows info window of the selected marker. */
function showMarkerContent(marker, z) {
    var url = "Website";
    try {
        infoWindow.setContent('<div id="info_content">' +
            '<h3>' + attractions[z].name + '</h3>' +
            '<a class="web-links" href="' + attractions[z].webUrl + '" target="_blank">' + url + '</a>' +
            '</div>');
        infoWindow.open(map, marker);
        showStreetView(z);
    } catch (err) {
        console.log('error: ' + err);
    }
}


/** Map Load Error */
function googleError() {
    alert("Google Maps API failed to load!");
}