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
  fetch('archive.json')
    .then(response => response.json())
    .then(function(landmarks) { 
      landmarks.forEach(function(landmark, i) {
        var contentString = `<div><img src="${landmark["Fichier jpg - 200 dpi"]}"style="width: 500px; height: auto; padding-top: 5px;"></div>
        <div id="caption"><p style="font-weight:bold; overflow-wrap: normal; width: 500px;  padding: 0; margin: 0; text-align:center; display: block;">${landmark["Titre"]} - ${landmark["Date"]}<p></div>
        <button id="violation-${i}">Violation</button>`;

        var infowindow = new google.maps.InfoWindow({content: contentString});

        const {latitude: lat, longitude: lng} = landmark;

        var marker = new google.maps.Marker({
          position: {lat, lng}, 
          map,
          info: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.info);
          infowindow.open(map, this);
        });

        google.maps.event.addListener(infowindow, 'domready', () => {
          document.getElementById(`violation-${i}`).addEventListener('click', () => {
            console.log('isViolation', landmark.isViolation);

            if (landmark.isViolation) {
              console.log('Violation!');
            } else {
              console.log('Not!');
            }
          });
        });
      })
    });
}
