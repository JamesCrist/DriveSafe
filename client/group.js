this.Group = {};

Group.getGroup = function() {
  if (Meteor.userId())
    return Groups.findOne({members: Meteor.userId()});
  else
    return null;
};

Group.getName = function() {
  return this.getGroup().name;
};