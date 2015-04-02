Template.GroupSettingsDeleteGroup.events({
  "click #deleteGroupButton": function() {
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'This is permanent! All members will be removed from this group and the group permanently deleted.',
      onOk: function() {
        Meteor.call("deleteGroup", function(err) {
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