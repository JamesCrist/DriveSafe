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
    fakeUser = _.extend(new User() , fakeUser);
    spyOn(Meteor , 'user').and.returnValue(fakeUser);
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

  describe("methods" , function () {
    beforeEach(function () {
      group.save();
    });

    describe("updating members" , function () {

      it("should be able to add members to group" , function () {
        group.addMember("321" , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        // The group should have "321" as a member now.
        expect(group.members).toEqual([ "123" , "321" ]);
      });

      it("should not allow member to be added to a group if already in group" , function () {

        // Try to add the admin again, and check to make sure an error was thrown
        group.addMember("123" , function (err , res) {
          expect(err).not.toBe(null);
          expect(res).toBe(null);
        });

        expect(group.members).toEqual([ "123" ]);

      });

      it("should be able to remove members from group" , function () {

        group.addMember("321" , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });
        expect(group.members).toEqual([ "123" , "321" ]);

        // Remove the member we just added.
        group.removeMember("321" , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        expect(group.members).toEqual([ "123" ]);
      });

      it("when last member is removed the delete method should be called" , function () {

        // Remove the member we just added.
        group.removeMember("123" , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        expect(Groups.remove).toHaveBeenCalledWith("1" , jasmine.any(Function));
      });
    });

    describe("changing admins" , function () {

      it("should be able to change admin for a group" , function () {

        var newAdmin = {
          _id : '321' ,
          profile : {
            name : "test" ,
            location : { lat : 0 , lng : 0 } ,
            group : null ,
            isAdmin : false ,
            driverId : null
          }
        };
        newAdmin = _.extend(new User() , newAdmin);

        // Changing admin should not work since the new admin is not a member of the group.
        group.changeAdmin(newAdmin , function (err , res) {
          expect(err).not.toBe(null);
          expect(res).toBe(null);
        });

        group.addMember(newAdmin.getId());

        group.changeAdmin(newAdmin , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        expect(group.admin).toBe(newAdmin.getId());
      });
    });

    describe("editing drivers" , function () {
      var driver = null;
      beforeEach(function () {
        driver = {
          _id : '321' ,
          profile : {
            name : "test" ,
            location : { lat : 0 , lng : 0 } ,
            group : null ,
            isAdmin : false ,
            driverId : null
          }
        };
        driver = _.extend(new User() , driver);
      });

      it("should be able to add drivers" , function () {
        expect(group.members).toEqual([ "123" ]);

        group.addDriver(driver , function (err , res) {
          expect(err).not.toBe(null);
          expect(res).toBe(null);
        });

        expect(group.drivers).toEqual([]);

        group.addMember(driver.getId());

        group.addDriver(driver , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        expect(group.drivers).toEqual([ "321" ]);
      });

      it("should be able to remove drivers from the group" , function () {
        group.removeDriver(driver , function (err , res) {
          expect(err).not.toBe(null);
          expect(res).toBe(null);
        });

        group.addMember(driver.getId());
        group.addDriver(driver);

        expect(group.drivers).toEqual([ "321" ]);

        group.removeDriver(driver , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        expect(group.drivers).toEqual([]);
      });
    });

    describe("editing the queue" , function () {
      var ride = null;
      beforeEach(function () {
        ride = new Ride('1' , 'Ride 1' , 'Group 1' , 'Driver 1' , true , 'a' , 'a' , 'pickupAdd' , 'destAdd' , null);
      });

      it("should be able to add rides to queue" , function () {
        expect(group.queue).toEqual([]);

        group.addRideToQueue(ride , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe("1");
        });

        expect(group.queue).toEqual([ "1" ]);
      });

      it("should not be able to add a ride to the queue twice" , function () {
        group.addRideToQueue(ride);

        expect(group.queue).toEqual([ "1" ]);

        group.addRideToQueue(ride , function (err , res) {
          // Expect that there is an error thrown
          expect(err).not.toBe(null);
          expect(res).toBe(null);
        });

        expect(group.queue).toEqual([ "1" ]);
      });

      it("should be able to remove ride from queue" , function () {
        // Trying to remove a ride thats not in the queue should yield an error.
        group.removeRideFromQueue(ride.id , function (err , res) {
          expect(err).not.toBe(null);
          expect(res).toBe(null);
        });

        group.addRideToQueue(ride);
        expect(group.queue).toEqual([ "1" ]);

        group.removeRideFromQueue(ride.id , function (err , res) {
          expect(err).toBe(null);
          expect(res).toBe('1');
        });

        expect(group.queue).toEqual([]);
      });
    });
  });
});
