"use strict";
describe("Group" , function () {
  var fakeUser = null;
  var group = null;

  beforeEach(function () {
    fakeUser = {
      _id : '123' ,
      profile : {
        name : "test" ,
        location : { lat : 0 , lng : 0 } ,
        group : null ,
        isAdmin : true ,
        driverId : null
      }
    };
    spyOn(Meteor , 'user').and.returnValue(_.extend(new User(), fakeUser));
    spyOn(Meteor , 'userId').and.returnValue(fakeUser._id);

    group = new Group(null , "Group 1" , "123" , null , null , null , "12345");

    spyOn(Groups , "insert").and.callFake(function (doc , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });

    spyOn(Groups , "update").and.callFake(function (id , doc , callback) {
      // simulate async return of id = "1";
      if(callback)
        callback(null , "1");
    });

    spyOn(Groups , "remove").and.callFake(function (id , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });
  });


  it("should be created with admin, name, members, drivers, queue, and key" , function () {

    expect(group.name).toBe("Group 1");
    expect(group.admin).toBe("123");
    expect(group.members).toEqual([ "123" ]);
    expect(group.drivers).toEqual([]);
    expect(group.queue).toEqual([]);
    expect(group.key).toBe("12345");

    group.save();

    // id should be defined
    expect(group.id).toEqual("1");

    expect(Groups.insert).toHaveBeenCalledWith({
      name : "Group 1" ,
      admin : "123" ,
      members : [ "123" ] ,
      drivers : [] ,
      queue : [] ,
      key : "12345"
    } , jasmine.any(Function));
  });


  it("should be able to add members to group" , function () {
    group.save();
    expect(group.id).toBe("1");

    group.addMember("321" , function (err , res) {
      expect(err).toBe(null);
      expect(res).toBe("1");
    });

    // The group should have "321" as a member now.
    expect(group.members).toEqual([ "123" , "321" ]);
  });

  it("should not allow member to be added to a group if already in group" , function () {
    group.save();
    expect(group.id).toBe("1");

    // Try to add the admin again, and check to make sure an error was thrown
    group.addMember("123" , function (err, res) {
      expect(err).not.toBe(null);
      expect(res).toBe(null);
    });
  });

  it("should be able to remove members from group" , function () {
    group.save();
    expect(group.id).toBe("1");

    group.addMember("321" , function (err , res) {
      expect(err).toBe(null);
      expect(res).toBe("1");
    });
    expect(group.members).toEqual([ "123" , "321" ]);

    // Remove the member we just added.
    group.removeMember("321", function(err, res) {
      expect(err).toBe(null);
      expect(res).toBe("1");
    });
  });

  it("when last member is removed the delete method should be called" , function () {
    group.save();
    expect(group.id).toBe("1");

    // Remove the member we just added.
    group.removeMember("123", function(err, res) {
      expect(err).toBe(null);
      expect(res).toBe("1");
    });

    expect(Groups.remove).toHaveBeenCalledWith("1" , jasmine.any(Function));
  });

});
