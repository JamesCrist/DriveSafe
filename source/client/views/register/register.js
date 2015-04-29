var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("successMessage", "");

/**
 * @summary Renders the register screen.
 * @locus Client
 * @method rendered
 * @memberOf Register
 * @function
 * */
Template.Register.rendered = function () {
  $("input[autofocus]").focus();
};

/**
 * @summary Sets an empty error and success message once a user is created.
 * @locus Client
 * @method created
 * @memberOf Register
 * @function
 * */
Template.Register.created = function () {
  pageSession.set("errorMessage", "");
  pageSession.set("successMessage", "");
};

Template.Register.events({
  /**
   * @summary Checks to make sure that the login credentials are valid and then creates user.
   * @locus Client
   * @method submit #register_form
   * @memberOf Register.events
   * @function
   * @param {Event} e
   * @param {Meteor.template} t
   * */
  'submit #register_form': function (e, t) {
    e.preventDefault();

    var submit_button = $(t.find(":submit"));

    var register_name = t.find('#register_name').value.trim();
    var register_email = t.find('#register_email').value.trim();

    // check name
    if (register_name === "") {
      pageSession.set("errorMessage", "Please enter your name.");
      t.find('#register_name').focus();
      return false;
    }

    // check email
    if (!isValidEmail(register_email)) {
      pageSession.set("errorMessage", "Please enter valid e-mail address.");
      t.find('#register_email').focus();
      return false;
    }

    submit_button.button("loading");
    Meteor.call("createNewUser", register_email, register_name, function (err, password) {
      submit_button.button("reset");
      if (err) {
        pageSession.set("errorMessage", err.message);
      } else {
        pageSession.set("errorMessage", "");
        pageSession.set("successMessage", "Success! Please check your email for your password");
        // FOR DEVELOPMENT PURPOSES ONLY! REMOVE BEFORE PRODUCTION
        alert("Your password is: " + password + "\n**FOR DEVELOPMENT PURPOSES ONLY! REMOVE BEFORE PRODUCTION");
      }
    });
    return false;
  }

});

Template.Register.helpers({
  /**
   * @summary Fetches the current success message.
   * @locus Client
   * @method errorMessage
   * @memberOf Register.helpers
   * @function
   * @return {String} errorMessage
   * */
  errorMessage: function () {
    return pageSession.get("errorMessage");
  },
  /**
   * @summary Fetches the current success message.
   * @locus Client
   * @method errorMessage
   * @memberOf Register.helpers
   * @function
   * @return {String} successMessage
   * */
  successMessage: function () {
    return pageSession.get("successMessage");
  }

});
