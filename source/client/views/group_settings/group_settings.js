Template.GroupSettings.helpers({
  /**
   * @summary Gets the current group.
   * @locus Client
   * @method groupModel
   * @memberOf GroupSettings.helpers
   * @function
   * @return {Group}
   * */
  groupModel: function () {
    return new Group(this._id, this.name, this.admin, this.members, this.drivers, this.queue, this.key);
  },
  /**
   * @summary Gets the members in the current group.
   * @locus Client
   * @method groupMembers
   * @memberOf GroupSettings.helpers
   * @function
   * @return {Members}
   * */
  groupMembers: function () {
    return this.membersModel();
  }
});

Template.GroupSettings.events({
  /**
   * @summary Allows the user to change the group key for the group they are in.
   * @locus Client
   * @method click .changeKey
   * @memberOf GroupSettings.events
   * @function
   * @param {Event} event
   * */
  'click .changeKey': function (event) {
    var group = this;
    console.log(group);
    IonPopup.show({
      title: 'Change Password',
      template: '<span id="inputDirections">' + 'Please enter new password' + '</span>' + '<input type="text" placeholder="new password" name="newKey" >',
      buttons: [
        {
          text: 'Submit',
          type: 'button-positive',
          onTap: function (e, template) {
            // template ='<span>' + 'Please enter a new group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >';
            var newKeyVal = $(template.firstNode).find('[name=newKey]').val();
            group.changeKey(newKeyVal, function (err) {
              if (err) {
                // $(template.firstNode).find("#inputDirections").append(error.message);
                $(template.firstNode).find("#inputDirections").html(err.message);
                console.log(err.message);
                e.preventDefault();
              } else {
                // Reload the dashboard to fix bug
                // of map position icon not showing up.
                IonPopup.close();
              }
            });
          }
        },
        {
          text: 'Cancel',
          type: 'button-positive',
          onTap: function (e) {
            IonPopup.close();
          }
        }
      ]
    });
  },

  /**
   * @summary Removes a member from the group.
   * @locus Client
   * @method click .removeMember
   * @memberOf GroupSettings.events
   * @function
   * @param {Event} event
   * */
  'click .removeMember': function (event) {
    this.leaveGroup(function (err, res) {
      if (err) {
        console.log(err.message);
      }
    });
  },
  /**
   * @summary Makes the selected user the admin of the group.
   * @locus Client
   * @method click .makeAdmin
   * @memberOf GroupSettings.events
   * @function
   * @param {Event} event
   * */
  'click .makeAdmin': function (event) {
    var userId = $(event.target).closest(".item").attr('id');
    this.becomeAdmin(function (err, res) {
      if (err) {
        console.log(err.message);
      }
    });
  },
  /**
   * @summary Deletes the group.
   * @locus Client
   * @method click #deleteGroupButton
   * @memberOf GroupSettings.events
   * @function
   * */
  'click #deleteGroupButton': function () {
    var that = this;
    console.log(that);
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'This is permanent! All members will be removed from this group and the group permanently deleted.',
      onOk: function () {
        that.forceDelete(function (err, res) {
          if (err) {
            console.log(err.message);
          }
        });
      }
    });
  }
});