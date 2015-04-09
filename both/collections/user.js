// create an object with the desired methods to use as prototype
var user  = {
  getName: function () {
    return this.profile.name;
  },
  getId: function() {
    return this._id;
  },
  isAdmin: function() {
    return this.profile.admin;
  },
  isDriver: function() {
    return this.profile.isDriver;
  },
  setIsAdmin: function(isAdmin) {
    this.profile.admin = isAdmin;
    Users.update(this.getId() , { $set : { 'profile.admin' : isAdmin } });
  },
  setGroup: function(newGroup) {
    Meteor.call("removeMember", this, Groups.findOne());
    this.profile.group = newGroup;
    Users.update(this.getId(), {$set : {'profile.group': newGroup}});
  },
  getGroup: function() {
    return Groups.findOne(this.profile.group);
  }
};



Meteor.users._transform = function(doc) {
  var newInstance = Object.create(user);

  return _.extend(newInstance, doc);
};
