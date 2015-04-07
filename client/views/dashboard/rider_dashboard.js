var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.riderDashboard.rendered = function() {
  GoogleMaps.init(
    {},
    function() {
      var mapOptions = {
        center: new google.maps.LatLng(Meteor.user().profile.lat, Meteor.user().profile.lng),
        zoom: 14,
        // Disable all controls from the map, to make it look nicer on mobile.
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      Tracker.autorun(function() {
        map.setCenter(new google.maps.LatLng(Meteor.user().profile.lat, Meteor.user().profile.lng));
      });
      // If user is in a group, add markers on the map for the drivers. These will update automatically.
      if (Group.getGroup()) {
        LiveMaps.addMarkersToMap(
          map,
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
    }
  );
};

Template.riderDashboard.events({
  "click .requestRide": function() {
    alert("Ride Requested!");
  }
});

Template.riderDashboard.helpers({
  errorMessage: function() {
    return pageSession.get("errorMessage");
  }
});
