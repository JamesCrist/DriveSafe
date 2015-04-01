Template.layout.rendered = function() {
  Session.set('currentTab' , 'dashboard');
};

Template.layout.events({
  "click #logoutButton": function() {
    Router.go("/logout");
  },
  'click #createGroupButton': function(event, template) {
    IonPopup.prompt({
      title: 'Create Group',
      template: 'Please enter group name',
      okText: 'Create',
      inputType: 'text',
      inputPlaceholder: 'group name'
    });
  }
});