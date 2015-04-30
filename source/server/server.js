Meteor.startup(function () {
  Rides.find().observeChanges({
    added : function (id , fields) {
      var ride = Rides.findOne(id);
      if(!ride) {
        console.log("ERROR: Ride not found!");
        return;
      }
      var group = Groups.findOne(ride.group);
      if(!group) {
        console.log("ERROR: Group that ride belongs to not found!");
      }
      // If the queue is empty, and there are drivers
      if(group.queue.length == 0 && group.drivers.length > 0) {
        for(var index = 0 ; index < group.drivers.length ; ++index) {
          var driver = Drivers.findOne(Users.findOne(group.drivers[ index ]).getDriverId());
          if(!driver.currentRide) {
            ride.assignTo(driver);
            ride.save();
            return;
          }
        }
        group.addRideToQueue(ride , function (err , res) {
          if(err) {
            console.log(err.message);
          }
        });
      }
    }
  }),
  Drivers.find().observeChanges({
    added : function (id , fields) {
      var driver = Drivers.findOne(id);
      if(!driver) {
        console.log("ERROR: Driver not found!");
        return;
      }
      var group = Groups.findOne(driver.group);
      if(!group) {
        console.log("ERROR: Group that driver belongs to not found!");
      }
      // If the queue is empty, and there are drivers
      if(group.queue.length > 0) {
        ride = Rides.findOne(group.queue[0])
        ride.assignTo(driver);
        ride.save();
        return;
      }
    }
  })
});


Meteor.methods({
  /**
   * @summary Creates a new user account in the database.
   * @locus Server
   * @method createUserAccount
   * @memberOf Meteor.methods
   * @function
   * @param {Object} options
   * @param {String} options.username
   * @param {String} options.email
   * @param {String} options.password
   * @param {String} options.profile
   */
  "createUserAccount" : function (options) {

    var userOptions = {};
    if(options.username) userOptions.username = options.username;
    if(options.email) userOptions.email = options.email;
    if(options.password) userOptions.password = options.password;
    if(options.name) userOptions.name = options.name;
    if(options.profile) userOptions.profile = options.profile;
    if(options.profile && options.profile.email) userOptions.email = options.profile.email;

    Accounts.createUser(userOptions);
  } ,

  /**
   * @summary Updates the desired user account with the options provided.
   * @locus Server
   * @method updateUserAccount
   * @memberOf Meteor.methods
   * @function
   * @param {Object} options
   * @param {String} options.username
   * @param {String} options.email
   * @param {String} options.password
   * @param {String} options.profile
   * @param {String} options.roles
   */
  "updateUserAccount" : function (userId , options) {
    var userOptions = {};
    if(options.username) userOptions.username = options.username;
    if(options.email) userOptions.email = options.email;
    if(options.password) userOptions.password = options.password;
    if(options.profile) userOptions.profile = options.profile;

    if(options.profile && options.profile.email) userOptions.email = options.profile.email;
    if(options.roles) userOptions.roles = options.roles;

    if(userOptions.email) {
      var email = userOptions.email;
      delete userOptions.email;
      userOptions.emails = [ { address : email } ];
    }

    var password = "";
    if(userOptions.password) {
      password = userOptions.password;
      delete userOptions.password;
    }

    if(userOptions) {
      Users.update(userId , { $set : userOptions });
    }

    if(password) {
      Accounts.setPassword(userId , password);
    }
  } ,

  /**
   * @summary Sends an email using the provided options.
   * @locus Server
   * @method sendMail
   * @memberOf Meteor.methods
   * @function
   * @param {Object} options
   * @param {String} options.username
   * @param {String} options.email
   * @param {String} options.password
   * @param {String} options.profile
   * @param {String} options.roles
   */
  "sendMail" : function (options) {
    this.unblock();

    Email.send(options);
  }
});

Accounts.onCreateUser(function (options , user) {
  user.roles = [ "rider" ];

  if(options.profile) {
    user.profile = options.profile;
  }

  return user;
});

Accounts.validateLoginAttempt(function (info) {

  // reject users with role "blocked"
  if(info.user && Users.isInRole(info.user._id , "blocked")) {
    throw new Meteor.Error(403 , "Your account is blocked.");
  }

  return true;
});


Users.before.insert(function (userId , doc) {
  if(doc.emails && doc.emails[ 0 ] && doc.emails[ 0 ].address) {
    doc.profile = doc.profile || {};
    doc.profile.email = doc.emails[ 0 ].address;
  }
});

Users.before.update(function (userId , doc , fieldNames , modifier , options) {
  if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[ 0 ].address) {
    modifier.$set.profile.email = modifier.$set.emails[ 0 ].address;
  }
});

Accounts.onLogin(function (info) {
});

Accounts.urls.resetPassword = function (token) {
  return Meteor.absoluteUrl('reset_password/' + token);
};
