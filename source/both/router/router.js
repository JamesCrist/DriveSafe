Router.configure({
  templateNameConverter : "upperCamelCase" ,
  routeControllerNameConverter : "upperCamelCase" ,
  layoutTemplate : "layout" ,
  notFoundTemplate : "notFound" ,
  loadingTemplate : "loading"
});

if(Meteor.isClient) {
  var publicRoutes = [ "login" , "register" , "forgot_password" , "reset_password" ];
  var privateRoutes = [ "rider_dashboard" , "user_settings" , "group_settings" , "logout" ];
  var adminRoutes = [ "group_settings" ];
  var zonelessRoutes = [];

  var roleMap = [];

  this.firstGrantedRoute = function () {
    var grantedRoute = "";
    _.every(privateRoutes , function (route) {
      if(routeGranted(route)) {
        grantedRoute = route;
        return false;
      }
      return true;
    });

    if(grantedRoute == "") {
      if(routeGranted("rider_dashboard")) {
        return "rider_dashboard";
      } else {
        return "login";
      }
    }

    return grantedRoute;
  }

  // this function returns true if user is in role allowed to access given route
  this.routeGranted = function (routeName) {
    if(!routeName) {
      // route without name - enable access (?)
      return true;
    }

    if(!roleMap || roleMap.length === 0) {
      // this app don't have role map - enable access
      return true;
    }

    var roleMapItem = _.find(roleMap , function (roleItem) {
      return roleItem.route == routeName;
    });
    if(!roleMapItem) {
      // page is not restricted
      return true;
    }

    if(!Meteor.user() || !Meteor.user().roles) {
      // user is not logged in
      return false;
    }

    // this page is restricted to some role(s), check if user is in one of allowedRoles
    var allowedRoles = roleMapItem.roles;
    var granted = _.intersection(allowedRoles , Meteor.user().roles);
    if(!granted || granted.length === 0) {
      return false;
    }

    return true;
  };

  Router.ensureLogged = function () {
    if(!Meteor.userId()) {
      // user is not logged in - redirect to public home
      this.redirect("login");
    } else {
      // user is logged in - check role
      if(!routeGranted(this.route.getName())) {
        // user is not in allowedRoles - redirect to private home
        var redirectRoute = firstGrantedRoute();
        this.redirect(redirectRoute);
      }
      this.next();
    }
  };

  Router.ensureNotLogged = function () {

    if(Meteor.userId()) {
      var redirectRoute = firstGrantedRoute();
      this.redirect(redirectRoute);
    }
    this.next();
  };

  Router.ensureAdmin = function () {
    if(!Meteor.user() || !Meteor.user().isAdmin()) {
      var redirectRoute = firstGrantedRoute();
      this.redirect(redirectRoute);
    }
    this.next();
  };

  Router.ensureRider = function () {
    if(!Meteor.user()) {
      this.redirect("login");
    } else if(Meteor.user().isDriver()) {
      this.redirect("driver_dashboard");
    }
    this.next();
  };

  Router.ensureDriver = function () {
    if(!Meteor.user()) {
      this.redirect("login");
    } else if(!Meteor.user().isDriver()) {
      this.redirect("rider_dashboard");
    }
    this.next();
  };

  Router.onBeforeAction(function () {
    // loading indicator here
    if(!this.ready()) {
      $("body").addClass("wait");
    } else {
      $("body").removeClass("wait");
    }
    this.next();
  });

  Router.onBeforeAction(Router.ensureNotLogged , { only : publicRoutes });
  Router.onBeforeAction(Router.ensureLogged , { only : privateRoutes });
  Router.onBeforeAction(Router.ensureAdmin , { only : adminRoutes });
  Router.onBeforeAction(Router.ensureRider , { only : [ "rider_dashboard" ] });
  Router.onBeforeAction(Router.ensureDriver , { only : [ "driver_dashboard" ] });

}

Router.map(function () {

  this.route("login" , { path : "/" , controller : "LoginController" });
  this.route("register" , { path : "/register" , controller : "RegisterController" });
  this.route("forgot_password" , { path : "/forgot_password" , controller : "ForgotPasswordController" });
  this.route("reset_password" , {
    path : "/reset_password/:resetPasswordToken" ,
    controller : "ResetPasswordController"
  });
  this.route("rider_dashboard" , { path : "/rider_dashboard" , controller : "RiderDashboardController" });
  this.route("driver_dashboard" , { path : "/driver_dashboard" , controller : "DriverDashboardController" });
  this.route("user_settings" , { path : "/user_settings" , controller : "UserSettingsController" });
  this.route("group_settings" , { path : "/group_settings" , controller : "GroupSettingsController" });
  this.route("logout" , { path : "/logout" , controller : "LogoutController" });
  /*ROUTER_MAP*/

  this.route('GeolocationBGRoute' , {
    path : 'api/geolocation' ,
    where : 'server' ,
    action : function () {
      // GET, POST, PUT, DELETE
      var requestMethod = this.request.method;
      // Data from a POST request
      var requestData = this.request.body;

      // log stuff
      //console.log('GeolocationBG post: ' + requestMethod);
      //console.log(JSON.stringify(requestData));

      //  require some security with data
      //  validate userId/uuid/etc (inside Meteor.call?)
      console.log(requestData);

      // Can insert into a Collection from the server (or whatever)
      if(Users.findOne(requestData.userId) && requestData.location) {
        Users.findOne(requestData.userId).updateLocation(requestData.location.latitude , requestData.location.longitude);
        console.log("GEOLOCATION SUCCESS!");
        this.response.writeHead(200 , { 'Content-Type' : 'application/json' });
        this.response.end('ok');
        return;
      }

      // if we end up with an error case, you can return 500
      this.response.writeHead(500 , { 'Content-Type' : 'application/json' });
      this.response.end('failure');
    }
  });

});
