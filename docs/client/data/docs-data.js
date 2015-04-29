// This file is automatically generated by JSDoc; regenerate it with ../build_doc.sh
DocsData = {
  "Driver": {
    "kind": "class",
    "locus": "Anywhere",
    "longname": "Driver",
    "name": "Driver",
    "options": [],
    "params": [
      {
        "name": "id"
      },
      {
        "name": "group"
      },
      {
        "name": "user"
      },
      {
        "name": "currentRide"
      }
    ],
    "scope": "global",
    "summary": "Represents a driver."
  },
  "Driver.delete": {
    "kind": "function",
    "longname": "Driver.delete",
    "memberof": "Driver",
    "name": "delete",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Delete functionality for the driver instance"
  },
  "Driver.save": {
    "kind": "function",
    "longname": "Driver.save",
    "memberof": "Driver",
    "name": "save",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Saving functionality for the driver instance"
  },
  "Driver.stopDriving": {
    "kind": "function",
    "longname": "Driver.stopDriving",
    "memberof": "Driver",
    "name": "stopDriving",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Revoke a user's driver status if they are not currently giving a ride."
  },
  "Drivers": {
    "kind": "member",
    "locus": "Anywhere",
    "longname": "Drivers",
    "name": "Drivers",
    "scope": "global",
    "summary": "Creates a collection of drivers in the MongoDB",
    "type": {
      "names": [
        "Meteor.Collection"
      ]
    }
  },
  "Group": {
    "kind": "class",
    "locus": "Anywhere",
    "longname": "Group",
    "name": "Group",
    "options": [],
    "params": [
      {
        "description": "<p>The ID of the group.</p>",
        "name": "id"
      },
      {
        "description": "<p>The name of the group.</p>",
        "name": "name"
      },
      {
        "description": "<p>The user who administrates the group.</p>",
        "name": "admin"
      },
      {
        "description": "<p>An array of the members of the group.</p>",
        "name": "members"
      },
      {
        "description": "<p>An array of the current drivers of the group.</p>",
        "name": "drivers"
      },
      {
        "description": "<p>An array of the current ride requests in the group.</p>",
        "name": "queue"
      },
      {
        "description": "<p>The password to join the group.</p>",
        "name": "key"
      }
    ],
    "scope": "global",
    "summary": "Represents a group as a class. The constructor takes a document."
  },
  "Group.addDriver": {
    "kind": "function",
    "longname": "Group.addDriver",
    "memberof": "Group",
    "name": "addDriver",
    "options": [],
    "params": [
      {
        "name": "driver"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Add driver to group driver array."
  },
  "Group.addMember": {
    "kind": "function",
    "longname": "Group.addMember",
    "memberof": "Group",
    "name": "addMember",
    "options": [],
    "params": [
      {
        "name": "memberId"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Add specific member to group member array"
  },
  "Group.addRideToQueue": {
    "kind": "function",
    "longname": "Group.addRideToQueue",
    "memberof": "Group",
    "name": "addRideToQueue",
    "options": [],
    "params": [
      {
        "name": "ride"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Add ride to group ride queue"
  },
  "Group.changeAdmin": {
    "kind": "function",
    "longname": "Group.changeAdmin",
    "memberof": "Group",
    "name": "changeAdmin",
    "options": [],
    "params": [
      {
        "name": "newAdmin"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Change group admin to specified user"
  },
  "Group.changeKey": {
    "kind": "function",
    "longname": "Group.changeKey",
    "memberof": "Group",
    "name": "changeKey",
    "options": [],
    "params": [
      {
        "name": "newKey"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Change group key to new specified key"
  },
  "Group.delete": {
    "kind": "function",
    "longname": "Group.delete",
    "memberof": "Group",
    "name": "delete",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Deletes a group instance with an empty members array."
  },
  "Group.forceDelete": {
    "kind": "function",
    "longname": "Group.forceDelete",
    "memberof": "Group",
    "name": "forceDelete",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Deletes a group instance after removing all members."
  },
  "Group.membersModel": {
    "kind": "function",
    "longname": "Group.membersModel",
    "memberof": "Group",
    "name": "membersModel",
    "options": [],
    "params": [],
    "returns": [
      {
        "type": {
          "names": [
            "Array"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Returns the array of members in the group."
  },
  "Group.removeDriver": {
    "kind": "function",
    "longname": "Group.removeDriver",
    "memberof": "Group",
    "name": "removeDriver",
    "options": [],
    "params": [
      {
        "name": "driver"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Remove driver from group driver array"
  },
  "Group.removeMember": {
    "kind": "function",
    "longname": "Group.removeMember",
    "memberof": "Group",
    "name": "removeMember",
    "options": [],
    "params": [
      {
        "name": "memberId"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Remove specific member from group member array."
  },
  "Group.removeRideFromQueue": {
    "kind": "function",
    "longname": "Group.removeRideFromQueue",
    "memberof": "Group",
    "name": "removeRideFromQueue",
    "options": [],
    "params": [
      {
        "name": "rideId"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Remove ride from group ride queue"
  },
  "Group.save": {
    "kind": "function",
    "longname": "Group.save",
    "memberof": "Group",
    "name": "save",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Saving functionality for the group instance."
  },
  "Groups": {
    "kind": "member",
    "locus": "Anywhere",
    "longname": "Groups",
    "name": "Groups",
    "scope": "global",
    "summary": "Creates a collection of groups in the MongoDB",
    "type": {
      "names": [
        "Meteor.Collection"
      ]
    }
  },
  "Meteor.methods.changeAdmin": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.changeAdmin",
    "memberof": "Meteor.methods",
    "name": "changeAdmin",
    "options": [],
    "params": [
      {
        "name": "newAdmin",
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "none"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the changeAdmin function."
  },
  "Meteor.methods.createNewUser": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.createNewUser",
    "memberof": "Meteor.methods",
    "name": "createNewUser",
    "options": [],
    "params": [
      {
        "description": "<p>A string of user's email</p>",
        "name": "email",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "description": "<p>The name of the user</p>",
        "name": "name",
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "password"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the createNewUser function."
  },
  "Meteor.methods.createUserAccount": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.createUserAccount",
    "memberof": "Meteor.methods",
    "name": "createUserAccount",
    "options": [
      {
        "name": "username",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "email",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "password",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "profile",
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "params": [
      {
        "name": "options",
        "type": {
          "names": [
            "Object"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "userOptions"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the createUserAccount function."
  },
  "Meteor.methods.joinGroup": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.joinGroup",
    "memberof": "Meteor.methods",
    "name": "joinGroup",
    "options": [],
    "params": [
      {
        "name": "groupName",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "groupKey",
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "group.id"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the joinGroup function."
  },
  "Meteor.methods.removeMember": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.removeMember",
    "memberof": "Meteor.methods",
    "name": "removeMember",
    "options": [],
    "params": [
      {
        "name": "memberToRemove",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "group",
        "type": {
          "names": [
            "Object"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "group.id"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the removeMember function."
  },
  "Meteor.methods.sendMail": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.sendMail",
    "memberof": "Meteor.methods",
    "name": "sendMail",
    "options": [
      {
        "name": "username",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "email",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "password",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "profile",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "roles",
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "params": [
      {
        "name": "options",
        "type": {
          "names": [
            "Object"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "none"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the sendMail function."
  },
  "Meteor.methods.updateUserAccount": {
    "kind": "function",
    "locus": "Server",
    "longname": "Meteor.methods.updateUserAccount",
    "memberof": "Meteor.methods",
    "name": "updateUserAccount",
    "options": [
      {
        "name": "username",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "email",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "password",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "profile",
        "type": {
          "names": [
            "String"
          ]
        }
      },
      {
        "name": "roles",
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "params": [
      {
        "name": "options",
        "type": {
          "names": [
            "Object"
          ]
        }
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "none"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "This is a description of the updateUserAccount function."
  },
  "Ride": {
    "kind": "class",
    "longname": "Ride",
    "name": "Ride",
    "options": [],
    "params": [
      {
        "name": "id"
      },
      {
        "name": "user"
      },
      {
        "name": "group"
      },
      {
        "name": "pickupLoc"
      },
      {
        "name": "destLoc"
      },
      {
        "name": "createdAt"
      }
    ],
    "scope": "global",
    "summary": "Represents a ride."
  },
  "Ride.cancel": {
    "kind": "function",
    "longname": "Ride.cancel",
    "memberof": "Ride",
    "name": "cancel",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Cancel a ride that has been requested."
  },
  "Ride.delete": {
    "kind": "function",
    "longname": "Ride.delete",
    "memberof": "Ride",
    "name": "delete",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Delete functionality for the ride instance."
  },
  "Ride.save": {
    "kind": "function",
    "longname": "Ride.save",
    "memberof": "Ride",
    "name": "save",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Saving functionality for the ride instance."
  },
  "Rides": {
    "kind": "member",
    "locus": "Anywhere",
    "longname": "Rides",
    "name": "Rides",
    "scope": "global",
    "summary": "Create a collection of rides in the MongoDB",
    "type": {
      "names": [
        "Meteor.Collection"
      ]
    }
  },
  "User": {
    "kind": "class",
    "locus": "Anywhere",
    "longname": "User",
    "name": "User",
    "options": [],
    "params": [],
    "scope": "global",
    "summary": "Represents a user."
  },
  "User.becomeAdmin": {
    "kind": "function",
    "longname": "User.becomeAdmin",
    "memberof": "User",
    "name": "becomeAdmin",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Become admin of current group."
  },
  "User.becomeDriver": {
    "kind": "function",
    "longname": "User.becomeDriver",
    "memberof": "User",
    "name": "becomeDriver",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Become driver of current group."
  },
  "User.createGroup": {
    "kind": "function",
    "longname": "User.createGroup",
    "memberof": "User",
    "name": "createGroup",
    "options": [],
    "params": [
      {
        "name": "newGroupName"
      },
      {
        "name": "newGroupKey"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Create a new group and become the admin of that group."
  },
  "User.joinGroup": {
    "kind": "function",
    "longname": "User.joinGroup",
    "memberof": "User",
    "name": "joinGroup",
    "options": [],
    "params": [
      {
        "name": "groupName"
      },
      {
        "name": "groupKey"
      },
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Join an already existing group using the group name and key."
  },
  "User.leaveGroup": {
    "kind": "function",
    "longname": "User.leaveGroup",
    "memberof": "User",
    "name": "leaveGroup",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Remove user from current group."
  },
  "User.stopDriving": {
    "kind": "function",
    "longname": "User.stopDriving",
    "memberof": "User",
    "name": "stopDriving",
    "options": [],
    "params": [
      {
        "name": "callback"
      }
    ],
    "scope": "static",
    "summary": "Revoke driver status of user."
  },
  "User.updateLocation": {
    "kind": "function",
    "longname": "User.updateLocation",
    "memberof": "User",
    "name": "updateLocation",
    "options": [],
    "params": [
      {
        "name": "lat"
      },
      {
        "name": "lng"
      }
    ],
    "scope": "static",
    "summary": "Set location of user."
  },
  "driverDashboard.destroyed": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.destroyed",
    "memberof": "driverDashboard",
    "name": "destroyed",
    "options": [],
    "params": [],
    "scope": "static",
    "summary": "Removes the driver dashboard template from the screen."
  },
  "driverDashboard.events.click #confirm-dropoff-button": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.events.click #confirm-dropoff-button",
    "memberof": "driverDashboard.events.click ",
    "name": "confirm-dropoff-button",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Confirms that the Rider has been dropped off successfully."
  },
  "driverDashboard.events.click #dest-navigation-button": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.events.click #dest-navigation-button",
    "memberof": "driverDashboard.events.click ",
    "name": "dest-navigation-button",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Launches navigation to the navigation location."
  },
  "driverDashboard.events.click #pickup-navigation-button": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.events.click #pickup-navigation-button",
    "memberof": "driverDashboard.events.click ",
    "name": "pickup-navigation-button",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Launches navigation to the pickup location."
  },
  "driverDashboard.events.click .stopDriving": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.events.click .stopDriving",
    "memberof": "driverDashboard.events.click ",
    "name": "stopDriving",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.template"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Returns the first Ride in the queue."
  },
  "driverDashboard.events.click .tab-item": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.events.click .tab-item",
    "memberof": "driverDashboard.events.click ",
    "name": "tab-item",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.template"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Confirms when clicking on a menu item in the side tab."
  },
  "driverDashboard.helpers.firstRide": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.helpers.firstRide",
    "memberof": "driverDashboard.helpers",
    "name": "firstRide",
    "options": [],
    "params": [],
    "returns": [
      {
        "type": {
          "names": [
            "Ride"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Returns the first Ride in the queue."
  },
  "driverDashboard.helpers.getRideCreatedTime": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.helpers.getRideCreatedTime",
    "memberof": "driverDashboard.helpers",
    "name": "getRideCreatedTime",
    "options": [],
    "params": [],
    "returns": [
      {
        "description": "<p>Moment.js object</p>",
        "type": {
          "names": [
            "Moment"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Gets the time at which the ride was created."
  },
  "driverDashboard.helpers.getRideUser": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.helpers.getRideUser",
    "memberof": "driverDashboard.helpers",
    "name": "getRideUser",
    "options": [],
    "params": [],
    "returns": [
      {
        "type": {
          "names": [
            "String"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Gets the name of the user that requested the ride.."
  },
  "driverDashboard.helpers.rideModel": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.helpers.rideModel",
    "memberof": "driverDashboard.helpers",
    "name": "rideModel",
    "options": [],
    "params": [],
    "returns": [
      {
        "type": {
          "names": [
            "Ride"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Creates a new Ride."
  },
  "driverDashboard.helpers.ridesAvailable": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.helpers.ridesAvailable",
    "memberof": "driverDashboard.helpers",
    "name": "ridesAvailable",
    "options": [],
    "params": [],
    "returns": [
      {
        "description": "<p>true or false</p>",
        "type": {
          "names": [
            "Boolean"
          ]
        }
      }
    ],
    "scope": "static",
    "summary": "Determines whether or not there are any rides in the current queue."
  },
  "driverDashboard.rendered": {
    "kind": "function",
    "locus": "Client",
    "longname": "driverDashboard.rendered",
    "memberof": "driverDashboard",
    "name": "rendered",
    "options": [],
    "params": [],
    "scope": "static",
    "summary": "Renders the driver dashboard template on the screen."
  },
  "isValidEmail": {
    "kind": "function",
    "longname": "isValidEmail",
    "name": "isValidEmail",
    "options": [],
    "params": [],
    "scope": "global",
    "summary": "Automatically generated utilities."
  },
  "leftMenu.events.click #becomeDriverButton": {
    "kind": "function",
    "locus": "Client",
    "longname": "leftMenu.events.click #becomeDriverButton",
    "memberof": "leftMenu.events.click ",
    "name": "becomeDriverButton",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.Template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Changes the user designation to become a driver."
  },
  "leftMenu.events.click #createGroupButton": {
    "kind": "function",
    "locus": "Client",
    "longname": "leftMenu.events.click #createGroupButton",
    "memberof": "leftMenu.events.click ",
    "name": "createGroupButton",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.Template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Opens create group dialog window and makes sure that the group name is not already in use."
  },
  "leftMenu.events.click #dashboardButton": {
    "kind": "function",
    "locus": "Client",
    "longname": "leftMenu.events.click #dashboardButton",
    "memberof": "leftMenu.events.click ",
    "name": "dashboardButton",
    "options": [],
    "params": [],
    "scope": "instance",
    "summary": "Opens dashboard menu based on current user role"
  },
  "leftMenu.events.click #joinGroupButton": {
    "kind": "function",
    "locus": "Client",
    "longname": "leftMenu.events.click #joinGroupButton",
    "memberof": "leftMenu.events.click ",
    "name": "joinGroupButton",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.Template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Opens join group dialog window and makes sure that the group code is valid."
  },
  "leftMenu.events.click #leaveGroup": {
    "kind": "function",
    "locus": "Client",
    "longname": "leftMenu.events.click #leaveGroup",
    "memberof": "leftMenu.events.click ",
    "name": "leaveGroup",
    "options": [],
    "params": [
      {
        "name": "event",
        "type": {
          "names": [
            "Event"
          ]
        }
      },
      {
        "name": "template",
        "type": {
          "names": [
            "Meteor.Template"
          ]
        }
      }
    ],
    "scope": "instance",
    "summary": "Leaves the group that the user is currently a member of."
  },
  "leftMenu.events.click #logoutButton": {
    "kind": "function",
    "locus": "Client",
    "longname": "leftMenu.events.click #logoutButton",
    "memberof": "leftMenu.events.click ",
    "name": "logoutButton",
    "options": [],
    "params": [],
    "scope": "instance",
    "summary": "Sends logout request upon clicking logout button"
  },
  "loading.destroyed": {
    "kind": "function",
    "locus": "Client",
    "longname": "loading.destroyed",
    "memberof": "loading",
    "name": "destroyed",
    "options": [],
    "params": [],
    "scope": "static",
    "summary": "Removes the loading template from the screen"
  },
  "loading.rendered": {
    "kind": "function",
    "locus": "Client",
    "longname": "loading.rendered",
    "memberof": "loading",
    "name": "rendered",
    "options": [],
    "params": [],
    "scope": "static",
    "summary": "Renders the loading template on the screen"
  },
  "rightMenu.events.click #accountSettings": {
    "kind": "function",
    "locus": "Client",
    "longname": "rightMenu.events.click #accountSettings",
    "memberof": "rightMenu.events.click ",
    "name": "accountSettings",
    "options": [],
    "params": [],
    "scope": "instance",
    "summary": "Opens the user settings dashboard window."
  },
  "rightMenu.events.click #groupSettings": {
    "kind": "function",
    "locus": "Client",
    "longname": "rightMenu.events.click #groupSettings",
    "memberof": "rightMenu.events.click ",
    "name": "groupSettings",
    "options": [],
    "params": [],
    "scope": "instance",
    "summary": "Opens the group settings dashboard window."
  }
};