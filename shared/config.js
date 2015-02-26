AccountsTemplates.configure({
  // Behaviour
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  // CANNOT USE WITH OTHER LOGIN SERVICES!
  enforceEmailVerification: true,
  lowercaseUsername: true,

  // Appearance
  showAddRemoveServices: true,
  showForgotPasswordLink: false,
  showLabels: true,
  showPlaceholders: true,

  // Client-side Validation
  continuousValidation: true,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/dashboard',
  redirectTimeout: 4000,

  // Hooks
  //onLogoutHook: myLogoutFunc,
  //onSubmitHook: mySubmitFunc,
  onSubmitHook: function (error, state) {
    if(!error && state === "signUp") {
      AccountsTemplates.setState("verifyEmail");
    }
  },

  texts: {
    info: {
      emailSent: "info.emailSent",
      emailVerified: "info.emailVerified",
      pwdChanged: "info.passwordChanged",
      pwdReset: "info.passwordReset",
      pwdSet: "info.passwordReset",
      signUpVerifyEmail: "Registration Successful! Please check your email and follow the instructions."
    },
    title: {
      forgotPwd: "Feeling Forgetful?",
      resetPwd: "Reset Your Password",
      signIn: "Welcome Back!",
      signUp: "Start Using DriveSafe!"
    }
  }
});

// TODO: Provide server-side username validation
AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true,
  minLength: 3
});
