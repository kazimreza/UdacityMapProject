/*  Map Options */
/** Knockout -- 'myDestinations' */
$(function() {
    var myDestinations = attractions;
    var viewModel = {
        myDestinations: ko.observableArray(myDestinations),
        setContent: function() {
            alert("value.name");
        },
        query: ko.observable(''),
        search: function(value) {
            console.log('search: ' + value);
            viewModel.myDestinations.removeAll();

        }
    };
    viewModel.query.subscribe(viewModel.search);
    ko.applyBindings(viewModel);
});

/** Marker Animation */
function stopAnimation(marker) {
    setTimeout(function() {
        marker.setAnimation(null);
    }, 3500);
}

/** Shows street view */
function showStreetView(n) {
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('street_view'), {
            position: {
                lat: attractions[n].lat,
                lng: attractions[n].lng
            },
            pov: {
                heading: 66,
                pitch: 10
            }
        }
    );
    map.setStreetView(panorama);
}

// Weather Underground Forecast

var weatherContainer = $("#weather-image-container");
var isWeatherVisible = false;
weatherContainer.click(function() {
    if (isWeatherVisible === false) {
        if ($(window).width() < 670) {
            $(".forecast li").css("display", "block");
            weatherContainer.animate({
                width: "245"
            }, 500);
        } else {
            $("#forecast").css("display", "inline-block");
            weatherContainer.animate({
                width: "380"
            }, 500);
        }
        isWeatherVisible = true;
    } else {
        weatherContainer.animate({
            width: "80"
        }, 500);
        isWeatherVisible = false;
    }
});

jQuery(document).ready(function(weather) {
    weather.ajax({
        url: "http://api.wunderground.com/api/af4314f2ce84f68b/geolookup/conditions/q/MO/st_louis.json",
        dataType: "jsonp",
        success: function(parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            document.getElementById('forecast').innerHTML = ("Current temperature in " + location + " is " + temp_f + " °F");
            alert("Welcome to St. Louis, MO");
        },
        error: function(textStatus, errorThrown) {
            alert('Temperature API failed to load.');
        }
    });
});