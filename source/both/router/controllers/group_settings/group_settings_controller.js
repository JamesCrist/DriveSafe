this.GroupSettingsController = RouteController.extend({
  template: "GroupSettings",

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

  isReady: function() {


    var subs = [
    ];
    var ready = true;
    _.each(subs, function(sub) {
      if(!sub.ready())
        ready = false;
    });
    return ready;
  },
  waitOn: function() {
    return Meteor.subscribe("groups", {admin: Meteor.userId()});
  },
  data: function() {
    return Groups.findOne();
  },

  onAfterAction: function() {
  }
});