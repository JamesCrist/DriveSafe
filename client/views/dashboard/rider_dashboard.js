var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.mapCanvas.rendered = function() {
  var map = this;
  var location = Geolocation.latLng();

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
};

Template.riderDashboard.created = function() {
};

Template.riderDashboard.events({
  "click .requestRide": function() {
    alert("Ride Requested!");
  }
});

Template.riderDashboard.helpers({
  errorMessage: function() {
    return pageSession.get("errorMessage");
  },
  group: function() {
    return Group.getGroup();
  }
});
