Template.Logout.rendered = function() {
  IonPopup.confirm({
    title: 'Are you sure?',
    template: 'Are you <strong>really</strong> sure?',
    onOk: function() {
      Meteor.logout();
    },
    onCancel: function() {
      console.log('Cancelled');
    }
  });
};

Template.Logout.events({
	
});

Template.Logout.helpers({
	
});
