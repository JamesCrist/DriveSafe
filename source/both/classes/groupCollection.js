/**
 * @summary Constructor for a Collection
 * @locus Anywhere
 * @instancename collection
 * @class
 * @param {String} name The name of the collection.  If null, creates an unmanaged (unsynchronized) local collection.
 * @param {Object} [options]
 * @param {Object} options.connection The server connection that will manage this collection. Uses the default connection if not specified.  Pass the return value of calling [`DDP.connect`](#ddp_connect) to specify a different server. Pass `null` to specify no connection. Unmanaged (`name` is null) collections cannot specify a connection.
 * @param {String} options.idGeneration The method of generating the `_id` fields of new documents in this collection.  Possible values:
 - **`'STRING'`**: random strings
 - **`'MONGO'`**:  random [`Mongo.ObjectID`](#mongo_object_id) values
The default id generation technique is `'STRING'`.
 * @param {Function} options.transform An optional transformation function. Documents will be passed through this function before being returned from `fetch` or `findOne`, and before being passed to callbacks of `observe`, `map`, `forEach`, `allow`, and `deny`. Transforms are *not* applied for the callbacks of `observeChanges` or to cursors returned from publish functions.
 */

/**
 * @summary Creates a collection of groups in the MongoDB
 * @locus Anywhere
 * @type {Meteor.Collection}
 */
// Create Groups MongoDB collection
Groups = new Meteor.Collection("groups", {
  transform: function(doc) {
    return new Group(doc._id, doc.name, doc.admin, doc.members, doc.drivers, doc.queue, doc.key);
  }
});

/**
 * @summary Represents a group as a class. The constructor takes a document.
 * @locus Anywhere
 * @param id - The ID of the group.
 * @param name - The name of the group.
 * @param admin - The user who administrates the group.
 * @param members - An array of the members of the group.
 * @param drivers - An array of the current drivers of the group.
 * @param queue - An array of the current ride requests in the group.
 * @param key - The password to join the group.
 * @constructor
 */
// A Group class that takes a document in its constructor
Group = function (id, name, admin, members, drivers, queue, key) {
  this._id = id;
  this._name = name;
  // If admin is not defined, define admin to be the current user.
  if (!admin) {
    admin = Meteor.userId();
  }
  this._admin = admin;
  // Check to see if members is undefined or null,
  // if so then make into empty array.
  if (!members) {
    members = [];
  }
  // If members is empty or admin is not in members, add admin.
  if (members.length === 0 || members.indexOf(admin) < 0) {
    members.push(admin);
  }
  this._members = members;
  // If drivers is null or undefined, make it an empty array.
  if (!drivers) {
    drivers = [];
  }
  this._drivers = drivers;
  // If queue is null or undefined, make it an empty array
  if (!queue) {
    queue = [];
  }
  this._queue = queue;
  // Set key to DB ID
  this._key = key;
};

/**
 * @summary The methods for the group class.
 * @locus Anywhere
 */
Group.prototype = {
  get id() {
    // readonly
    return this._id;
  },
  get name() {
    // readonly
    return this._name;
  },
  get admin() {
    // readonly
    return this._admin;
  },
  get members() {
    return this._members;
  },
  get drivers() {
    return this._drivers;
  },
  get queue() {
    return this._queue;
  },
  get key() {
    return this._key;
  },
  set admin(value) {
    this._admin = value;
  },
  set members(value) {
    this._members = value;
  },
  set drivers(value) {
    this._drivers = value;
  },
  set key(value) {
    this._key = value;
  },

  /**
   * @summary Saving functionality for the group instance.
   * @param callback
   * @function
   */
  save: function(callback) {
    if (!this.name) {
      throw new Meteor.Error("Name is not defined!");
    }

    if (!this.admin) {
      throw new Meteor.Error("Admin is not defined!");
    }

    if (!this.members || this.members.length === 0) {
      throw new Meteor.Error("Members must be defined or have at least one member!");
    }

    if (!this.drivers) {
      throw new Meteor.Error("Drivers must be defined!");
    }

    if (!this.key) {
      throw new Meteor.Error("Key must be defined!")
    }

    var doc = {
      admin: this.admin,
      members: this.members,
      drivers: this.drivers,
      queue: this.queue,
      key: this.key
    };

    console.log(doc);

    // If this group already exists, then modify it.
    if (this.id) {
      Groups.update(this.id, {$set: doc}, callback);
      // Else, create a new group.
    } else {
      doc.name = this.name;

      // remember the context, since in callback it's changed
      var that = this;

      Meteor.call("nameIsAvailable", this.name, function(availabilityError) {
        if (availabilityError) {
          callback.call(that , new Meteor.Error("Name is not available!") , null);
        } else {
          Groups.insert(doc , function (error , result) {
            that._id = result;

            if(callback != null) {
              callback.call(that , error , result);
            }
          });
        }
      });
    }
  },

  /**
   * @summary Deletes a group instance with an empty members array.
   * @param callback
   * @function
   */
  delete: function(callback) {
    if (!Meteor.user().isAdmin()) {
      throw new Meteor.Error("Access Denied!");
    }

    if (this.members && this.members.length > 1) {
      throw new Meteor.Error("Group has members!");
    }
    Groups.remove(this.id, callback);
  },

  /**
   * @summary Deletes a group instance after removing all members.
   * @param callback
   * @function
   */
  forceDelete: function(callback) {
    var that = this;

    for (var member in this.members) {
      if (this.members[member] == this.admin) {
        continue;
      }
      Users.findOne(this.members[member]).leaveGroup(function(err, res) {
        if(err) {
          console.log(err);
          callback.call(that , err , res);
          return;
        }
      });
    }
    Users.findOne(this.admin).leaveGroup(function(err, res) {
      if(err) {
        console.log(err);
        callback.call(that , err , res);
        return;
      } else {
        that.delete(callback);
      }
    });
  },

  /**
   * @summary Returns the array of members in the group.
   * @function
   * @returns {Array}
   */
  membersModel: function() {
    var members = [];
    for (var member in this.members) {
      members.push(Users.findOne(this.members[member]));
    }
    return members;
  },

  /**
   * @summary Remove specific member from group member array.
   * @param memberId
   * @param callback
   * @function
   */
  removeMember: function(memberId, callback) {
    if (this.admin == memberId && this.members.length > 1) {
      var error = new Meteor.Error('Admin cannot leave while there are still others in a group!');
      console.log(error);
      callback.call(this, error, null);
      return;
    }

    // Remove user from array of members for this group.
    var newMembers = this.members;
    var index = newMembers.indexOf(memberId);
    if(index >= 0) {
      newMembers.splice(index , 1);
      this._members = newMembers;
    } else {
      var error = new Meteor.Error("Could not find member to remove!");
      console.log(error);
      callback.call(this, error, null);
      return;
    }

    // If there are still members in the group, then just update it, else
    // if there are no members left then delete the group.
    if (this.members.length > 0) {
      this.save(callback);
    } else {
      this.delete(callback);
    }
  },

  /**
   * @summary Add specific member to group member array
   * @param memberId
   * @param callback
   * @function
   */
  addMember: function(memberId, callback) {
    if (!memberId) {
      var error = new Meteor.Error("MemberId to add cannot be null!");
      callback.call(this, error, null);
      return;
    }
    if (this.members.indexOf(memberId) >= 0) {
      var error = new Meteor.Error("User is already in the group!");
      callback.call(this, error, null);
      return;
    }
    var newMembers = this.members;
    newMembers.push(memberId);
    this._members = newMembers;

    this.save(callback);
  },

  /**
   * @summary Change group admin to specified user
   * @param newAdmin
   * @param callback
   * @function
   */
  changeAdmin: function(newAdmin, callback) {
    if (!newAdmin) {
      var error = new Meteor.Error("New admin must be defined!");
      callback.call(this, error, null);
      return;
    }
    if (this.members.indexOf(newAdmin.getId()) < 0 ) {
      var error = new Meteor.Error("User must be in group already to be made admin!");
      callback.call(this, error, null);
      return;
    }
    this._admin = newAdmin.getId();
    this.save(callback);
  },

  /**
   * @summary Add driver to group driver array.
   * @param driver
   * @param callback
   * @function
   */
  addDriver: function(driver, callback) {
    if (!driver) {
      throw new Meteor.Error("Driver is not defined!");
    }
    // Check to make sure the driver is already a member of the group.
    var index = this.members.indexOf(driver.getId());
    if (index < 0) {
      throw new Meteor.Error("User must already be a member to become a driver!");
    }

    // Add user to array of drivers for this group.
    index = this.drivers.indexOf(driver.getId());
    var newDrivers = this.drivers;
    if(index < 0) {
      newDrivers.push(driver.getId());
      this._drivers = newDrivers;
      this.save(callback);
    } else {
      throw new Meteor.Error("User is already a driver for this group!");
    }
  },

  /**
   * @summary Remove driver from group driver array
   * @param driver
   * @param callback
   * @function
   */
  removeDriver: function(driver, callback) {
    if (!driver) {
      throw new Meteor.Error("Driver is not defined!");
    }
    // Remove user from array of members for this group.
    var index = this.drivers.indexOf(driver.getId());
    var newDrivers = this.drivers;
    if(index >= 0) {
      newDrivers.splice(index , 1);
      this._drivers = newDrivers;
      this.save(callback);
    } else {
      throw new Meteor.Error("User is not a driver of this group!");
    }
  },

  /**
   * @summary Add ride to group ride queue
   * @param ride
   * @param callback
   * @function
   */
  addRideToQueue: function(ride, callback) {
    if (!ride) {
      throw new Meteor.Error("Ride is not defined!");
    }
    if (!ride.id) {
      throw new Meteor.Error("Ride id is not defined!");
    }

    var index = this.queue.indexOf(ride.id);
    if (index >= 0) {
      throw new Meteor.Error("Ride is already in queue!");
    }
    this.queue.push(ride.id);
    this.save(callback);
  },

  /**
   * @summary Change group key to new specified key
   * @param newKey
   * @param callback
   * @function
   */
  changeKey: function(newKey, callback) {
    if (!newKey) {
      var error = new Meteor.Error("New key is not defined!");
      callback.call(this, error, null);
      return;
    }
    if (newKey.length <= 6) {
      var error = new Meteor.Error("New key must be at least 6 characters");
      callback.call(this, error, null);
      return;
    }
    this._key = newKey;
    this.save(callback);
  },

  /**
   * @summary Remove ride from group ride queue
   * @param rideId
   * @param callback
   * @function
   */
  removeRideFromQueue: function(rideId, callback) {
    if (this.queue.length === 0) {
      throw new Meteor.Error("Queue is already empty!");
    }
    if (!rideId) {
      throw new Meteor.Error("Ride must be defined!");
    }
    // Remove ride from queue.
    var newQueue = this.queue;
    var index = newQueue.indexOf(rideId);
    if(index >= 0) {
      newQueue.splice(index , 1);
      this._queue = newQueue;
      this.save(callback);
    } else {
      var error = new Meteor.Error("Could not find ride to remove!");
      console.log(error);
      callback.call(this, error, null);
    }
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    'nameIsAvailable' : function (name) {
      if(Groups.findOne({ name : name })) {
        throw new Meteor.Error("Name is not available!");
      }
    }
  });
}
