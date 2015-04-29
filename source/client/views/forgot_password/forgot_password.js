var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("resetPasswordSent", "");

/**
 * @summary Displays the forgot password dialog on the screen.
 * @locus Client
 * @method rendered
 * @memberOf ForgotPassword
 * @function
 * */
Template.ForgotPassword.rendered = function () {
  $("input[autofocus]").focus();
};

Template.ForgotPassword.events({
  /**
   * @summary Sends the reset password link to the user.
   * @locus Client
   * @method submit #forgot_password_form
   * @memberOf ForgotPassword.events
   * @function
   * @param {Event} e
   * @param {Meteor.template} t
   * */
  'submit #forgot_password_form': function (e, t) {
    // Prevent page from loading
    e.preventDefault();

    var submit_button = $(t.find(":submit"));
    var reset_email = t.find('#reset_email').value.trim();

    // Check to see if the email is valid
    if (!isValidEmail(reset_email)) {
      pageSession.set("errorMessage", "Please enter your e-mail address.");
      t.find('#reset_email').focus();
      return false;
    }

    submit_button.button("loading");
    Accounts.forgotPassword({email: reset_email}, function (err) {
      submit_button.button("reset");
      if (err)
        pageSession.set("errorMessage", err.message);
      else {
        pageSession.set("errorMessage", "");
        pageSession.set("resetPasswordSent", true);
      }
    });

    return false;
  },

  /**
   * @summary Displays OK box after password email is sent..
   * @locus Client
   * @method click #reset_password_sent
   * @memberOf ForgotPassword.events
   * @function
   * @param {Event} e
   * @param {Meteor.template} t
   * */
  'click #reset_password_sent': function (e, t) {
    pageSession.set("resetPasswordSent", false);
    return true;
  }

});

Template.ForgotPassword.helpers({
  /**
   * @summary Gets the current error message.
   * @locus Client
   * @method errorMessage
   * @memberOf ForgotPassword.helpers
   * @function
   * @return {String} errorMessage
   * */
  errorMessage: function () {
    return pageSession.get("errorMessage");
  },

  /**
   * @summary Checks to see if the reset password email has been sent..
   * @locus Client
   * @method resetPasswordSent
   * @memberOf ForgotPassword.helpers
   * @function
   * @return {String} resetPasswordSent
   * */
  resetPasswordSent: function () {
    return pageSession.get("resetPasswordSent");
  }

});
