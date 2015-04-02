Meteor.methods({
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
    Groups.insert({
      name : groupName ,
      admin : this.userId ,
      members : [ this.userId ]
    });
    // Update the current user's group and set the user as the admin for this group.
    Meteor.call("updateUserGroup", groupName);
    Users.update(this.userId, { $set: {'profile.admin': true}});

  } ,
  joinGroup : function (groupKey) {
    console.log(groupKey);
    var group = Groups.findOne({_id: groupKey});
    if (!group) {
      throw new Meteor.Error('group cannot be found, key may be incorrect');
    }
    console.log(group);

    var members = group.members;
    members.push(this.userId);

    Meteor.call("updateUserGroup", group.name);
    Groups.update(group._id, {$set: {members: members}});
  },
  leaveGroup : function () {
    var user = Meteor.users.findOne(this.userId);
    var group = Groups.findOne({name: user.profile.group});
    var members = group.members;
    console.log(members);

    if (group.admin == this.userId) {
      console.log("error: admins cannot leave a group");
      throw new Meteor.Error('admins cannot leave a group');
    }

    // Remove user from list of members for this group.
    var index = members.indexOf(this.userId);
    if (index >= 0) {
      members.splice( index, 1 );
    } else {
      throw new Meteor.Error('could not find user in list of group members');
    }

    Groups.update(group._id, {$set: {members: members}});
    Meteor.call("updateUserGroup", null);
  } ,
  getGroupKey : function() {
    var user = Meteor.users.findOne(this.userId);
    var group = Groups.findOne({name: user.profile.group});

    if (group.admin != this.userId) {
      throw new Meteor.Error('only admins can see group key');
    }

    return group._id;
  }

});
