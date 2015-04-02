Template.rightMenu.events({
  'click #accountSettings': function() {
    Router.go("/user_settings");
  },
  'click #groupSettings': function() {
    Router.go("/group_settings");
  }
});
