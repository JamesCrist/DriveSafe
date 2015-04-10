// Create Groups MongoDB collection
Groups = new Meteor.Collection("groups", {
  transform: function(doc) {
    return new Group(doc._id, doc.name, doc.admin, doc.members, doc.drivers);
  }
});

//TODO: finish implementation

// A Group class that takes a document in its constructor
Group = function (id, name, admin, members, drivers) {
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
  set admin(value) {
    this._admin = value;
  },
  set members(value) {
    this._members = value;
  },
  set drivers(value) {
    this._drivers = value;
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

    var doc = {
      admin: this.admin,
      members: this.members,
      drivers: this.drivers
    };

    // If this group already exists, then modify it.
    if (this.id) {
      Groups.update(this.id, {$set: doc}, callback);
      // Else, create a new group.
    } else {
      doc.name = this.name;
      if (Groups.findOne({name: this.name})) {
        throw new Meteor.Error("Group with name " + name + " already exists!");
      }

      // remember the context, since in callback it's changed
      var that = this;
      Groups.insert(doc, function(error, result) {
        that._id = result;

        if (callback != null) {
          callback.call(that, error, result);
        }
      });
    }
  },
  delete: function(callback) {
    if (!Meteor.user().profile.admin) {
      throw new Meteor.Error("Access Denied!");
    }

    if (this.members && this.members.length > 0) {
      throw new Meteor.Error("Group has members!");
    }
    Groups.remove(this.id, callback);
  },
  membersModel: function() {
    var members = [];
    for (var member in this.members) {
      members.push(Users.findOne(this.members[member]));
    }
    return members;
  },
  removeMember: function(member, callback) {
    if (this.admin == member._id && this.members.length > 1) {
      throw new Meteor.Error('Admin cannot leave while there are still others in a group!');
    }

    // Remove user from list of members for this group.
    var newMembers = this.members;
    var index = newMembers.indexOf(member._id);
    if(index >= 0) {
      newMembers.splice(index , 1);
      this._members = newMembers;
    } else {
      throw new Meteor.Error('Could not find member to remove!');
    }

    // If there are still members in the group, then just update it, else
    // if there are no members left then delete the group.
    if (this.members.length > 0) {
      this.save(callback);
    } else {
      this.delete(callback);
    }
  },
  addMember: function(member, callback) {

  }
};



/*
var group = {
  getName: function () {
    return this.name;
  },
  getId: function() {
    return this._id;
  },
  getMembers: function (includeAdmin) {
    if (!includeAdmin) {
      includeAdmin = false;
    }
    var members = [];
    for (var i = 0; i < this.members.length; ++i) {
      if (!includeAdmin && this.members[i] == this.admin)
        continue;
      members.push(Users.findOne(this.members[i]));
    }
    return members;
  },
  getMembersIds: function() {
    return this.members;
  },
  getNumMembers: function() {
    return this.members.length;
  },
  getAdmin: function() {
    return Users.findOne(this.admin);
  },
  getDrivers: function() {
    var drivers = [];
    for (var i = 0; i < this.drivers.length; ++i) {
      drivers.push(Users.findOne(this.drivers[i]));
    }
    return drivers;
  },
  getDriversIds: function() {
    return this.drivers;
  },
  addDriver: function(driverId) {
    // Check to make sure the driver is already a member of the group.
    var index = this.getMembersIds().indexOf(driverId);
    if (index < 0) {
      return false;
    }

    // Remove user from list of members for this group.
    index = this.getDriversIds().indexOf(driverId);
    if(index < 0) {
      this.getDriversIds().push(driverId);
      Groups.update(this.getId() , {
        $set : {
          drivers : this.getDriversIds()
        }
      });
      return true;
    }
    return false;
  },
  removeDriver: function(driverId) {
    // Remove user from list of members for this group.
    var index = this.getDriversIds().indexOf(driverId);
    if(index >= 0) {
      this.getDriversIds().splice(index , 1);
      Groups.update(this.getId() , {
        $set : {
          drivers : this.getDriversIds()
        }
      });
    }
  }
};

// Add methods that can only be run from thre server
if (Meteor.isServer) {
  group.changeAdmin = function(newAdmin) {
    if(!newAdmin) {
      throw new Meteor.Error('new admin cannot be null');
    }

    // Get the current user.
    var currentAdmin =this.getAdmin();
    console.log(currentAdmin);

    // Remove admin privileges from the current user.
    currentAdmin.profile.admin = false;
    Users.update(currentAdmin._id , { $set : { 'profile.admin' : false } });

    // Update the group admin.
    this.admin = newAdmin._id;
    Groups.update(this.getId() , { $set : { admin : newAdmin._id } });

    // Add admin privileges to the new admin.
    Users.update(newAdmin._id , { $set : { 'profile.admin' : true } });
  };
  group.removeMember = function(memberToRemove) {
    // If the member to remove is the admin of the group, make sure
    // that there is no one else left in the group. An admin can only leave
    // the group if it is empty.
    if(this.getAdmin()._id == memberToRemove._id && this.getNumMembers() > 1) {
      throw new Meteor.Error('admins cannot leave a group while there are still other members in the group');
    }

    // Remove user from list of members for this group.
    var index = this.getMembersIds().indexOf(memberToRemove._id);
    if(index >= 0) {
      this.getMembersIds().splice(index , 1);
    } else {
      throw new Meteor.Error('could not find user in list of group members');
    }

    // Update this group's list of members.
    Groups.update(this.getId() , { $set : { members : this.getMembersIds()} });

    // Update this user's current group.
    memberToRemove.profile.group = null;
    Users.update(memberToRemove._id, {$set: {'profile.group': null}});

    // If the member to remove was the group's admin, then also delete the group.
    if(this.admin == memberToRemove._id) {
      Groups.remove(this.getId());
      memberToRemove.profile.admin = false;
      Users.update(memberToRemove._id , { $set : { 'profile.admin' : false } });
    }
  };
  group.addMember = function(newMemberId) {
    var index = this.getMembersIds().indexOf(newMemberId);
    if (!newMemberId || index >= 0) {
      return false;
    }
    // Add current logged in user to the list of members for this group.
    Groups.update(this.getId() , {$push: { members : newMemberId } });
    return true;
  };
  group.delete = function() {
    // Loop through all members of this group, and delete them all.
    for(var i = 0 ; i < this.getMembers(false).length ; ++i) {
      this.removeMember(this.getMembers()[ i ]);
    }
    // Finally, remove the admin from the group. This will also delete the group.
    this.removeMember(this.getAdmin());
  }
}

Groups = new Meteor.Collection("groups", {
  transform: function (doc) {
    // create a new empty object with pomodoro as it's prototype
    var newInstance = Object.create(group);

    // copy the data from doc to newInstance and return newInstance
    return  _.extend(newInstance, doc);
  }
});
*/
