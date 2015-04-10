Template.request_modal.rendered = function() {
	var defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(-33.8902, 151.1759),
	  new google.maps.LatLng(-33.8474, 151.2631));

	var pickupInput = document.getElementById('pickup-input');
	var destInput = document.getElementById('dest-input');

	var options = {
	  bounds: defaultBounds,
	  types: ['establishment']
	};

	var input_autocomplete = new google.maps.places.Autocomplete(pickupInput, options);
	var dest_autocomplete = new google.maps.places.Autocomplete(destInput, options);
	// Bias the autocomplete object to the user's geographical location,
	// as supplied by the browser's 'navigator.geolocation' object.
	function geolocate() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var geolocation = new google.maps.LatLng(
	          position.coords.latitude, position.coords.longitude);
	      var circle = new google.maps.Circle({
	        center: geolocation,
	        radius: position.coords.accuracy
	      });
	      input_autocomplete.setBounds(circle.getBounds());
	      dest_autocomplete.setBounds(circle.getBounds());
	    });
	  }
	}
	
};
/*
Template.request_modal.events({
	'change #pickup-input': function(){
		var userPickupLocation;
		if(pickupInput === ''){
			userPickupLocation = new google.maps.LatLng(Meteor.user().profile.lat, Meteor.user().profile.lng);
		}
		else{
			userPickupLocation = (pickup_autocomplete.getPlace()).geometry.location;
		}
	},
	'change #dest-input': function(){
		var userDestLocation = (dest_autocomplete.getPlace()).geometry.location;
	},
	'click #submit_button': function(){
		//CHECK IF LOCATIONS VALID
		alert("Ride Requested!");
		var pickup_marker = new google.maps.Marker({
		    map: map,
		    title: 'Pickup',
		    position: userPickupLocation
		});
		var dest_marker = new google.maps.Marker({
		    map: map,
		    title: 'Destination',
		    position: userDestLocation
		});
	}
});
*/


