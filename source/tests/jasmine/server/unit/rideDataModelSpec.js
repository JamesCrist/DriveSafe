"use strict";
describe("Ride" , function () {
  it("should be created with id, user, group, driver, pending, pickupLoc, destLoc, pickupAdd, destAdd, createdAt" , function () {
    spyOn(Rides , "insert").and.callFake(function (doc , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });
    spyOn(Date,"now").and.callFake(function(){
      return 123
    });
//id, user, group, driver, pending, pickupLoc, destLoc, pickupAdd, destAdd, createdAt
    var ride = new Ride(null,'Ride 1','Group 1','Driver 1',true,'a','a','pickupAdd','destAdd',null);

    expect(ride.user).toBe("Ride 1");
    expect(ride.group).toBe("Group 1");
    expect(ride.driver).toBe("Driver 1"); 
    expect(ride.pending).toBe(true);
    expect(ride.pickupLoc).toBe('a');
    expect(ride.destLoc).toBe('a');
    expect(ride.pickupAdd).toBe('pickupAdd');
    expect(ride.destAdd).toBe('destAdd');


    ride.save();

    expect(ride.id).toEqual("1");

    // expect(Rides.insert).toHaveBeenCalledWith({
    //   user : "Ride 1" ,
    // } , jasmine.any(Function));
  });
});
