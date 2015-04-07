var pageSession = new ReactiveDict();

Template.GroupSettings.helpers({
  groupKey: function() {
    return Group.getGroup()._id;
  }
});