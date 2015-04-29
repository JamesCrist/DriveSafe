/**
 * @summary Controller for the Reset Password view
 * @locus Client
 */
this.ResetPasswordController = RouteController.extend({
  template : "ResetPassword" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf ResetPasswordController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render the page.
   * @function
   * @memberOf ResetPasswordController
   */
  action : function () {
    this.render();
  }

});