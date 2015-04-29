"use strict";
describe("Driver" , function () {
  it("should be created with group, user and currentRide" , function () {
    spyOn(Drivers , "insert").and.callFake(function (doc , callback) {
      // simulate async return of id = "1";
      callback(null , "1");
    });

    var driver = new Driver(null , "1" , "2" , null);

    expect(driver.group).toBe("1");
    expect(driver.user).toBe("2");
    expect(driver.currentRide).toBe(null);

    driver.save();

    // id should be defined
    expect(driver.id).toEqual("1");

    expect(Drivers.insert).toHaveBeenCalledWith({
      group : "1" ,
      user : "2" ,
      currentRide : null
    } , jasmine.any(Function));
  });
});
