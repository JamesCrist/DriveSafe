Template.driverDashboard.helpers({
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
  }
});