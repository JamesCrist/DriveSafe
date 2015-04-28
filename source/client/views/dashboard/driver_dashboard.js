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
  }
});


Template.driverDashboard.events({
  'click .stopDriving': function(event, template) {
    template.data.driver.stopDriving(function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  } ,
  'click .navigation-button': function(event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [ this.pickupLoc.k , this.pickupLoc.D ] ,
        null ,
        function () {
          // Do stuff here if opening is successful!
        } ,
        function (error) {
          // Do stuff here if error happens!
          alert("Plugin error: " + error);
        });
    } else {
      alert("This only works on phones!");
    }
  }
});