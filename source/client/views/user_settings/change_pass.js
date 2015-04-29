var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

/**
 * @summary Renders the change password screen.
 * @locus Client
 * @method rendered
 * @memberOf UserSettingsChangePass
 * @function
 * */
Template.UserSettingsChangePass.rendered = function () {
  $("input[autofocus]").focus();
};

/**
 * @summary Sets an empty error and info message once the form is rendered.
 * @locus Client
 * @method created
 * @memberOf UserSettingsChangePass
 * @function
 * */
Template.UserSettingsChangePass.created = function () {
  pageSession.set("errorMessage", "");
  pageSession.set("infoMessage", "");
};

Template.UserSettingsChangePass.events({
  /**
   * @summary Checks to see if the old password is correct and then resets the password.
   * @locus Client
   * @method submit #change_pass_form
   * @memberOf UserSettingsChangePass.events
   * @function
   * */
  'submit #change_pass_form': function (e, t) {
    e.preventDefault();

    pageSession.set("errorMessage", "");
    pageSession.set("infoMessage", "");

    var submit_button = $(t.find(":submit"));

    var old_password = t.find('#old_password').value;
    var new_password = t.find('#new_password').value;
    var confirm_pass = t.find('#confirm_pass').value;

    if (old_password == "") {
      pageSession.set("errorMessage", "Please enter your old password.");
      t.find('#old_password').focus();
      return false;
    }
    if (new_password == "") {
      pageSession.set("errorMessage", "Please enter your new password.");
      t.find('#new_password').focus();
      return false;
    }
    if (confirm_pass == "") {
      pageSession.set("errorMessage", "Please confirm your new password.");
      t.find('#confirm_pass').focus();
      return false;
    }

    // check new password
    if (new_password != confirm_pass) {
      pageSession.set("errorMessage", "Your new password and confirm password doesn't match.");
      t.find('#new_password').focus();
      return false;
    }

    submit_button.button("loading");
    Accounts.changePassword(old_password, new_password, function (err) {
      submit_button.button("reset");
      if (err) {
        pageSession.set("errorMessage", err.message);
        return false;
      } else {
        pageSession.set("errorMessage", "");
        pageSession.set("infoMessage", "Your new password is set.");
        t.find('#old_password').value = "";
        t.find('#new_password').value = "";
        t.find('#confirm_pass').value = "";
        t.find('#old_password').focus();
      }
    });
    return false;
  }

});

Template.UserSettingsChangePass.helpers({
  /**
   * @summary Fetches the current error message.
   * @locus Client
   * @method errorMessage
   * @memberOf UserSettingsChangePass.helpers
   * @function
   * @return {String} errorMessage
   * */
  errorMessage: function () {
    return pageSession.get("errorMessage");
  },
  /**
   * @summary Fetches the current info message.
   * @locus Client
   * @method infoMessage
   * @memberOf UserSettingsChangePass.helpers
   * @function
   * @return {String} infoMessage
   * */
  infoMessage: function () {
    return pageSession.get("infoMessage");
  }

});
