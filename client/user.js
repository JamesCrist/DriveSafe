// Definition of the user class. Due to Meteor restrictions, this class
// is only defined on the client and cannot be used on the server. On the client,
// it is instantiated whenever a call to Meteor.user() or Users.findOne() is made.
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
  setIsDriver: function(isDriver) {
    this.profile.isDriver = true;
    Users.update(this.getId() , { $set : { 'profile.isDriver' : isDriver } });
  },
  setIsAdmin: function(isAdmin) {
    this.profile.admin = isAdmin;
    Users.update(this.getId() , { $set : { 'profile.admin' : isAdmin } });
  },
  setGroup: function(newGroupId) {
    this.profile.group = newGroupId;
    Users.update(this.getId() , { $set : { 'profile.group' : newGroupId } });
  },
  leaveGroup: function(callback) {
    // Call the server side function to remove this member form the group.
    // This is done server side to improve efficiency and security.
    Meteor.call("removeMember", this, Groups.findOne(), function(err) {
      if (!err) {
        this.setGroup(null);
      }
      callback(err);
    }.bind(this));
  },
  createGroup: function(newGroupName, callback) {
    // Call the server side function to create a group. This is done
    // server side to improve efficiency and security.
    Meteor.call("createNewGroup", newGroupName, function(err, groupId) {
      if (!err) {
        this.setGroup(groupId);
        this.setIsAdmin(true);
      }
      callback(err);
    }.bind(this));
  },
  joinGroup: function(groupKey, callback) {
    // Call the server side function to add the current user to a group.
    // This is done server side to improve efficiency and security.
    Meteor.call("joinGroup", groupKey, function(err) {
      if (!err) {
        this.setGroup(groupKey);
      }
      callback(err);
    }.bind(this));
  },
  getGroup: function() {
    return Groups.findOne(this.profile.group);
  },
  becomeDriver: function(callback) {
    if (!this.getGroup()) {
      callback({message: "user must be in a group to become a driver"});
      return;
    }
    if (!Groups.findOne().addDriver(this.getId())) {
      callback({message: "user is already a driver!"});
    } else {
      this.setIsDriver(true);
    }
    callback(null);
  },
  stopDriving: function(callback) {
    this.setIsDriver(false);
    if (!this.getGroup()) {
      callback({message: "user's group could not be found"});
      return;
    }
    Groups.findOne().removeDriver(this.getId());
    callback(null);
  },
  updateLocation: function(lat, lng) {
    Users.update(this.getId(), {
      $set: {
        'profile.lat': lat,
        'profile.lng': lng
      }
    });
  }
};



Meteor.users._transform = function(doc) {
  var newInstance = Object.create(user);

  return _.extend(newInstance, doc);
};
