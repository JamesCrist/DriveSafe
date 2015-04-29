/**
 * @summary Controller for the Login screen.
 * @locus Client
 */
this.LoginController = RouteController.extend({
  template : "Login" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf LoginController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render page when ready.
   * @function
   * @memberOf LoginController
   */
  action : function () {
    this.render();
  }

});