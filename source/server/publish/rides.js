Meteor.publish("rides", function() {
  var user = Users.findOne(this.userId);
  if (user)
    return Rides.find({group: user.profile.group});
});