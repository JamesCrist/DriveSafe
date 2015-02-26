Router.route('/', {
  name: 'home'
}, function () {
  this.render('home');
  SEO.set({ title: Meteor.App.NAME });
});

Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword']
});

Router.map(function(){
  this.route('dashboard');
});