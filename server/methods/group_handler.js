Meteor.methods({
  createNewGroup: function (groupName) {
    // Check if a group with this name already exists.
    if (Groups.find({name: groupName}).count() > 0 ) {
      throw new Meteor.Error('Groups Error', 'group with name ' + groupName + ' already exists');
    }
    // Check if a group with this admin already exists.
    if (Groups.find({admin: this.userId}).count() > 0) {
      throw new Meteor.Error('Groups Error', 'this user has already created a group');
    }

    Groups.insert({
      name: groupName,
      admin: this.userId
    }, function(error){
      console.log("Group "+error);
    });
  }
});
