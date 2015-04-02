var pageSession = new ReactiveDict();

pageSession.set("members", null);

Template.GroupSettingsManageMembers.rendered = function() {
  setMembers();
};

Template.GroupSettingsManageMembers.events({
  'click .removeMember': function(event) {
    var userEmail = $(event.target).closest(".item").attr('id');
    Meteor.call("removeFromGroup", userEmail, function(err) {
      if (err) {
        console.log(err.message);
      } else {
        $(event.target).closest(".item").fadeOut("slow" , function () {
          this.remove();
          setMembers();
        })
      }
    });
  },
  'click .makeAdmin': function(event) {
    var userEmail = $(event.target).closest(".item").attr('id');
    Meteor.call("changeAdmin", userEmail, function(err) {
      if (err) {
        console.log(err.message);
      } else {
        Router.go("/dashboard");
      }
    });
  }
});

Template.GroupSettingsManageMembers.helpers({
  members: function() {
    return pageSession.get("members");
  }
});

var setMembers = function() {
  Meteor.call("getMembersForGroup", function(err, members) {
    if (err) {
      console.log(err.message);
    } else {
      pageSession.set("members" , members);
    }
  });
};