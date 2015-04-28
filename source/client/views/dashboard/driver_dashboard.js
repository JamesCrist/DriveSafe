/**
 * @summary Renders the driver dashboard template on the screen.
 * @locus Client
 * @method rendered
 * @memberOf driverDashboard
 * @function
 * */
Template.driverDashboard.rendered = function() {
  if (Meteor.isCordova) {
    GeolocationBG.start();
  }
};
/**
 * @summary Removes the driver dashboard template from the screen.
 * @locus Client
 * @method destroyed
 * @memberOf driverDashboard
 * @function
 * */
Template.driverDashboard.destroyed = function() {
  if (Meteor.isCordova) {
    GeolocationBG.stop();
  }
};


Template.driverDashboard.helpers({
  /**
   * @summary Creates a new Ride.
   * @locus Client
   * @method rideModel
   * @memberOf driverDashboard.helpers
   * @function
   * */
  rideModel: function() {
    return new Ride(this.id, this.user, this.group, this.pickupLoc, this.destLoc, this.createdAt);
  },
  getRideUser: function() {
    return Users.findOne(this.user).getName();
  },
  getRideCreatedTime: function() {
    return moment(this.createdAt).fromNow();
  },
  ridesAvailable: function() {
    return this.rides.count() > 0;
  },
  firstRide: function(){
    return (Groups.findOne(this.group)).queue.indexOf(this.id) === 0;
  }
  /*getPickupAddress: function(){
    var latlng = new google.maps.LatLng(this.pickupLoc.k, this.pickupLoc.D);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          return results[1].formatted_address;
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }*/
});


Template.driverDashboard.events({
  'click .stopDriving': function(event, template) {
    template.data.driver.stopDriving(function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  } ,
  'click #pickup-navigation-button': function(event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [ this.pickupLoc.k , this.pickupLoc.D ] ,
        null ,
        function () {
          // Do stuff here if opening is successful!
          $("#pickup-navigation-button").remove();
          $("#dest-navigation-button").show();
        } ,
        function (error) {
          // Do stuff here if error happens!
          alert("Plugin error: " + error);
        });
    } else {
      alert("This only works on phones!");
    }
    $("#pickup-navigation-button").remove();
    $("#dest-navigation-button").show();
  },
  'click #dest-navigation-button': function(event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [ this.destLoc.k , this.destLoc.D ] ,
        null ,
        function () {
          // Do stuff here if opening is successful!
          $("#dest-navigation-button").remove();
          $("#confirm-dropoff-button").show();
        } ,
        function (error) {
          // Do stuff here if error happens!
          alert("Plugin error: " + error);
        });
    } else {
      alert("This only works on phones!");
    }
    $("#dest-navigation-button").remove();
    $("#confirm-dropoff-button").show();
  }, 
  'click #confirm-dropoff-button': function(event, template) {
    this.cancel(function(err, res) {
      if (err) {
        alert(err.message);
      }
    });
  },
  'click .tab-item': function(event, template) {
    this.cancel(function(err, res) {
      if (err) {
        alert(err.message);
      }
    });
  }
});