<<<<<<< HEAD
Router.route('/', function () {
  this.render('home');
  SEO.set({ title: 'Home -' + Meteor.App.NAME });
=======
// Home Route
Router.route('/', function () {
  this.render('home');
  SEO.set({ title: 'Home - ' + Meteor.App.NAME });
>>>>>>> 69abcd438af82008a06c214a1716c0e935462d35
});
