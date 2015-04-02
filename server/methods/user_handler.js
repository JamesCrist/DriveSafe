Meteor.methods({
  createNewUser: function (email, name) {
    // Create a temporary password for the user.
    var password = (Math.floor(Math.random() * 999999) + 100000).toString();
    // Create the user account with this temporary password.
    Meteor.call("createUserAccount", {
      email: email,
      password : password,
      profile: {
        name: name,
        lat: 0,
        lng: 0,
        group: null,
        admin: false
      }
    });
    // Send the user an email with the password.
    Meteor.call("sendMail", {
      from: "DriveSafe Team <lsilvawd09@gmail.com>",
      to: email,
      subject: "Your DriveSafe Temporary Password",
      text: "Your temporary password is: " + password
    });
    return password; // FOR DEVELOPMENT PURPOSES ONLY! REMOVE BEFORE PRODUCTION
  },
  updateUserLocation: function(lat, lng) {
    Users.update(this.userId, { $set: {'profile.lat': lat, 'profile.lng': lng}});
  },
  updateUserGroup: function(user, groupName) {
    Users.update(user._id, { $set: {'profile.group': groupName}});
  }
});
