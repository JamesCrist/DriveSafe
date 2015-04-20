this.LogoutController = RouteController.extend({
	template: "Logout",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'Do you <strong>really</strong> want to logout?',
      onOk: function() {
				// If user is a driver, then make him/her stop driving driving before logging out,
				// else he/she may still get requests.
				if (Meteor.user().profile.isDriver) {
					Meteor.call("stopDriving", function(err) {
						if (!err) {
							Meteor.logout();
						}
					});
				} else {
					Meteor.logout();
				}
      },
      onCancel: function() {
        Router.go("/dashboard");
      }
    });
	},

	action: function() {
		App.logout();
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

	data: function() {
		

		return {
			params: this.params || {}
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});