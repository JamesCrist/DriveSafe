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
        isAdmin : false ,
        driverId : null
      }
    };
    spyOn(Meteor , 'user').and.returnValue(fakeUser);
    spyOn(Meteor , 'userId').and.returnValue(fakeUser._id);
    group = new Group(null , "Group 1" , "123" , null , null , null , "12345");
  });


  it("should be created with admin, name, members, drivers, queue, and key" , function () {
    spyOn(Groups , "insert").and.callFake(function (doc , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });

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
    spyOn(Groups , "insert").and.callFake(function (doc , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });

    spyOn(Groups , "update").and.callFake(function (id , doc , callback) {
      // simulate async return of id = "1";
      if(callback)
        callback(null , "1");
    });

    group.save();

    expect(group.id).toBe("1");

    group.addMember("321" , function (err , res) {
      expect(err).toBe(null);
      expect(res).toBe("1");
    });

    // The group should have "321" as a member now.
    expect(group.members).toEqual([ "123" , "321" ]);
  });
});
