Template.leftMenu.events({
  "click #logoutButton" : function () {
    Router.go("/logout");
  } ,
  "click #dashboardButton": function() {
    Router.go("/dashboard");
  },
  'click #joinGroupButton' : function (event, template) {
    var that = this;
    console.log(that);
    IonPopup.prompt({
      title : 'Join Group' ,
      template : 'Please enter secret group key. Group admins can give these to you.' ,
      okText : 'Join' ,
      inputType : 'text' ,
      inputPlaceholder : 'group key' ,
      onOk : function (event , response) {
        that.user.joinGroup(response, function(error) {
          if (error) {
            console.log(error);
          } else {
            // Reload the dashboard to fix bug
            // of map position icon not showing up.
            Meteor._reload.reload();
          }
        });
      }
    });
  } ,
    'click #createGroupButton' : function (event , template) {
        IonPopup.show({
            title : 'Create Group' ,
            template :'<span id="inputDirections">' + 'Please enter group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >',
            buttons: [
            {
                text: 'Create',
                type: 'button-positive',
                onTap: function(e,template){
                    // template ='<span>' + 'Please enter a new group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >';
                    var inputVal = $(template.firstNode).find('[name=prompt]').val();
                    Meteor.user().createGroup(inputVal, function(err) {
                        if (err) {
                            // $(template.firstNode).find("#inputDirections").append(error.message);
                            $(template.firstNode).find("#inputDirections").html(err.message);
                            console.log(err.message);
                            e.preventDefault();
                        } else {
                            // Reload the dashboard to fix bug
                            // of map position icon not showing up.
                            IonPopup.close();
                            Meteor._reload.reload();
                        }
                    });
                }
            },
            {
                text: 'Cancel',
                type: 'button-positive',
                onTap: function(e){
                    IonPopup.close();
                }
            }]
        });
    },


  'click #leaveGroup' : function(event, template) {
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'You will no longer have access to drivers for this group',
      onOk: function() {
        Meteor.user().leaveGroup(function(err) {
          if (err) {
            console.log(err.message);
          } else {
            Router.go("/dashboard");
          }
        });
      }
    });
  },
  'click #becomeDriverButton': function(event, template) {
    Meteor.user().becomeDriver(function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  }
});
