Meteor.methods({
  // Join a group, given the group key.
  joinGroup : function (groupKey) {
    // Find the group to join.
    var group = Groups.findOne({ _id : groupKey });
    if(!group) {
      throw new Meteor.Error('group cannot be found, key may be incorrect');
    }
    group.addMember(this.userId, function(err, res) {
      if (err) {
        throw err;
      }
    });
  } ,
  changeAdmin: function(newAdmin) {
    Groups.findOne({members: this.userId}).changeAdmin(newAdmin);
  },
  removeMember: function(memberToRemove, group) {
    Groups.findOne(group._id).removeMember(memberToRemove);
  }
});
