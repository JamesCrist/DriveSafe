/**
 * @summary Controller for register view.
 * @locus Client
 */
this.RegisterController = RouteController.extend({
  template : "Register" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf RegisterController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render the page.
   * @function
   * @memberOf RegisterController
   */
  action : function () {
    this.render();
  }

});