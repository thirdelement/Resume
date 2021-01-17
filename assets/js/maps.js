function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {
      lat: 46.619261,
      lng: -33.134766,
    },
  });
  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var locations = [
    { lat: 40.785091, lng: -73.968285 },
    { lat: 41.084045, lng: -73.874245 },
    { lat: 40.754932, lng: -73.984016 },
  ];

  var markers = locations.map(function (location, i) {
    //JS map method...first argument is current value of where we are in array
    //second argument is the index number of where we are in the array
    return new google.maps.Marker({
      //return a googlemaps object
      position: location, //position value set to current locatin
      label: labels[i % labels.length], //%operator is used so if we have more than 26 locations it will loop
      //around to the start of the string again and go from Z back to A
    });
  });
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
