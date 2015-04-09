this.App = {};

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

// Subscribe to the groups collection on the client.
Meteor.startup(function() {
  Meteor.subscribe("groups");
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
  if(Meteor.user()) {
    var location = Geolocation.latLng() || {lat: 0, lng: 0};
    Meteor.call("updateUserLocation", location.lat, location.lng);
  }
}, 1000);

