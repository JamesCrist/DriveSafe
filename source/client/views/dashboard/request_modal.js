/**
 * @summary Renders the screen after a user requests a ride.
 * @locus Client
 * @method rendered
 * @memberOf request_modal
 * @function
 * */
Template.request_modal.rendered = function () {
  Deps.autorun(function() {
    if(Drivers.find().count()) {
        var pickupInput = document.getElementById('pickup-input');
        var destInput = document.getElementById('dest-input');
        pickup_autocomplete = new google.maps.places.Autocomplete(pickupInput);
        dest_autocomplete = new google.maps.places.Autocomplete(destInput);
        pickup_autocomplete.bindTo('bounds' , map);
        dest_autocomplete.bindTo('bounds' , map);
    }
  });
};

Template.request_modal.helpers({
  /**
   * @summary Checks if there are any drivers available.
   * @locus Client
   * @method driversAvailable
   * @memberOf request_modal.helpers
   * @return {Integer} number of drivers
   * @function
   * */
  driversAvailable: function() {
    return Drivers.find().count();
  }
});

Template.request_modal.events({
  /**
   * @summary Submits the ride request to the relevant driver..
   * @locus Client
   * @method click #submit_button
   * @memberOf request_modal.events
   * @function
   * */
  'click #submit_button' : function () {
    //TODO CHECK IF LOCATIONS VALID
    var userPickupLocation , userDestLocation, userPickupAddress , userDestAddress;
    var value = $.trim($("#pickup-input").val());
    // Check to make sure something was input into the form
    if(value.length > 0) {
      userPickupLocation = (pickup_autocomplete.getPlace()).geometry.location;
      userPickupAddress = (pickup_autocomplete.getPlace()).formatted_address;
    }
    // Otherwise, fetch the user's current location
    else {
      userPickupLocation = new google.maps.LatLng(Meteor.user().getLat() , Meteor.user().getLng());
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(Meteor.user().getLat(), Meteor.user().getLat());
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            userPickupAddress = results[1].formatted_address;
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }

    // Get the desired destination
    var value1 = $.trim($("#dest-input").val());
    // Check to make sure something was input.
    if(value1.length > 0) {
      userDestLocation = (dest_autocomplete.getPlace()).geometry.location;
      userDestAddress = (dest_autocomplete.getPlace()).formatted_address;
      var ride = new Ride(null, Meteor.userId() , Groups.findOne().id, userPickupLocation , userDestLocation, userPickupAddress , userDestAddress, Date.now());
      console.log(ride);
      ride.save(function(err, res) {
        if (err) {
          alert(err.message);
        } else {
          Groups.findOne().addRideToQueue(ride, function(err, res) {
            if (err) {
              alert(err.message);
            } else {
              pickupMarker.setPosition(new google.maps.LatLng(userPickupLocation.lat() , userPickupLocation.lng()));
              destMarker.setPosition(new google.maps.LatLng(userDestLocation.lat() , userDestLocation.lng()));
              pickupMarker.setVisible(true);
              destMarker.setVisible(true);

              var bounds = new google.maps.LatLngBounds();
              bounds.extend(pickupMarker.getPosition());
              bounds.extend(destMarker.getPosition());
              map.fitBounds(bounds);
              IonModal.close();
            }
          });
        }
      });
    }
    else {
      alert('Please input a drop off location to request a ride!');
    }
  }
});
