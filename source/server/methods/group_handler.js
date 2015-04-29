Meteor.methods({
  /**
   * @summary Adds the current user to the group using the group key.
   * @locus Server
   * @method joinGroup
   * @memberOf Meteor.methods
   * @param {String} groupName
   * @param {String} groupKey
   * @returns {group.id}
   * @function
   * */
  joinGroup : function (groupName, groupKey) {
    // Find the group to join.
    var group = Groups.findOne({ name : groupName, key : groupKey });
    if(!group) {
      throw new Meteor.Error('group cannot be found, key may be incorrect');
    }
    if (Groups.findOne({members: this.userId})) {
      throw new Meteor.Error('user is already in a group!');
    }
    group.addMember(this.userId, function(err, res) {
      if (err) {
        throw err;
      }
    });
    return group.id;
  } ,

  /**
   * @summary Changes the admin of the desired group.
   * @locus Server
   * @method changeAdmin
   * @memberOf Meteor.methods
   * @function
   * @param {String} newAdmin
   */
  changeAdmin: function(newAdmin) {
    Groups.findOne({members: this.userId}).changeAdmin(newAdmin);
  },

  /**
   * @summary Removes a member from the database.
   * @locus Server
   * @method removeMember
   * @memberOf Meteor.methods
   * @function
   * @param {String} memberToRemove
   * @param {Group} group
   */
  removeMember: function(memberToRemove, group) {
    Groups.findOne(group._id).removeMember(memberToRemove);
  }
});
