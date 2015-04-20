

/**
 * @summary This is a description of the joinGroup function.
 * @locus Server
 * @method joinGroup
 * @memberOf Meteor.methods
 * @instance
 * @param {String} groupName
 * @param {String} groupKey
 * @returns {group.id}
 */

/**
 * @summary This is a description of the changeAdmin function.
 * @locus Server
 * @method changeAdmin
 * @memberOf Meteor.methods
 * @instance
 * @param {String} newAdmin
 * @returns {none}
 */

/**
 * @summary This is a description of the removeMember function.
 * @locus Server
 * @method removeMember
 * @memberOf Meteor.methods
 * @instance
 * @param {String} memberToRemove
 * @param {Object} group
 * @returns {group.id}
 */
Meteor.methods({
  // Join a group, given the group key.
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
  changeAdmin: function(newAdmin) {
    Groups.findOne({members: this.userId}).changeAdmin(newAdmin);
  },
  removeMember: function(memberToRemove, group) {
    Groups.findOne(group._id).removeMember(memberToRemove);
  }
});
