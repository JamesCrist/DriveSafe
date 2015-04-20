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

  if (Meteor.isCordova) {
    GeolocationBG.config({
      // your server url to send locations to
      //   YOU MUST SET THIS TO YOUR SERVER'S URL
      //   (see the setup instructions below)
      url: 'http://drivesafe.meteor.com/api/geolocation',
      params: {
        // will be sent in with 'location' in POST data (root level params)
        // these will be added automatically in setup()
        //userId: GeolocationBG.userId(),
        //uuid:   GeolocationBG.uuid(),
        //device: GeolocationBG.device()
      },
      headers: {
        // will be sent in with 'location' in HTTP Header data
      },
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      // Android ONLY, customize the title of the notification
      notificationTitle: 'Background GPS',
      // Android ONLY, customize the text of the notification
      notificationText: 'ENABLED',
      //
      activityType: 'AutomotiveNavigation',
      // enable this hear sounds for background-geolocation life-cycle.
      debug: false
    });
  }
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

