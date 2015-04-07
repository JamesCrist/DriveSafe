this.App = {};

Meteor.startup(function() {
  Meteor.subscribe("groups");
});

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

Handlebars.registerHelper('isAdmin', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.admin;
  } else {
    return false;
  }
});

Handlebars.registerHelper('isDriver', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.isDriver;
  } else {
    return false;
  }
});

Handlebars.registerHelper('group', function() {
  return Group.getGroup();
});

// Update the user's location every second.
Meteor.setInterval(function() {
  if(Meteor.user()) {
    var location = Geolocation.latLng() || {lat: 0, lng: 0};
    Meteor.call("updateUserLocation", location.lat, location.lng);
  }
}, 1000);

