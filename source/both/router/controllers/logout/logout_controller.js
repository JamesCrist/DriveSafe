/**
 * @summary Controller for the logout view.
 * @locus Client
 */
this.LogoutController = RouteController.extend({
  template : "Logout" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Checks that the user does want to logout, also checks if they are a driver.
   * @function
   * @memberOf LogoutController
   */
  onBeforeAction : function () {
    IonPopup.confirm({
      title : 'Are you sure?' ,
      template : 'Do you <strong>really</strong> want to logout?' ,
      onOk : function () {
        // If user is a driver, then make him/her stop driving driving before logging out,
        // else he/she may still get requests.
        if(Meteor.user().profile.isDriver) {
          Meteor.call("stopDriving" , function (err) {
            if(!err) {
              Meteor.logout();
            }
          });
        } else {
          Meteor.logout();
        }
      } ,
      onCancel : function () {
        Router.go("/dashboard");
      }
    });
  } ,

  /**
   * @summary The user logs out.
   * @function
   * @memberOf LogoutController
   */
  action : function () {
    App.logout();
  }

});