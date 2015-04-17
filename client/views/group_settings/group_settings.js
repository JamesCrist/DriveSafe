Template.GroupSettings.helpers({
  groupModel: function() {
    return new Group(this._id, this.name, this.admin, this.members, this.drivers, this.queue, this.key);
  },
  groupMembers: function() {
    return this.membersModel();
  }
});

Template.GroupSettings.events({
  'click .changeKey' : function(event) {
    var group = this;
    console.log(group);
    IonPopup.show({
      title : 'Change Password' ,
      template : '<span id="inputDirections">' + 'Please enter new password' + '</span>' + '<input type="text" placeholder="new password" name="newKey" >',
      buttons : [
        {
          text : 'Submit' ,
          type : 'button-positive' ,
          onTap : function (e , template) {
            // template ='<span>' + 'Please enter a new group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >';
            var newKeyVal = $(template.firstNode).find('[name=newKey]').val();
            group.changeKey(newKeyVal, function (err) {
              if(err) {
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
        } ,
        {
          text : 'Cancel' ,
          type : 'button-positive' ,
          onTap : function (e) {
            IonPopup.close();
          }
        } ]
    });

  },
  'click .removeMember': function(event) {
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
        that.forceDelete(function(err, res) {
          if (err) {
            console.log(err.message);
          }
        });
      }
    });
  }
});