"use strict";
describe("Group" , function () {
  it("should be created with admin, name, members, drivers, queue, and key" , function () {
    spyOn(Groups , "insert").and.callFake(function (doc , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });

    var group = new Group(null , "Group 1" , "1" , null , null, null, "12345");

    expect(group.name).toBe("Group 1");
    expect(group.admin).toBe("1");
    expect(group.members).toEqual([ "1" ]);
    expect(group.drivers).toEqual([]);
    expect(group.queue).toEqual([]);
    expect(group.key).toBe("12345");

    group.save();

    // id should be defined
    expect(group.id).toEqual("1");

    expect(Groups.insert).toHaveBeenCalledWith({
      name : "Group 1" ,
      admin : "1" ,
      members : [ "1" ] ,
      drivers : [] ,
      queue: [] ,
      key: "12345"
    } , jasmine.any(Function));
  });
});
