/**
 * @summary The controller for the Forgot Password interface.
 * @locus Client
 */this.ForgotPasswordController = RouteController.extend({
  template : "ForgotPassword" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf ForgotPasswordController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render page.
   * @function
   * @memberOf ForgotPasswordController
   */
  action : function () {
    this.render();
  }

});