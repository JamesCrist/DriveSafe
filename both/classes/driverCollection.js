// Create Drivers MongoDB collection
Drivers = new Meteor.Collection("drivers" , {
  transform : function (doc) {
    return new Driver(doc._id , doc.group , doc.user , doc.currentRide);
  }
});

// A Driver class that takes a document in its constructor
Driver = function (id , group , user , currentRide) {
  this._id = id;
  if(!user) {
    user = Meteor.userId();
  }
  if(!group && Meteor.user()) {
    group = Meteor.user().profile.group;
  }
  this._group = group;
  this._user = user;
  this._currentRide = currentRide;
};

Driver.prototype = {
  get id() {
    // readonly
    return this._id;
  } ,
  get user() {
    // readonly
    return this._user;
  } ,
  get group() {
    return this._group;
  } ,
  get currentRide() {
    return this._currentRide;
  } ,
  set currentRide(value) {
    this._currentRide = value;
  } ,
  save : function (callback) {
    if(!this.user) {
      throw new Meteor.Error("Driver must be attached to a user!");
    }

    if(!this.group) {
      throw new Meteor.Error("Driver must be attached to a group!");
    }

    var doc = {
      currentRide : this.currentRide
    };

    // If this group already exists, then modify it.
    if(this.id) {
      Drivers.update(this.id , { $set : doc } , callback);
      // Else, create a new group.
    } else {
      doc.user = this.user;
      doc.group = this.group;

      // remember the context, since in callback it's changed
      var that = this;

      Drivers.insert(doc , function (error , result) {
        that._id = result;

        if(callback != null) {
          callback.call(that , error , result);
        }
      });
    }
  } ,
  delete : function (callback) {
    // Only the user that this driver represents or admins can delete drivers.
    if(this.user != Meteor.userId() && !Meteor.user().isAdmin()) {
      throw new Meteor.Error("Access Denied!");
    }

    if(this.currentRide) {
      throw new Meteor.Error("Driver is currently giving a ride!");
    }

    Drivers.remove(this.id , callback);
  } ,
  stopDriving : function (callback) {
    if(this.currentRide) {
      throw new Meteor.Error("Cannot stop driving while ride is in progress!");
    }
    var that = this;
    Users.findOne(this.user).stopDriving(function (err , res) {
      if(!err) {
        that.delete(callback);
      } else {
        callback.call(that , err , res);
      }
    });
  }
};

if(Meteor.isServer) {

  Drivers.allow({
    'insert' : function (userId , doc) {
      return (userId === doc.user || Users.findOne(userId).isAdmin());
    } ,
    'update' : function (userId , doc) {
      return (userId === doc.user || Users.findOne(userId).isAdmin());
    } ,
    'remove' : function (userId , doc) {
      return (userId === doc.user || Users.findOne(userId).isAdmin());
    }
  });
}
