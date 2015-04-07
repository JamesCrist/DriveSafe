this.App = {};

Meteor.startup(function() {
  Meteor.subscribe("groups");
});

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

