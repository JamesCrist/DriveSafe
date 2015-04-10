Template.GroupSettings.helpers({
  groupKey: function() {
    if (Groups.findOne())
      return Groups.findOne().getId();
  },
  groupName: function() {
    if (Groups.findOne())
      Groups.findOne().getName();
  }
});