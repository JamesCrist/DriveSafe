Meteor.methods({
  /**
   * @summary Creates a new user in the database.
   * @locus Server
   * @method createNewUser
   * @memberOf Meteor.methods
   * @createNewUser
   * @param {String} email A string of user's email
   * @param {String} name The name of the user
   * @returns {String} password The user's temporary password
   */
  createNewUser: function (email, name) {
    // Create a temporary password for the user.
    var password = (Math.floor(Math.random() * 999999) + 100000).toString();
    // Create the user account with this temporary password.
    Meteor.call("createUserAccount", {
      email: email,
      password : password,
      profile: {
        name: name,
        location: {lat: 0, lng: 0},
        group: null,
        isAdmin: false,
        isDriver: false,
        driverId: null
      }
    });
    // Send the user an email with the password.
    Meteor.call("sendMail", {
      from: "DriveSafe Team <lsilvawd09@gmail.com>",
      to: email,
      subject: "Your DriveSafe Temporary Password",
      text: "Your temporary password is: " + password
    });
  }
});
