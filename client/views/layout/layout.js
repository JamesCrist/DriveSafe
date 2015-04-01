Template.layout.rendered = function() {
  Session.set('currentTab' , 'dashboard');
};

Template.layout.events({
  "click #logoutButton": function() {
    Router.go("/logout");
  },
  'click #createGroupButton': function(event, template) {
    var prompt = IonPopup.prompt({
      title: 'Create Group',
      template: 'Please enter group name',
      okText: 'Create',
      inputType: 'text',
      inputPlaceholder: 'group name',
      onOk: function(event, response){
        alert(response);
        // Groups.insert({
        //     name  : response,
        //     admin : Meteor.userId()
        //   }, function(error,id){
        //     console.log("Group "+error);
        //   })

        Meteor.call("createNewGroup",response,function(error){
          console.log(error.message);
        });
      }
    });
  }
});