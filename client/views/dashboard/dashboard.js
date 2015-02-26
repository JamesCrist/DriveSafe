Template.dashboard.helpers({
});

Template.dashboard.events({
  'click .signout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
