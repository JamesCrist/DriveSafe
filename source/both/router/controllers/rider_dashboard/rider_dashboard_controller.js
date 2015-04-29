/**
 * @summary Controller for Rider Dashboard view.
 * @locus Client
 */
this.RiderDashboardController = RouteController.extend({
  template : "riderDashboard" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf RiderDashboardController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Render the page when ready.
   * @function
   * @memberOf RiderDashboardController
   */
  action : function () {
    if(this.isReady()) {
      this.render();
    } else {
      this.render("loading");
    }
  } ,

  /**
   * @summary Check if the geolocation is null.
   * @function
   * @memberOf RiderDashboardController
   * @returns {boolean}
   */
  isReady : function () {
    return Geolocation.latLng() != null;
  } ,

  /**
   * @summary Wait for group and user data to arrive.
   * @function
   * @memberOf RiderDashboardController
   * @returns {any}
   */
  waitOn : function () {
    return Meteor.subscribe("groups" , { members : Meteor.userId() });
  } ,

  /**
   * @summary Return group and user data.
   * @function
   * @memberOf RiderDashboardController
   * @returns {{group: *, user: any}}
   */
  data : function () {
    return { group : Groups.findOne() , user : Meteor.user() };
  }

});