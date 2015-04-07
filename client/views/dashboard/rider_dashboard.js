var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.riderDashboard.rendered = function() {
  // Once the map is ready, add current user's marker and driver markers to it.
  /*
  GoogleMaps.ready('dashboardMap', function(map) {
    if (Group.getGroup()) {
      var liveMarkers = LiveMaps.addMarkersToMap(
        map.instance ,
        [ {
          cursor : Users.find({ "profile.group" : Group.getGroup()._id , "profile.isDriver" : true }) ,
          onClick : function () {
            console.log('Document id = ' + this.id);
          } ,
          transform : function (document) {
            return {
              title : document.profile.name ,
              position : new google.maps.LatLng(document.profile.lat , document.profile.lng),
              icon: "/images/sportscar.png"
            };
          }
        } ]
      );
    }
  });
  */
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
  dashboardMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 15,
        // Disable all controls from the map, to make it look nicer on mobile.
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
      };
    }
  }
});
