Meteor.methods({
  // Join a group, given the group key.
  joinGroup : function (groupName, groupKey) {
    // Find the group to join.
    var group = Groups.findOne({ name : groupName, key : groupKey });
    if(!group) {
      throw new Meteor.Error('group cannot be found, key may be incorrect');
    }
    if (Groups.findOne({members: this.userId})) {
      throw new Meteor.Error('user is already in a group!');
    }
    group.addMember(this.userId, function(err, res) {
      if (err) {
        throw err;
      }
    });
    return group.id;
  } ,
  changeAdmin: function(newAdmin) {
    Groups.findOne({members: this.userId}).changeAdmin(newAdmin);
  },
  removeMember: function(memberToRemove, group) {
    Groups.findOne(group._id).removeMember(memberToRemove);
  }
});
