var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

/**
 * @summary Renders the login screen.
 * @locus Client
 * @method rendered
 * @memberOf Login
 * @function
 * */
Template.Login.rendered = function () {
  $("input[autofocus]").focus();
};

/**
 * @summary Sets an empty error message once a user is logged in.
 * @locus Client
 * @method created
 * @memberOf Login
 * @function
 * */
Template.Login.created = function () {
  pageSession.set("errorMessage", "");
};

Template.Login.events({
  /**
   * @summary Checks to make sure that the login credentials are correct and then logs in user.
   * @locus Client
   * @method submit #login_form
   * @memberOf Login.events
   * @function
   * @param {Event} e
   * @param {Meteor.template} t
   * */
  'submit #login_form': function (e, t) {
    e.preventDefault();

    var submit_button = $(t.find(":submit"));

    var login_email = t.find('#login_email').value.trim().toLowerCase();
    var login_password = t.find('#login_password').value;

    // check email
    if (!isValidEmail(login_email)) {
      pageSession.set("errorMessage", "Please enter your e-mail address.");
      t.find('#login_email').focus();
      return false;
    }

    // check password
    if (login_password == "") {
      pageSession.set("errorMessage", "Please enter your password.");
      t.find('#login_email').focus();
      return false;
    }

    submit_button.button("loading");
    Meteor.loginWithPassword(login_email, login_password, function (err) {
      submit_button.button("reset");
      if (err) {
        pageSession.set("errorMessage", err.message);
        return false;
      }
      else
        pageSession.set("errorMessage", "");
    });
    return false;
  }

});

Template.Login.helpers({
  /**
   * @summary Fetches the current error message.
   * @locus Client
   * @method errorMessage
   * @memberOf Login.helpers
   * @function
   * @return {String} errorMessage
   * */
  errorMessage: function () {
    return pageSession.get("errorMessage");
  }

});
