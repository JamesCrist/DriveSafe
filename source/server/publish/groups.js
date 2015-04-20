Meteor.publish("groups", function() {
  return Groups.find({members: this.userId});
});