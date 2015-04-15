this.DriverDashboardController = RouteController.extend({
  template: "driverDashboard",

  yieldTemplates: {
    /*YIELD_TEMPLATES*/
  },

  onBeforeAction: function() {
    /*BEFORE_FUNCTION*/
    this.next();
  },

  action: function() {
    if(this.isReady()) { this.render(); } else { this.render("loading"); }
    /*ACTION_FUNCTION*/
  },
  // Make sure that the geolocation API is loaded before rendering the dashboard.
  isReady: function() {
    return Geolocation.latLng() != null;
  },
  waitOn: function() {
    return [Meteor.subscribe("groups", {members: Meteor.userId()}), Meteor.subscribe("drivers")];
  },
  data: function() {
    return {group: Groups.findOne(), driver: Drivers.findOne({user: Meteor.userId()})};
  },

  onAfterAction: function() {
  }
});