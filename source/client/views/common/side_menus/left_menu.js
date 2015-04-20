Template.leftMenu.events({
  "click #logoutButton" : function () {
    Router.go("/logout");
  } ,
  "click #dashboardButton" : function () {
    if (Meteor.user().isDriver()) {
      Router.go("/driver_dashboard");
    } else {
      Router.go("/rider_dashboard");
    }
  } ,
  'click #joinGroupButton' : function (event , template) {
    IonPopup.show({
      title : 'Join Group' ,
      template : '<span id="inputDirections">' + 'Please enter group name and password' + '</span>' + '<input type="text" placeholder="group name" name="namePrompt" >' 
      + '<input type="text" placeholder="group password" name="keyPrompt" >'  ,
      buttons : [
        {
          text : 'Join' ,
          type : 'button-positive' ,
          onTap : function (e , template) {
            // template ='<span>' + 'Please enter a new group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >';
            var nameVal = $(template.firstNode).find('[name=namePrompt]').val();
            var keyVal  = $(template.firstNode).find('[name=keyPrompt]').val();

            Meteor.user().joinGroup(nameVal , keyVal , function (err) {
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

  } ,
  'click #createGroupButton' : function (event , template) {
    IonPopup.show({
      title : 'Create Group' ,
      template : '<span id="inputDirections">' + 'Please enter group name and password' + '</span>' + '<input type="text" placeholder="group name" name="namePrompt" >' 
      + '<input type="text" placeholder="group password" name="keyPrompt" >'  ,
      buttons : [
        {
          text : 'Create' ,
          type : 'button-positive' ,
          onTap : function (e , template) {
            // template ='<span>' + 'Please enter a new group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >';
            var nameVal = $(template.firstNode).find('[name=namePrompt]').val();
            var keyVal  = $(template.firstNode).find('[name=keyPrompt]').val();

            Meteor.user().createGroup(nameVal , keyVal , function (err) {
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
  } ,


  'click #leaveGroup' : function (event , template) {
    IonPopup.confirm({
      title : 'Are you sure?' ,
      template : 'You will no longer have access to drivers for this group' ,
      onOk : function () {
        Meteor.user().leaveGroup(function (err) {
          if(err) {
            console.log(err.message);
          } else {
            Router.go("/rider_dashboard");
          }
        });
      }
    });
  } ,
  'click #becomeDriverButton' : function (event , template) {
    Meteor.user().becomeDriver(function (err) {
      if(err) {
        console.log(err.message);
      }
    });
  }
});
