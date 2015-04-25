/**
 * @summary Create a collection of rides in the MongoDB
 * @locus Anywhere
 * @type {Meteor.Collection}
 */
// Create Ride MongoDB collection
Rides = new Meteor.Collection("rides", {
  transform: function(doc) {
    return new Ride(doc._id, doc.user, doc.group, doc.pickupLoc, doc.destLoc, doc.createdAt);
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
Ride = function (id, user, group, pickupLoc, destLoc, pickupAdd, destAdd, createdAt) {
  this._id = id;
  if (!user) {
    user = Meteor.userId();
  }
  if (!group) {
    group = Meteor.user().getGroup().id;
  }
  this._user = user;
  this._group = group;
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
    return this._pickupLoc;
  },
  get destAdd() {
    return this._destLoc;
  },
  get createdAt() {
    return this._createdAt;
  },
  set pickupLoc(value) {
    this._pickupLoc = value;
  },
  set destLoc(value) {
    this._destLoc = value;
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
   * @function
   */
  save: function(callback) {
    if (!this.user) {
      throw new Meteor.Error("User is not defined!");
    }

    if (Rides.findOne({user: this.user})) {
      throw new Meteor.Error("User has already requested a ride!");
    }

    if (!this.pickupLoc) {
      throw new Meteor.Error("Pickup location is not defined!");
    }

    if (!this.destLoc) {
      throw new Meteor.Error("Destination location is not defined!");
    }

    var doc = {
      pickupLoc: this.pickupLoc,
      destLoc: this.destLoc
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

      // remember the context, since in callback it's changed
      var that = this;
      Rides.insert(doc , function (error , result) {
        that._id = result;

        if(callback != null) {
          callback.call(that , error , result);
        }
      });
    }
  },

  /**
   * @summary Delete functionality for the ride instance.
   * @param callback
   * @function
   */
  delete: function(callback) {
    Rides.remove(this.id, callback);
  },

  /**
   * @summary Cancel a ride that has been requested.
   * @param callback
   * @function
   */
  cancel: function(callback) {
    if (!this.group) {
      throw new Meteor.Error("group not defined!");
    }
    var that  = this;
    console.log(Groups.findOne(this.group));
    Groups.findOne(this.group).removeRideFromQueue(this.id, function(err, res) {
      if (err) {
        throw err;
      }
      that.delete(callback);
    });

  }
};


if(Meteor.isServer) {

  Rides.allow({
    // Drivers cannot ask for rides.
    'insert' : function (userId , doc) {
      return !Users.findOne(userId).isDriver() && doc.user === userId;
    } ,
    'update' : function (userId , doc) {
      return doc.user === userId || Users.findOne(userId).isDriver();
    },
    'remove' : function (userId , doc) {
      return doc.user === userId || Users.findOne(userId).isDriver();
    }
  });
}
