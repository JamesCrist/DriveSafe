Template.driverDashboard.events({
  'click .stopDriving': function(event, template) {
    Meteor.user().stopDriving(function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  }
});