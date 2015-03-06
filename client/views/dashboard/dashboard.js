var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Dashboard.rendered = function() {
};

Template.Dashboard.created = function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('dashboardMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      title: "Your Location",
      animation: google.maps.Animation.DROP
    });
  });
};

Template.Dashboard.events({
});

Template.Dashboard.helpers({
  dashboardMapOptions: function() {
     // Map initialization options
    var position = Geolocation.latLng() || { lat : 0 , lng : 0 };
    if(Geolocation.error()) {
      pageSession.set("errorMessage" , Geolocation.error().message);
    }
    return {
      center : new google.maps.LatLng(position.lat , position.lng) ,
      zoom : 15
    };
  },
  errorMessage: function() {
    return pageSession.get("errorMessage");
  },
  mapIsLoaded: function() {
    return GoogleMaps.loaded();
  }
});