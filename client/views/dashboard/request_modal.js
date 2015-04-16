Template.request_modal.rendered = function () {
  Deps.autorun(function() {
    if(Drivers.find().count()) {

      var pickupInput = document.getElementById('pickup-input');
      var destInput = document.getElementById('dest-input');

      pickup_autocomplete = new google.maps.places.Autocomplete(pickupInput);
      dest_autocomplete = new google.maps.places.Autocomplete(destInput);
      pickup_autocomplete.bindTo('bounds' , map);
      dest_autocomplete.bindTo('bounds' , map)
    }
  });
};

Template.request_modal.helpers({
  driversAvailable: function() {
    return Drivers.find().count();
  }
});

Template.request_modal.events({
  'click #submit_button' : function () {
    //TODO CHECK IF LOCATIONS VALID
    var userPickupLocation , userDestLocation;
    var value = $.trim($("#pickup-input").val());
    if(value.length > 0) {
      userPickupLocation = (pickup_autocomplete.getPlace()).geometry.location;
    }
    else {
      userPickupLocation = new google.maps.LatLng(Meteor.user().getLat() , Meteor.user().getLng());
    }
    var value1 = $.trim($("#dest-input").val());
    if(value1.length > 0) {
      userDestLocation = (dest_autocomplete.getPlace()).geometry.location;
      var ride = new Ride(null, Meteor.userId() , Groups.findOne().id, userPickupLocation , userDestLocation, Date.now());
      ride.save(function(err, res) {
        if (err) {
          alert(err.message);
        } else {
          Groups.findOne().addRideToQueue(ride, function(err, res) {
            if (err) {
              alert(err.message);
            }
          });
        }
      });


      pickupMarker.setPosition(new google.maps.LatLng(userPickupLocation.lat() , userPickupLocation.lng()));
      destMarker.setPosition(new google.maps.LatLng(userDestLocation.lat() , userDestLocation.lng()));
      pickupMarker.setVisible(true);
      destMarker.setVisible(true);

      var bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupMarker.getPosition());
      bounds.extend(destMarker.getPosition());
      map.fitBounds(bounds);
    }
    else {
      alert('Please input a drop off location to request a ride!');
    }
  }
});



