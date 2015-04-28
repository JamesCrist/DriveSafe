Template.driverDashboard.rendered = function() {
  if (Meteor.isCordova) {
    GeolocationBG.start();
  }
};

Template.driverDashboard.destroyed = function() {
  if (Meteor.isCordova) {
    GeolocationBG.stop();
  }
};


Template.driverDashboard.helpers({
  rideModel: function() {
    return new Ride(this.id, this.user, this.group, this.pickupLoc, this.destLoc, this.pickupAdd, this.destAdd, this.createdAt);
  },
  getRideUser: function() {
    return Users.findOne(this.user).getName();
  },
  getRideCreatedTime: function() {
    return moment(this.createdAt).fromNow();
  },
  ridesAvailable: function() {
    return this.rides.count() > 0;
  },
  firstRide: function(){
    return (Groups.findOne(this.group)).queue.indexOf(this.id) === 0;
  },
  getPickupAddress: function(){
    return this.pickupAdd;
  },
  getDestAddress: function(){
    return this.destAdd;
  }
});


Template.driverDashboard.events({
  'click .stopDriving': function(event, template) {
    template.data.driver.stopDriving(function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  } ,
  'click #pickup-navigation-button': function(event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [ this.pickupLoc.k , this.pickupLoc.D ] ,
        null ,
        function () {
          // Do stuff here if opening is successful!
          $("#pickup-navigation-button").remove();
          $("#dest-navigation-button").show();
        } ,
        function (error) {
          // Do stuff here if error happens!
          alert("Plugin error: " + error);
        });
    } else {
      alert("This only works on phones!");
    }
    $("#pickup-navigation-button").remove();
    $("#dest-navigation-button").show();
  },
  'click #dest-navigation-button': function(event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [ this.destLoc.k , this.destLoc.D ] ,
        null ,
        function () {
          // Do stuff here if opening is successful!
          $("#dest-navigation-button").remove();
          $("#confirm-dropoff-button").show();
        } ,
        function (error) {
          // Do stuff here if error happens!
          alert("Plugin error: " + error);
        });
    } else {
      alert("This only works on phones!");
    }
    $("#dest-navigation-button").remove();
    $("#confirm-dropoff-button").show();
  }, 
  'click #confirm-dropoff-button': function(event, template) {
    this.cancel(function(err, res) {
      if (err) {
        alert(err.message);
      }
    });
  },
  'click .tab-item': function(event, template) {
    this.cancel(function(err, res) {
      if (err) {
        alert(err.message);
      }
    });
  }
});