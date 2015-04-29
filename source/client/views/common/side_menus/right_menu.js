
Template.rightMenu.events({
  /**
   * @summary Opens the user settings dashboard window.
   * @locus Client
   * @method click #accountSettings
   * @memberOf rightMenu.events
   * @function
   */
  'click #accountSettings': function() {
    Router.go("/user_settings");
  },
  /**
   * @summary Opens the group settings dashboard window.
   * @locus Client
   * @method click #groupSettings
   * @memberOf rightMenu.events
   * @function
   */
  'click #groupSettings': function() {
    Router.go("/group_settings");
  }
});
