Template.leftMenu.events({
  /**
   * @summary Sends logout request upon clicking logout button
   * @locus Client
   * @method click #logoutButton
   * @memberOf Template.leftMenu.events
   * @function
   */
   "click #logoutButton" : function () {
    Router.go("/logout");
  } ,
  /**
   * @summary Opens dashboard menu based on current user role
   * @locus Client
   * @method click #dashboardButton
   * @memberOf Template.leftMenu.events
   * @function
   */
  "click #dashboardButton" : function () {
    if (Meteor.user().isDriver()) {
      Router.go("/driver_dashboard");
    } else {
      Router.go("/rider_dashboard");
    }
  } ,
  /**
   * @summary Opens join group dialog window and makes sure that the group code is valid.
   * @locus Client
   * @method click #joinGroupButton
   * @memberOf Template.leftMenu.events
   * @function
   * @param {Event} event
   * @param {Meteor.Template} template
   */
  'click #joinGroupButton' : function (event , template) {
    IonPopup.show({
      title : 'Join Group' ,
      template : '<span id="inputDirections">' + 'Please enter group name and password' + '</span>' + '<input type="text" placeholder="group name" name="namePrompt" >' +
      '<input type="text" placeholder="group password" name="keyPrompt" >' ,
      buttons : [
        {
          text : 'Join' ,
          type : 'button-positive' ,
          onTap : function (e , template) {
            var nameVal = $(template.firstNode).find('[name=namePrompt]').val();
            var keyVal  = $(template.firstNode).find('[name=keyPrompt]').val();

            // Try joining the group.
            Meteor.user().joinGroup(nameVal , keyVal , function (err) {
              // If there was an error:
              if(err) {
                // Output error and ask user to try again.
                $(template.firstNode).find("#inputDirections").html(err.message);
                console.log(err.message);
                e.preventDefault();
              } else {
                // User joined successfully.
                // Reload the dashboard to fix bug of map position icon not showing up.
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
  /**
   * @summary Opens create group dialog window and makes sure that the group name is not already in use.
   * @locus Client
   * @method click #createGroupButton
   * @memberOf Template.leftMenu.events
   * @function
   * @param {Event} event
   * @param {Meteor.Template} template
   */
  'click #createGroupButton' : function (event , template) {
    IonPopup.show({
      title : 'Create Group' ,
      template : '<span id="inputDirections">' + 'Please enter group name and password' + '</span>' + '<input type="text" placeholder="group name" name="namePrompt" >' +
      '<input type="text" placeholder="group password" name="keyPrompt" >'  ,
      buttons : [
        {
          text : 'Create' ,
          type : 'button-positive' ,
          onTap : function (e , template) {
            var nameVal = $(template.firstNode).find('[name=namePrompt]').val();
            var keyVal  = $(template.firstNode).find('[name=keyPrompt]').val();

            Meteor.user().createGroup(nameVal , keyVal , function (err) {
              if(err) {
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
  /**
   * @summary Leaves the group that the user is currently a member of.
   * @locus Client
   * @method click #leaveGroup
   * @memberOf Template.leftMenu.events
   * @function
   * @param {Event} event
   * @param {Meteor.Template} template
   */
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
  /**
   * @summary Changes the user designation to become a driver.
   * @locus Client
   * @method click #becomeDriverButton
   * @memberOf Template.leftMenu.events
   * @function
   * @param {Event} event
   * @param {Meteor.Template} template
   */
  'click #becomeDriverButton' : function (event , template) {
    Meteor.user().becomeDriver(function (err) {
      if(err) {
        console.log(err.message);
      }
    });
  }
});
