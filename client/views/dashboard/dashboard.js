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

Template.Dashboard.events({
  "click .requestRide": function() {
    alert("Ride Requested!");
  }
});

Template.Dashboard.helpers({
  errorMessage: function() {
    return pageSession.get("errorMessage");
  },
  mapIsLoaded: function() {
    pageSession.set("location", Geolocation.latLng());
    return pageSession.get("location") !== null;
  }
});
