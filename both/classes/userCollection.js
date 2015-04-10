// Update Users MongoDB collection.
/*
Meteor.users._transform = function(doc) {
  var newInstance = new User(null, null);

  return _.extend(newInstance, doc);
};

//TODO: finish implementation

// A User class that takes a document in its constructor
User = function (name, email) {
  if (!this._id) {
    this._id = null;
    this.email = email;
    // New user's get a random password.
    this.password = (Math.floor(Math.random() * 999999) + 100000).toString();
    this.profile = {
      name: name,
      lat: 0,
      lng: 0,
      group: null,
      isAdmin: false,
      isDriver: false
    }
  }
};

User.prototype = {
  get id() {
    // readonly
    return this._id;
  },
  get name() {
    // readonly
    return this.profile.name;
  },
  get isAdmin() {
    // readonly
    return this.profile.isAdmin;
  },
  get group() {
    return this.profile.group;
  },
  get isDriver() {
    return this.profile.isDriver;
  },
  get lat() {
    return this.profile.lat;
  },
  get lng() {
    return this.profile.lng;
  },
  getGroup: function() {
    return Groups.findOne(this.group);
  },
  save: function(callback) {
    if (!this.name) {
      throw new Meteor.Error("Name is not defined!");
    }

    var doc = {
      profile: this.profile,
    };

    // If this group already exists, then modify it.
    if (this.id) {
      Users.update(this.id, {$set: {profile: doc}, callback);
      // Else, create a new group.
    } else {
      doc.name = this.name;
      if (Groups.findOne({name: this.name})) {
        throw new Meteor.Error("Group with name " + name + " already exists!");
      }

      // remember the context, since in callback it's changed
      var that = this;
      Groups.insert(doc, function(error, result) {
        that._id = result;

        if (callback != null) {
          callback.call(that, error, result);
        }
      });
    }
  }
};
  */