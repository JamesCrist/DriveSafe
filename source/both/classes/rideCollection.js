/**
 * @summary Create a collection of rides in the MongoDB
 * @locus Anywhere
 * @type {Meteor.Collection}
 */
// Create Ride MongoDB collection
Rides = new Meteor.Collection("rides", {
  transform: function (doc) {
    return new Ride(doc._id, doc.user, doc.group, doc.driver, doc.pending, doc.pickupLoc,
      doc.destLoc, doc.pickupAdd, doc.destAdd, doc.createdAt);
  }
});

/**
 * @summary Represents a ride.
 * @param id
 * @param user
 * @param group
 * @param pickupLoc
 * @param destLoc
 * @param createdAt
 * @constructor
 */
// A Ride class that takes a document in its constructor
Ride = function (id, user, group, driver, pending, pickupLoc, destLoc, pickupAdd, destAdd, createdAt) {
  this._id = id;
  if (!user) {
    user = Meteor.userId();
  }
  if (!group) {
    group = Meteor.user().getGroup().id;
  }
  this._user = user;
  this._group = group;
  this._driver = driver;
  this._pending = pending;
  this._pickupLoc = pickupLoc;
  this._destLoc = destLoc;
  this._pickupAdd = pickupAdd;
  this._destAdd = destAdd;
  this._createdAt = createdAt;
};

/**
 * @summary The methods for the ride class.
 * @locus Anywhere
 */
Ride.prototype = {
  get id() {
    // readonly
    return this._id;
  },
  get user() {
    // readonly
    return this._user;
  },
  get group() {
    // readonly
    return this._group;
  },
  get pickupLoc() {
    // readonly
    return this._pickupLoc;
  },
  get destLoc() {
    return this._destLoc;
  },
  get pickupAdd() {
    // readonly
    return this._pickupAdd;
  },
  get destAdd() {
    return this._destAdd;
  },
  get createdAt() {
    return this._createdAt;
  },
  get pending() {
    return this._pending;
  },
  get driver() {
    return this._driver;
  },
  set pickupLoc(value) {
    this._pickupLoc = value;
  },
  set destLoc(value) {
    this._destLoc = value;
  },
  set pending(value) {
    this._pending = value;
  },
  set driver(value) {
    this._driver = value;
  },
  set pickupAdd(value) {
    this._pickupAdd = value;
  },
  set destAdd(value) {
    this._destAdd = value;
  },

  /**
   * @summary Saving functionality for the ride instance.
   * @param callback
   * @memberOf Ride
   * @function
   */
  save: function (callback) {
    if (!this.user) {
      throw new Meteor.Error("User is not defined!");
    }

    if (!this.pickupLoc) {
      throw new Meteor.Error("Pickup location is not defined!");
    }

    if (!this.destLoc) {
      throw new Meteor.Error("Destination location is not defined!");
    }

    var doc = {
      pickupLoc: this.pickupLoc,
      destLoc: this.destLoc,
      destAdd: this.destAdd,
      pickupAdd: this.pickupAdd,
      pending: this.pending,
      driver: this.driver
    };

    // If this ride already exists, then modify it.
    if (this.id) {
      Rides.update(this.id, {$set: doc}, callback);
      // Else, create a new ride.
    } else {
      doc.user = this.user;
      doc.group = this.group;
      doc.createdAt = Date.now();
      console.log(doc.createdAt);

      if (!this.pending) {
        doc.pending = true;
      }

      // remember the context, since in callback it's changed
      var that = this;
      Rides.insert(doc, function (error, result) {
        that._id = result;

        if (callback !== null) {
          callback.call(that, error, result);
        }
      });
    }
  },

  /**
   * @summary Delete functionality for the ride instance.
   * @param callback
   * @function
   * @memberOf Ride
   */
  delete: function (callback) {
    Rides.remove(this.id, callback);
  },

  /**
   * @summary Cancel a ride that has been requested.
   * @param callback
   * @function
   * @memberOf Ride
   */
  cancel: function (callback) {
    if (!this.group) {
      throw new Meteor.Error("group not defined!");
    }
    var that = this;
    if (this.pending) {
      Groups.findOne(this.group).removeRideFromQueue(this.id, function (err, res) {
        if (err) {
          throw err;
        }
        that.delete(callback);
      });
    } else {
      var driver = Drivers.findOne(this.driver);
      driver.currentRide = null;
      driver.save();
      //assign next ride to driver
      var queue = Groups.findOne(this.group).queue;
      if(queue.length > 0){
        //get the first ride in queue
        var ride = Rides.findOne(queue[0]);
        ride.assignTo(driver);
        ride.save();
        Groups.findOne(this.group).removeRideFromQueue(ride.id);
      }
      that.delete(callback);
    }
  } ,

  /**
   * @summary Assign a ride to a driver
   * @param driver
   * @function
   * @memberOf Ride
   */
  assignTo: function (driver, callback) {
    if (driver.currentRide) {
      throw Meteor.Error("Ride cannot be assigned to driver who already has a ride!");
    }
    this.driver = driver.id;
    this.pending = false;
    this.save();
    var group = Groups.findOne(driver.group);
    driver.currentRide = this.id;
    driver.save();
    group.removeRideFromQueue(this.id, callback);
  }
};


if (Meteor.isServer) {

  Rides.allow({
    // Drivers cannot ask for rides.
    'insert': function (userId, doc) {
      return !Users.findOne(userId).isDriver() && doc.user === userId;
    } ,
    'update' : function (userId , doc) {
      return (doc.user === userId || Users.findOne(userId).isDriver()) || (doc.user !== userId);
    },
    'remove': function (userId, doc) {
      return doc.user === userId || Users.findOne(userId).isDriver();
    }
  });
}
