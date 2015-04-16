this.App = {};

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

// Subscribe to the groups collection on the client.
Meteor.startup(function() {
  Meteor.subscribe("groups");
  Meteor.subscribe("drivers");
  Meteor.subscribe("rides");
});


// Register Handlebars helpers to use on the views.
Handlebars.registerHelper('isAdmin', function() {
  if (Meteor.user()) {
    return Meteor.user().isAdmin();
  } else {
    return false;
  }
});

Handlebars.registerHelper('isDriver', function() {
  if (Meteor.user()) {
    return Meteor.user().isDriver();
  } else {
    return false;
  }
});

Handlebars.registerHelper('group', function() {
  return Groups.findOne();
});

// Update the user's location every second.
Meteor.setInterval(function() {
  if(Meteor.user() && Geolocation.latLng()) {
    var location = Geolocation.latLng();
    Meteor.user().updateLocation(location.lat, location.lng);
  }
}, 1000);

