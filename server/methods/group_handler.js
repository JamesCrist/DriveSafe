Meteor.methods({
  // Create a new group with a specified name. The admin will be the current logged-in user.
  createNewGroup : function (groupName) {
    // Check if a group with this name already exists.
    if(Groups.find({ name : groupName }).count() > 0) {
      throw new Meteor.Error('group with name ' + groupName + ' already exists');
    }
    // Check if a group with this admin already exists.
    if(Groups.find({ admin : this.userId }).count() > 0) {
      throw new Meteor.Error('this user has already created a group');
    }
    // Create the new group in the database.
    var group = Groups.insert({
      name : groupName ,
      admin : this.userId ,
      members : [ this.userId ],
      drivers : []
    });
    var user = Meteor.users.findOne(this.userId);
    // Update the current user's group and set the user as the admin for this group.
    Users.update(this.userId , { $set : {
      'profile.admin' : true,
      'profile.group' : group
      }
    });

  } ,
  // Join a group, given the group key.
  joinGroup : function (groupKey) {
    // Find the group to join.
    var group = Groups.findOne({ _id : groupKey });
    if(!group) {
      throw new Meteor.Error('group cannot be found, key may be incorrect');
    }

    // Add current logged in user to the list of members for this group.
    Groups.update(group._id , {$push: { members : this.userId } });

    // Update current user's group field
    var user = Meteor.users.findOne(this.userId);
    Meteor.call("updateUserGroup" , user , group._id);
  } ,
  // Remove current user from his/her group.
  leaveGroup : function () {
    // Get the current user and the group he/she belongs to.
    var user = Meteor.users.findOne(this.userId);
    var group = Groups.findOne({members: this.userId});

    // Call helper function.
    Meteor.call("removeMemberFromGroup" , user , group);
  } ,
  // Remove the given user from the given group.
  removeMemberFromGroup : function (memberToRemove , group) {
    // Get all the members of this group.
    var members = group.members;

    // If the member to remove is the admin of the group, make sure
    // that there is no one else left in the group. An admin can only leave
    // the group if it is empty.
    if(group.admin == memberToRemove._id && members.length > 1) {
      throw new Meteor.Error('admins cannot leave a group while there are still other members in the group');
    }

    // Remove user from list of members for this group.
    var index = members.indexOf(memberToRemove._id);
    if(index >= 0) {
      members.splice(index , 1);
    } else {
      throw new Meteor.Error('could not find user in list of group members');
    }

    // Update this group's list of members.
    Groups.update(group._id , { $set : { members : members } });
    // Update this user's current group.
    Meteor.call("updateUserGroup" , memberToRemove , null);

    // If the member to remove was the group's admin, then also delete the group.
    if(group.admin == memberToRemove._id) {
      Groups.remove(group._id);
      Users.update(this.userId , { $set : { 'profile.admin' : false } });
    }
  },
  deleteGroup : function () {
    Groups.findOne({members: this.userId}).delete();
  },
  changeAdmin: function(newAdmin) {
    Groups.findOne({members: this.userId}).changeAdmin(newAdmin);
  },
  addDriverToGroup: function(driver) {
    // Get the driver's group.
    var group = Groups.findOne({ members: this.userId });

    var drivers = group.drivers;
    drivers.push(driver._id);

    Groups.update(group._id , { $set : { drivers : drivers } });
  },
  removeDriverFromGroup: function(driver) {
    // Get the driver's group.
    var group = Groups.findOne({drivers: driver._id});

    var drivers = group.drivers;

    // Remove user from list of members for this group.
    var index = drivers.indexOf(driver._id);
    if(index >= 0) {
      drivers.splice(index , 1);
    } else {
      throw new Meteor.Error('could not find driver in list of group drivers');
    }

    Groups.update(group._id , { $set : { drivers : drivers } });
  },
  removeMember: function(memberToRemove, group) {
    Groups.findOne(group._id).removeMember(memberToRemove);
  }
});
