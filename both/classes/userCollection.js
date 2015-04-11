Meteor.users._transform = function (doc) {
  var newInstance = new User();

  return _.extend(newInstance , doc);
};


User = function () {
};

User.prototype = {
  getName : function () {
    return this.profile.name;
  } ,
  getId : function () {
    return this._id;
  } ,
  getGroup: function() {
    return Groups.findOne(this.profile.group);
  },
  isAdmin : function () {
    return this.profile.isAdmin;
  } ,
  isDriver : function () {
    return this.profile.isDriver;
  } ,
  setIsDriver : function (isDriver) {
    this.profile.isDriver = true;
    Users.update(this.getId() , { $set : { 'profile.isDriver' : isDriver } });
  } ,
  setIsAdmin : function (isAdmin) {
    this.profile.isAdmin = isAdmin;
    Users.update(this.getId() , { $set : { 'profile.isAdmin' : isAdmin } });
  } ,
  setGroup : function (newGroupId) {
    this.profile.group = newGroupId;
    Users.update(this.getId() , { $set : { 'profile.group' : newGroupId } });
  } ,
  leaveGroup : function (callback) {
    // Call the group's remove member function
    var that = this;
    // If user does not have a group already, then just update the user in the database.
    if (!this.getGroup()) {
      Users.update(that._id, {$set: {'profile.group': null, 'profile.isAdmin': false}}, callback);
      return;
    }
    this.getGroup().removeMember(this.getId(), function(err, res) {
      if (err && callback) {
        callback.call(that, err, res);
      } else {
        // No error, so update this user's current group.
        that.setGroup(null);
        Users.update(that._id, {$set: {'profile.group': null, 'profile.isAdmin': false}}, callback);
      }
    });
  } ,
  createGroup : function (newGroupName , callback) {
    // Create a new group object
    var newGroup = new Group(null, newGroupName, null, null, null);
    var that = this;
    newGroup.save(function(err, groupId) {
      if (!err) {
        that.setGroup(groupId);
        that.setIsAdmin(true);
      }
      callback.call(that, err, groupId);
    });
  } ,
  joinGroup : function (groupKey , callback) {
    // Call the server side function to add the current user to a group.
    // This is done server side to improve efficiency and security.
    Meteor.call("joinGroup" , groupKey , function (err) {
      if(!err) {
        this.setGroup(groupKey);
      }
      callback(err);
    }.bind(this));
  } ,
  getGroup : function () {
    return Groups.findOne(this.profile.group);
  } ,
  becomeAdmin: function (callback) {
    var oldAdmin = Users.findOne(this.getGroup().admin);
    var that = this;
    this.getGroup().changeAdmin(this, function(err, res) {
      if (!err) {
        oldAdmin.setIsAdmin(false);
        that.setIsAdmin(true);
      }
      callback.call(that, err, res);
    })
  } ,
  becomeDriver : function (callback) {
    if(!this.getGroup()) {
      var error = new Meteor.Error("User must be in a group to become a driver!");
      callback.call(this, error, null);
      return;
    }
    var that = this;
    this.getGroup().addDriver(this, function(err, res) {
      if (!err) {
        that.setIsDriver((true));
        callback.call(that, err, res);
      }
      callback.call(that, err, res);
    });
  } ,
  stopDriving : function (callback) {
    if(!this.getGroup()) {
      var error = new Meteor.Error("User's group could not be found!");
      callback.call(this, error, null);
      return;
    }
    var that = this;
    this.getGroup().removeDriver(this, function(err, res) {
      if (!err) {
        that.setIsDriver(false);
      }
      callback.call(that, err, res);
    });
  } ,
  updateLocation : function (lat , lng) {
    Users.update(this.getId() , {
      $set : {
        'profile.location' : {lat: lat, lng: lng}
      }
    });
  },
  getDriversCursorForGroup: function() {
    if (!this.getGroup()) {
      return Users.find({"profile.group": null,  "profile.isDriver": true});
    }
    return Users.find({"profile.group": this.getGroup().id, "profile.isDriver": true});
  },
  getLat : function() {
    return Users.findOne(this.getId()).profile.location.lat;
  },
  getLng : function() {
    return Users.findOne(this.getId()).profile.location.lng;
  }
};

if(Meteor.isServer) {

  Users.allow({
    'insert': function (userId,doc) {
      //TODO: do checks here.
      /* user and doc checks ,
       return true to allow insert */
      return true;
    },
    'update': function(userId, doc) {
      //TODO: do checks here.
      return true;
    }
  });

}