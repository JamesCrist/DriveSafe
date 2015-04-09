// create an object with the desired methods to use as prototype
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
