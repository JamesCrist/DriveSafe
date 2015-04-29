/**
 * @summary Controller for the User Settings view.
 * @locus Client
 */
this.UserSettingsController = RouteController.extend({
  template : "UserSettings" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf UserSettingsController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render the page.
   * @function
   * @memberOf UserSettingsController
   */
  action : function () {
    this.render();
  }

});