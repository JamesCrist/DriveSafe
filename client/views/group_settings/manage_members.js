var pageSession = new ReactiveDict();

Template.GroupSettingsManageMembers.events({
  'click .removeMember': function(event) {
    var userId = $(event.target).closest(".item").attr('id');
    var user = Users.findOne(userId);
    Meteor.call("removeMember", user, Groups.findOne(), function(err) {
      if (err) {
        console.log(err.message);
      } else {
        $(event.target).closest(".item").fadeOut("slow" , function () {
          this.remove();
        })
      }
    });
  },
  'click .makeAdmin': function(event) {
    var userId = $(event.target).closest(".item").attr('id');
    var newAdmin = Users.findOne(userId);
    IonPopup.confirm({
      title: 'Warning!',
      template: 'This feature does not yet work completely. Results are undefined. Continue?',
      onOk: function() {
        Meteor.call("changeAdmin", newAdmin, function(err) {
          if (err) {
            console.log(err.message);
          } else {
            Router.go("/dashboard");
          }
        });
      }
    });
  }
});

Template.GroupSettingsManageMembers.helpers({
  members: function() {
    if (Groups && Groups.findOne()) {
      // Get all members for this group, passing in false
      // to not include the admin him/herself.
      return Groups.findOne().getMembers(false);
    }
  }
});