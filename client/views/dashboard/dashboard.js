Template.Dashboard.rendered = function() {
	
};

Template.Dashboard.created = function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('dashboardMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
};

Template.Dashboard.events({
	
});

Template.Dashboard.helpers({
  dashboardMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      var position = Geolocation.latLng();
      return {
        center: new google.maps.LatLng(position.lat, position.lng),
        zoom: 12
      };
    }
  }
	
});
