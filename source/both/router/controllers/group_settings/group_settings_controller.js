/**
 * @summary The controller for the Group Settings page.
 * @locus Client
 */
this.GroupSettingsController = RouteController.extend({
  template : "GroupSettings" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf GroupSettingsController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render page.
   * @function
   * @memberOf GroupSettingsController
   */
  action : function () {
    this.render();
  } ,


  /**
   * @summary Waits for group information.
   * @function
   * @memberOf GroupSettingsController
   * @returns {any}
   */
  waitOn : function () {
    return Meteor.subscribe("groups" , { admin : Meteor.userId() });
  } ,

  /**
   * @summary Returns group information.
   * @function
   * @memberOf GroupSettingsController
   * @returns {*}
   */
  data : function () {
    return Groups.findOne();
  }

});