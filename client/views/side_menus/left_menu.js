Session.set("groupKey", "Loading...");

Template.leftMenu.rendered = function() {
  if (Meteor.user().profile.admin) {
    Meteor.call("getGroupKey", function(error, key) {
      if(error) {
        console.log(error.message);
      } else {
        Session.set("groupKey" , key);
      }
    });
  }
};

Template.leftMenu.events({
  "click #logoutButton" : function () {
    Router.go("/logout");
  } ,
  "click #dashboardButton": function() {
    Router.go("/dashboard");
  },
  'click #joinGroupButton' : function (event, template) {
    IonPopup.prompt({
      title : 'Join Group' ,
      template : 'Please enter secret group key. Group admins can give these to you.' ,
      okText : 'Join' ,
      inputType : 'text' ,
      inputPlaceholder : 'group key' ,
      onOk : function (event , response) {
        Meteor.call("joinGroup", response, function (error) {
          console.log(error);
        });
      }
    });
  } ,
  'click #createGroupButton' : function (event , template) {
    IonPopup.prompt({
      title : 'Create Group' ,
      template : 'Please enter group name' ,
      okText : 'Create' ,
      inputType : 'text' ,
      inputPlaceholder : 'group name' ,
      onOk : function (event , response) {

        Meteor.call("createNewGroup" , response , function (error) {
          console.log(error);
        });
      }
    });
  },
  'click #leaveGroup' : function(event, template) {
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'You will no longer have access to drivers for this group',
      onOk: function() {
        Meteor.call("leaveGroup");
      }
    });
  }
});

Template.leftMenu.helpers({
  groupKey: function() {
    return Session.get("groupKey");
  }
});