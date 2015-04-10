// Update Users MongoDB collection.
Meteor.users._transform = function(doc) {
  var newInstance = new User(
    doc._id,
    doc.profile.name,
    doc.profile.admin,
    doc.profile.group,
    doc.profile.isDriver,
    doc.profile.lat,
    doc.profile.lng
  );
  return _.extend(newInstance, doc);
};

// A Group class that takes a document in its constructor
User = function (id, name, admin, group, isDriver, lat, lng) {
  this._id = id;
  this._name = name;
  this._admin = admin;
  this._group = group;
  this._isDriver = isDriver;
  this._lat = lat;
  this._lng = lng;
};

User.prototype = {
  get id() {
    // readonly
    return this._id;
  },
  get name() {
    // readonly
    return this._name;
  },
  get admin() {
    // readonly
    return this._admin;
  },
  get group() {
    return this._group;
  },
  get isDriver() {
    return this._isDriver;
  },
  get lat() {
    return this._lat;
  },
  get lng() {
    return this._lng;
  },
  getGroup: function() {
    return Groups.findOne(this.group);
  }
};