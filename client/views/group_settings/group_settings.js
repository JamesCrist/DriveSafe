Template.GroupSettings.helpers({
  groupModel: function() {
    return new Group(this._id, this.name, this.admin, this.members, this.drivers);
  },
  groupMembers: function() {
    return this.membersModel();
  }
});

Template.GroupSettings.events({
  'click .removeMember': function(event) {
    console.log(this);
    this.leaveGroup(function(err, res) {
      if (err) {
        console.log(err.message);
      }
    });
  },
  'click .makeAdmin': function(event) {
    var userId = $(event.target).closest(".item").attr('id');
    this.becomeAdmin(function(err, res) {
      if (err) {
        console.log(err.message);
      }
    });
  },
  'click #deleteGroupButton': function() {
    var that = this;
    console.log(that);
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'This is permanent! All members will be removed from this group and the group permanently deleted.',
      onOk: function() {
        that.forceDelete(function(err) {
          if (err) {
            console.log(err.message);
          }
        });
      }
    });
  }
});