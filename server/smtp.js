Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://lusilva:beatriz3@smtp.sendgrid.net:587';

  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'DriveSafe Team <no-reply@meteor.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'DriveSafe';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return 'Confirm Your Email Address';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function (user , url) {
    return 'Welcome to DriveSafe! Click on the following link to verify your email address: ' + url;
  };
});