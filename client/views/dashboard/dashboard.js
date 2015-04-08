var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("location", null);

Template.mapCanvas.rendered = function() {
  var map = this;
  var location = pageSession.get("location");

  VazcoMaps.init({}, function() {

    map.mapEngine = VazcoMaps.gMaps();

    map.Map = new map.mapEngine({
      div : '#map-canvas' ,
      lat : location.lat,
      lng : location.lng
    });

    map.Map.addMarker({
      lat : location.lat,
      lng : location.lng,
      draggable : false
    });
  });
  // Update the user's location in the database.
  Meteor.call("updateUserLocation", location.lat, location.lng, function(err) {
    if (err) {
      alert(err);
      pageSession.set("errorMessage", err.message);
    }
  });
};

Template.Dashboard.created = function() {
};



Template.Dashboard.helpers({
  errorMessage: function() {
    return pageSession.get("errorMessage");
  },
  mapIsLoaded: function() {
    pageSession.set("location", Geolocation.latLng());
    return pageSession.get("location") != null;
  }
});

/*Template.request_modal.events({
  "focus #pac-input": function() {
   //src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places";
    function initialize() {
      var input = /** @type {HTMLInputElement} (
          document.getElementById('pac-input'));

      var autocomplete = new google.maps.places.Autocomplete(input);
     
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }
        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }
      });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  }
});*/