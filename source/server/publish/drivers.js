Meteor.publish("drivers" , function () {
  var user = Users.findOne(this.userId);
  if(user)
    return Drivers.find({ group : user.profile.group });
});