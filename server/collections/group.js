Group.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return true;
	},

	remove: function (userId, doc) {
		return true;
	}
});

Group.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Group.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Group.before.remove(function(userId, doc) {
	
});

Group.after.insert(function(userId, doc) {
	
});

Group.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Group.after.remove(function(userId, doc) {
	
});
