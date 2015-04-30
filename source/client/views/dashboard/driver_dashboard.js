/**
 * @summary Renders the driver dashboard template on the screen.
 * @locus Client
 * @method rendered
 * @memberOf driverDashboard
 * @function
 * */
Template.driverDashboard.rendered = function () {
  if (Meteor.isCordova) {
    GeolocationBG.start();
  }
};
/**
 * @summary Removes the driver dashboard template from the screen.
 * @locus Client
 * @method destroyed
 * @memberOf driverDashboard
 * @function
 * */
Template.driverDashboard.destroyed = function () {
  if (Meteor.isCordova) {
    GeolocationBG.stop();
  }
};

Template.driverDashboard.helpers({
  /**
   * @summary Creates a new Ride.
   * @locus Client
   * @method rideModel
   * @memberOf driverDashboard.helpers
   * @function
   * @return {Ride}
   * */
  rideModel: function () {
    return new Ride(this.id, this.user, this.group, this.driver, this.pending, this.pickupLoc, this.destLoc,
      this.pickupAdd, this.destAdd, this.createdAt);
  },
  /**
   * @summary Gets the name of the user that requested the ride..
   * @locus Client
   * @method getRideUser
   * @memberOf driverDashboard.helpers
   * @return {String}
   * @function
   * */
  getRideUser: function () {
    return Users.findOne(this.user).getName();
  },
  /**
   * @summary Gets the time at which the ride was created.
   * @locus Client
   * @method getRideCreatedTime
   * @memberOf driverDashboard.helpers
   * @function
   * @return {Moment} Moment.js object
   * */
  getRideCreatedTime: function () {
    return moment(this.createdAt).fromNow();
  },
  /**
   * @summary Determines whether or not there are any rides in the current queue.
   * @locus Client
   * @method ridesAvailable
   * @memberOf driverDashboard.helpers
   * @function
   * @return {Boolean} true or false
   * */
  ridesAvailable: function () {
    return this.rides.count() > 0;
  } ,
  rideInQueue : function () {
    return (this.pending);
  },
  emptyQueue : function () {
    var queue = Groups.findOne(this.group).queue;
    var driver = UI._templateInstance().data.driver;
    return (queue.length === 0 && driver.currentRide === null);
  },
  currentRide : function () {
    var driver = UI._templateInstance().data.driver.id;
    return (!(this.pending) && (this.driver == driver));
  },
  getPickupAddress: function () {
    return this.pickupAdd;
  },
  isPickupAddress: function () {
    return (this.pickupAdd === undefined);
  },
  getDestAddress: function () {
    return this.destAdd;
  },
  /**
   * @summary Returns the first Ride in the queue.
   * @locus Client
   * @method firstRide
   * @memberOf driverDashboard.helpers
   * @function
   * @return {Ride}
   * */
  firstRide: function () {
    return (Groups.findOne(this.group)).queue.indexOf(this.id) === 0;
  }
});


Template.driverDashboard.events({
  /**
   * @summary Returns the first Ride in the queue.
   * @locus Client
   * @method click .stopDriving
   * @memberOf driverDashboard.events
   * @function
   * @param {Event} event
   * @param {Meteor.template} template
   * */
  'click .stopDriving': function (event, template) {
    template.data.driver.stopDriving(function (err) {
      if (err) {
        console.log(err.message);
      }
    });
  },
  /**
   * @summary Launches navigation to the pickup location.
   * @locus Client
   * @method click #pickup-navigation-button
   * @memberOf driverDashboard.events
   * @function
   * @param {Event} event
   * @param {Meteor.template} template
   * */
  'click #pickup-navigation-button': function (event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [this.pickupLoc.A, this.pickupLoc.F],
        null,
        function () {
          // Do stuff here if opening is successful!
          $("#pickup-navigation-button").remove();
          $("#dest-navigation-button").show();
        },
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
  /**
   * @summary Launches navigation to the navigation location.
   * @locus Client
   * @method click #dest-navigation-button
   * @memberOf driverDashboard.events
   * @function
   * @param {Event} event
   * @param {Meteor.template} template
   * */
  'click #dest-navigation-button': function (event, template) {
    if (Meteor.isCordova) {
      launchnavigator.navigate(
        [this.destLoc.A, this.destLoc.F],
        null,
        function () {
          // Do stuff here if opening is successful!
          $("#dest-navigation-button").remove();
          $("#confirm-dropoff-button").show();
        },
        function (error) {
          // Do stuff here if error happens!
          alert("Plugin error: " + error);
        });
    } else {
      alert("This only works on phones!");
    }
    $("#dest-navigation-button").remove();
    $("#confirm-dropoff-button").show();
  } ,
  /**
   * @summary Confirms that the Rider has been dropped off successfully.
   * @locus Client
   * @method click #confirm-dropoff-button
   * @memberOf driverDashboard.events
   * @function
   * @param {Event} event
   * @param {Meteor.template} template
   * */
  'click #confirm-dropoff-button': function (event, template) {
    this.cancel(function (err, res) {
      if (err) {
        alert(err.message);
      }
    });
  },
  /**
   * @summary Confirms when clicking on a menu item in the side tab.
   * @locus Client
   * @method click .tab-item
   * @memberOf driverDashboard.events
   * @function
   * @param {Event} event
   * @param {Meteor.template} template
   * */
  'click .tab-item': function (event, template) {
    this.cancel(function (err, res) {
      if (err) {
        alert(err.message);
      }
    });
  }
});
