// javascript lives here

// initialize and add the map
function initMap() {

  // montreal coordinates 
  var montreal = {lat: 45.537682, lng: -73.549924};

  // the map, centered at Montreal
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: montreal});

  // create a marker
  var marker = new google.maps.Marker({position: montreal, map: map});

  // iterate through JSON array
  fetch('archive.json').then(function(response) {
    return response.json();
    }).then(function(data) { 
        for(var i = 0; i < data.length; i++) {
            
            var contentString = '<div><img src="' + data[i]["Fichier jpg - 200 dpi"] + '"style="width: 500px; height: auto;"></div>';
            console.log(contentString);
            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

          var marker = new google.maps.Marker({
              position: {lat: parseFloat(data[i]["Latitude"]), lng: parseFloat(data[i]["Longitude"])}, 
              map: map,
              info: contentString
            });
          
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.info);
            infowindow.open(map, this);
          });
        }
    });
}
