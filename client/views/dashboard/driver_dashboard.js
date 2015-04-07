Template.driverDashboard.events({
  'click .stopDriving': function(event, template) {
    Meteor.call("stopDriving", function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  }
});