/***  this is a template
 * @summary Find the documents in a collection that match the selector.
 * @locus Anywhere
 * @method find
 * @memberOf Mongo.Collection
 * @instance
 * @param {MongoSelector} [selector] A query describing the documents to find
 * @param {Object} [options]
 * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
 * @param {Number} options.skip Number of results to skip at the beginning
 * @param {Number} options.limit Maximum number of results to return
 * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
 * @param {Boolean} options.reactive (Client only) Default `true`; pass `false` to disable reactivity
 * @param {Function} options.transform Overrides `transform` on the  [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
 * @returns {Mongo.Cursor}
 */
// find: function ( selector, options ) {
//   /** ... **/
// }



/**
 * @summary This is a description of the createNewUser function.
 * @locus Server
 * @method createNewUser
 * @memberOf Meteor.methods
 * @createNewUser
 * @param {String} email A string of user's email
 * @param {String} name The name of the user
 * @returns {password}
 */

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
    return password; // FOR DEVELOPMENT PURPOSES ONLY! REMOVE BEFORE PRODUCTION
  }
});
