/**
 * @summary The controller for the Driver Dashboard.
 * @locus Client
 */
this.DriverDashboardController = RouteController.extend({
  template : "driverDashboard" ,

  yieldTemplates : {
    /*YIELD_TEMPLATES*/
  } ,

  /**
   * @summary Go on to action.
   * @function
   * @memberOf DriverDashboardController
   */
  onBeforeAction : function () {
    this.next();
  } ,

  /**
   * @summary Renders page when ready.
   * @function
   * @memberOf DriverDashboardController
   */
  action : function () {
    if(this.isReady()) {
      this.render();
    } else {
      this.render("loading");
    }
  } ,

  /**
   * @summary Checks that geolocation is not empty before rendering.
   * @function
   * @memberOf DriverDashboardController
   * @returns {boolean}
   */
  isReady : function () {
    return Geolocation.latLng() != null;
  } ,

  /**
   * @summary Waits for ride and driver information from the group.
   * @function
   * @memberOf DriverDashboardController
   * @returns {*[]}
   */
  waitOn : function () {
    return [ Meteor.subscribe("rides") , Meteor.subscribe("drivers") ];
  } ,

  /**
   * @summary Passes ride and driver information from the group.
   * @function
   * @memberOf DriverDashboardController
   * @returns {{rides: *, driver: *}}
   */
  data : function () {
    return { rides : Rides.find() , driver : Drivers.findOne({ user : Meteor.userId() }) };
  }

});