var pageSession = new ReactiveDict();

pageSession.set("errorMessage" , "");

Template.riderDashboard.rendered = function () {
  var that = this;

  GoogleMaps.init(
    {libraries: 'places'} ,
    function () {
      var mapOptions = {
        center : new google.maps.LatLng(that.data.user.getLat() , that.data.user.getLng()) ,
        zoom : 14 ,
        // Disable all controls from the map, to make it look nicer on mobile.
        panControl : false ,
        zoomControl : false ,
        mapTypeControl : false ,
        scaleControl : false ,
        streetViewControl : false ,
        overviewMapControl : false
      };
      map = new google.maps.Map(document.getElementById("map-canvas") , mapOptions);
      Tracker.autorun(function () {
        map.setCenter(new google.maps.LatLng(that.data.user.getLat() , that.data.user.getLng()));
      });
      pickupMarker = new google.maps.Marker({
        position: new google.maps.LatLng(Meteor.user().getLat() , Meteor.user().getLng()),
        map: map,
        title: 'Pick Up'
      });
      destMarker = new google.maps.Marker({
        position: new google.maps.LatLng(Meteor.user().getLat() , Meteor.user().getLng()),
        map: map,
        title: 'Drop off'
      });
      pickupMarker.setVisible(false);
      destMarker.setVisible(false);
      // Create a new array to hold the cursors.
      var cursorsArray = [];
      // If user is in a group, then display all the drivers for that group also.
      // TODO: Change the cursor below after Drivers class is implemented.
      cursorsArray.push({
        cursor : Drivers.find({}) ,
        transform : function (document) {
          var user = Users.findOne(document.user);
          return {
            title : user.getName() ,
            position : new google.maps.LatLng(user.getLat() , user.getLng()) ,
            icon : "/images/car.png"
          };
        }
      });
      cursorsArray.push({
        cursor : Users.find(Meteor.userId()) ,
        transform : function (document) {
          return {
            title : document.profile.name ,
            position : new google.maps.LatLng(document.getLat() , document.getLng()) ,
            icon : "/images/person.png"
          };
        }
      });
      LiveMaps.addMarkersToMap(map , cursorsArray);
    }
  );
};

Template.riderDashboard.helpers({
  errorMessage : function () {
    return pageSession.get("errorMessage");
  },
  ridePending : function() {
    return Rides.findOne({user: Meteor.userId()});
  }
});

Template.riderDashboard.events({
  'click .cancelRide' :function () {
    Rides.findOne({user: Meteor.userId()}).cancel(function(err, res) {
      if (err) {
        alert(err.message);
      }
    });
  }
});

