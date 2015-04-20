// Create Groups MongoDB collection
Groups = new Meteor.Collection("groups", {
  transform: function(doc) {
    return new Group(doc._id, doc.name, doc.admin, doc.members, doc.drivers, doc.queue, doc.key);
  }
});

// A Group class that takes a document in its constructor
Group = function (id, name, admin, members, drivers, queue, key) {
  this._id = id;
  this._name = name;
  // If admin is not defined, define admin to be the current
  // user.
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

  delete: function(callback) {
    if (!Meteor.user().isAdmin()) {
      throw new Meteor.Error("Access Denied!");
    }

    if (this.members && this.members.length > 1) {
      throw new Meteor.Error("Group has members!");
    }
    Groups.remove(this.id, callback);
  },

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

  membersModel: function() {
    var members = [];
    for (var member in this.members) {
      members.push(Users.findOne(this.members[member]));
    }
    return members;
  },

  removeMember: function(memberId, callback) {
    if (this.admin == memberId && this.members.length > 1) {
      var error = new Meteor.Error('Admin cannot leave while there are still others in a group!');
      console.log(error);
      callback.call(this, error, null);
      return;
    }

    // Remove user from list of members for this group.
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

  addDriver: function(driver, callback) {
    if (!driver) {
      throw new Meteor.Error("Driver is not defined!");
    }
    // Check to make sure the driver is already a member of the group.
    var index = this.members.indexOf(driver.getId());
    if (index < 0) {
      throw new Meteor.Error("User must already be a member to become a driver!");
    }

    // Add user to list of drivers for this group.
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

  removeDriver: function(driver, callback) {
    if (!driver) {
      throw new Meteor.Error("Driver is not defined!");
    }
    // Remove user from list of members for this group.
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
