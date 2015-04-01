Meteor.methods({
  createNewGroup: function (groupName) {
    //TODO validate name
    Groups.insert({
      name  : groupName,
      admin : this.userId
    }, function(error,id){
      console.log("Group "+error);
    })
  }
});
