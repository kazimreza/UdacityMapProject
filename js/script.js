function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation (google.maps.Animation.BOUNCE);
        }
    }


function initMap() {
    
    var myCenter = {lat: 38.620627, lng: -90.257623};
    var options = {
        center: myCenter,
        zoom: 13,
        maxZoom: 14,
        minZoom: 12,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            style: google.maps.ZoomControlStyle.SMALL
        }
        },
    element = document.getElementById('map'),
    myMap = new google.maps.Map(element, options);
    
   
  
    for (r = 0; r < attractions.length; r++) {
        var myPosition = new google.maps.LatLng(attractions[r].lat, attractions[r].lng);
    
    /*    jQuery(document).ready(function(weather) {
    weather.ajax({
        url: "http://api.wunderground.com/api/af4314f2ce84f68b/geolookup/conditions/q/"+attractions[r].lat+","+attractions[r].lng+".json",
        dataType: "jsonp",
        success: function(parsed_json) {
            temp = parsed_json['current_observation']['temp_f'];
            
            
   var contentString = '<div id="info_content">' +
    '<h3>' + attractions[r].name + '</h3>' + "Weather: " + temp +
    '<br><a class="web-links" href="' + attractions[r].webUrl + '" target="_blank">' + "Website: " + '</a>' +
    '</div>';
           
            
            //var location = parsed_json['location']['city'];
           // attractions.temp = parsed_json['current_observation']['temp_f']; alert("WU Test");
           //window.temp = temp; 
            }, 
        error: function(textStatus, errorThrown) {
            alert('Temperature API failed to load.');
        } 
        
    }); 
}); */
       
      
        var contentString = '<div id="info_content">' +
            '<h3>' + attractions[r].name + '</h3>' + "Weather: " +  attractions[r].flckrPhoto + 
            '<br><a class="web-links" href="' + attractions[r].webUrl + '" target="_blank">' + "Website: " + '</a>' +
            '</div>';
        var infoWindow = new google.maps.InfoWindow ({
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: myPosition,
            map: myMap,
            animation: google.maps.Animation.DROP,
            icon: attractions[r].symbol,
            title: attractions[r].name,
            info: contentString
        });
        
         google.maps.event.addListener (marker, 'click', function() {
             infoWindow.setContent (this.info);
             infoWindow.open (map, this);
         });
        
      
    }
   alert("hello2");
}

// initMap();