// Create Ride MongoDB collection
Ride = new Meteor.Collection("ride", {
  transform: function(doc) {
    return new Ride(doc._id, doc.name, doc.pickupLoc, doc.destLoc);
  }
});

// A Group class that takes a document in its constructor
Ride = function (id, name, pickupLoc, destLoc) {
  this._id = id;
  this._name = name;
  this._pickupLoc = pickupLoc;
  this._destLoc = destLoc;
};

Ride.prototype = {
  get id() {
    // readonly
    return this._id;
  },
  get name() {
    // readonly
    return this._name;
  },
  get pickupLoc() {
    // readonly
    return this._pickupLoc;
  },
  get destLoc() {
    return this._destLoc;
  },
  set pickupLoc(value) {
    this._pickupLoc = value;
  },
  set destLoc(value) {
    this._destLoc = value;
  },
  save: function(callback) {
    if (!this.name) {
      throw new Meteor.Error("Name is not defined!");
    }

    if (!this.pickupLoc) {
      throw new Meteor.Error("Pickup location is not defined!");
    }

    if (!this.destLoc) {
      throw new Meteor.Error("Destination location is not defined!");
    }

    var doc = {
      pickupLoc: this.pickupLoc,
      destLoc: this.destLoc
    };

    // If this ride already exists, then modify it.
    if (this.id) {
      Ride.update(this.id, {$set: doc}, callback);
      // Else, create a new ride.
    } else {
      doc.name = this.name;

      // remember the context, since in callback it's changed
      var that = this;
    }
  },
  delete: function(callback) {
    Ride.remove(this.id, callback);
  }
};

