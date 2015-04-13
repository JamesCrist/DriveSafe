var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("successMessage", "");

Template.Register.rendered = function() {
	
	$("input[autofocus]").focus();
};

Template.Register.created = function() {
	pageSession.set("errorMessage", "");
  pageSession.set("successMessage", "");
};

Template.Register.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var register_name = t.find('#register_name').value.trim();
		var register_email = t.find('#register_email').value.trim();

		// check name
		if(register_name === "")
		{
			pageSession.set("errorMessage", "Please enter your name.");
			t.find('#register_name').focus();
			return false;			
		}

		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;			
		}

		submit_button.button("loading");
		Meteor.call("createNewUser", register_email, register_name, function(err, password) {
			submit_button.button("reset");
			if(err) {
        pageSession.set("errorMessage" , err.message);
      } else {
        pageSession.set("errorMessage" , "");
        pageSession.set("successMessage" , "Success! Please check your email for your password");
        // FOR DEVELOPMENT PURPOSES ONLY! REMOVE BEFORE PRODUCTION
        alert("Your password is: " + password + "\n**FOR DEVELOPMENT PURPOSES ONLY! REMOVE BEFORE PRODUCTION");
      }
		});
		return false;
	}
	
});

Template.Register.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
  successMessage: function() {
    return pageSession.get("successMessage");
  }
	
});
