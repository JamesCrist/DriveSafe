var pageSession = new ReactiveDict();

pageSession.set("groupKey", "Loading...");

Template.GroupSettings.rendered = function() {
  if (Meteor.user().profile.admin) {
    Meteor.call("getGroupKey", function(error, key) {
      if(error) {
        console.log(error.message);
      } else {
        pageSession.set("groupKey" , key);
      }
    });
  }
};

Template.GroupSettings.helpers({
  groupKey: function() {
    return pageSession.get("groupKey");
  }
});