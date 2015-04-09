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
    return Groups.insert({
      name : groupName ,
      admin : this.userId ,
      members : [ this.userId ] ,
      drivers : []
    });
  } ,
  // Join a group, given the group key.
  joinGroup : function (groupKey) {
    // Find the group to join.
    var group = Groups.findOne({ _id : groupKey });
    if(!group) {
      throw new Meteor.Error('group cannot be found, key may be incorrect');
    }
    if (!group.addMember(this.userId)) {
      throw new Meteor.Error('member could not be added');
    }
  } ,
  // These are wrappers for the server-side only Group methods.
  // They allow the client to all the methods on the server.
  deleteGroup : function () {
    Groups.findOne({members: this.userId}).delete();
  },
  changeAdmin: function(newAdmin) {
    Groups.findOne({members: this.userId}).changeAdmin(newAdmin);
  },
  removeMember: function(memberToRemove, group) {
    Groups.findOne(group._id).removeMember(memberToRemove);
  }
});
