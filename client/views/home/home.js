Template.home.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          alert('Sorry this verification link has expired.');
        }
      } else {
        alert('Thank you! Your email address has been confirmed.');
      }
    });
  }
};
