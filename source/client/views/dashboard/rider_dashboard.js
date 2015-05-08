var pageSession = new ReactiveDict();

var rideExists = new ReactiveVar(false);

pageSession.set("errorMessage", "");

/**
 * @summary Renders the rider dashboard on the screen.
 * @locus Client
 * @method rendered
 * @memberOf riderDashboard
 * @function
 * */
Template.riderDashboard.rendered = function () {
  if (Meteor.isCordova) {
    GeolocationBG.start();
  }

  var that = this;
  GoogleMaps.init(
    {libraries: 'places'},
    function () {
      var mapOptions = {
        center: new google.maps.LatLng(that.data.user.getLat(), that.data.user.getLng()),
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
      Tracker.autorun(function () {
        map.setCenter(new google.maps.LatLng(that.data.user.getLat(), that.data.user.getLng()));
      });
      
      pickupMarker = new google.maps.Marker({
        position: new google.maps.LatLng(Meteor.user().getLat(), Meteor.user().getLng()),
          map: map,
          title: 'Pick Up'
          });
          destMarker = new google.maps.Marker({
            position: new google.maps.LatLng(Meteor.user().getLat(), Meteor.user().getLng()),
            map: map,
            title: 'Drop off'
          });
        pickupMarker.setVisible(false);
        destMarker.setVisible(false);
      
      var pickupInput = document.getElementById('pickup-input');
      var destInput = document.getElementById('dest-input');
      var partySize= document.getElementById('party-size');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(pickupInput);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(destInput);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(partySize);
      dest_autocomplete = new google.maps.places.Autocomplete(destInput);
      pickup_autocomplete = new google.maps.places.Autocomplete(pickupInput);
      pickup_autocomplete.bindTo('bounds', map);
      dest_autocomplete.bindTo('bounds', map);
      // Create a new array to hold the cursors.
      var cursorsArray = [];
      // If user is in a group, then display all the drivers for that group also.
      // TODO: Change the cursor below after Drivers class is implemented.
      cursorsArray.push({
        cursor: Drivers.find({}),
        transform: function (document) {
          var user = Users.findOne(document.user);
          return {
            title: user.getName(),
            position: new google.maps.LatLng(user.getLat(), user.getLng()),
            icon: "/images/car.png"
          };
        }
      });
      var ride = Rides.findOne({user: Meteor.userId()});
      if(ride){
        pickupMarker.setPosition(new google.maps.LatLng(ride.pickupLoc.A, ride.pickupLoc.F));
        destMarker.setPosition(new google.maps.LatLng(ride.destLoc.A, ride.destLoc.F));
        pickupMarker.setVisible(true);
        destMarker.setVisible(true);

      }
      cursorsArray.push({
        cursor: Users.find(Meteor.userId()),
        transform: function (document) {
          return {
            title: document.profile.name,
            position: new google.maps.LatLng(document.getLat(), document.getLng()),
            icon: "/images/person.png"
          };
        }
      });
      LiveMaps.addMarkersToMap(map, cursorsArray);
    }
  );
};

/**
 * @summary Removes the rider dashboard from the screen.
 * @locus Client
 * @method destroyed
 * @memberOf riderDashboard
 * @function
 * */
Template.riderDashboard.destroyed = function () {
  if (Meteor.isCordova) {
    GeolocationBG.stop();
  }
};

Template.riderDashboard.helpers({
  /**
   * @summary Returns the current error message.
   * @locus Client
   * @method errorMessage
   * @memberOf riderDashboard.helpers
   * @function
   * @return {String} errorMessage
   * */
  errorMessage: function () {
    return pageSession.get("errorMessage");
  },
  /**
   * @summary Determines whether or not there is a ride pending.
   * @locus Client
   * @method isRidePending
   * @memberOf riderDashboard.helpers
   * @function
   * @return {Ride}
   * */
  isRidePending: function () {
    return Rides.findOne({user: Meteor.userId()});
  },
  /**
   * @summary places markers on map uf ride is pending.
   * @locus Client
   * @method ridePending
   * @memberOf riderDashboard.helpers
   * @function
   * @return {void}
   * */
  ridePending: function () {
    if (rideExists.get()) {
      return;
    }
    rideExists.set(true);
    pickupMarker.setVisible(true);
    destMarker.setVisible(true);
    return ;
  },
  /**
   * @summary Determines if there are any drivers for the group.
   * @locus Client
   * @method noDrivers
   * @memberOf riderDashboard.helpers
   * @function
   * @return {bool}
   * */
  noDrivers : function(){
    group = Groups.findOne({members: Meteor.userId()});
    return (group.drivers.length === 0);
  },
  /**
   * @summary If user does not have a ride, removes markers from map.
   * @locus Client
   * @method noRide
   * @memberOf riderDashboard.helpers
   * @function
   * @return {void}
   * */
  noRide: function () {
    if (!rideExists.get()) {
      return;
    }
    rideExists.set(false);
    pickupMarker.setVisible(false);
    destMarker.setVisible(false);
    return;
  }
});

Template.riderDashboard.events({
  /**
   * @summary Cancels the current ride.
   * @locus Client
   * @method click .cancelRide
   * @memberOf riderDashboard.events
   * @function
   * */
  'click .cancelRide': function () {
    Rides.findOne({user: Meteor.userId()}).cancel(function (err, res) {
      if (err) {
        alert(err.message);
      }
    });
  },
  /**
   * @summary Request a ride and send to an available driver.
   * @locus Client
   * @method click .requestRide
   * @memberOf riderDashboard.events
   * @function
   * */
  'click .requestRide': function () {
    //TODO CHECK IF LOCATIONS VALID
    var userPickupLocation, userDestLocation, userPickupAddress, userDestAddress;
    var value = $.trim($("#pickup-input").val());
    if (value.length > 0) {
      var pPlace = pickup_autocomplete.getPlace();
      userPickupLocation = pPlace.geometry.location;
      userPickupAddress = pPlace.name + " " + pPlace.formatted_address;
    }
    else {
      userPickupLocation = new google.maps.LatLng(Meteor.user().getLat(), Meteor.user().getLng());
    }
    var value1 = $.trim($("#dest-input").val());
    if(value1.length > 0) {
      var partySize= document.getElementById('party-size');
      var value2 = $.trim($("#party-size").val());
      if(value2.length > 0 && !isNaN(partySize.value)){
        var dPlace = dest_autocomplete.getPlace();
        userDestLocation = dPlace.geometry.location;
        userDestAddress = dPlace.name + " " + dPlace.formatted_address;

        Meteor.call('requestRide', Groups.findOne().id, userPickupLocation, userDestLocation, userPickupAddress,
          userDestAddress, function(err, res) {
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
          }
        });
      } else {
        IonPopup.alert({
          title : 'Invalid party size entered' ,
          template : 'Please input a valid number of people in your group to request a ride!' ,
          okText : 'Okay'
        });
      }
    } else {
      IonPopup.alert({
        title : 'No destination entered' ,
        template : 'Please input a drop off location to request a ride!' ,
        okText : 'Okay'
      });
    }
  }
});


