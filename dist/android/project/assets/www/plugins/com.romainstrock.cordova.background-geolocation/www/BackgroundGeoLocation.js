cordova.define("com.romainstrock.cordova.background-geolocation.BackgroundGeoLocation", function(require, exports, module) { var exec = require('cordova/exec');

module.exports = {
  configure: function(success, failure, config) {
    var params            = JSON.stringify(config.params || {}),
        headers           = JSON.stringify(config.headers || {}),
        url               = config.url || 'BackgroundGeoLocation_url',
        stationaryRadius  = (config.stationaryRadius >= 0) ? config.stationaryRadius : 50,  // meters
        distanceFilter    = (config.distanceFilter >= 0) ? config.distanceFilter : 500,     // meters
        locationTimeout   = (config.locationTimeout >= 0) ? config.locationTimeout : 60,    // seconds
        desiredAccuracy   = (config.desiredAccuracy >= 0) ? config.desiredAccuracy : 100,   // meters
        debug             = config.debug || false,
        notificationTitle = config.notificationTitle || "Background tracking",
        notificationText  = config.notificationText || "ENABLED",
        activityType      = config.activityType || "OTHER";

    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'configure',
      [params, headers, url, stationaryRadius, distanceFilter, locationTimeout, desiredAccuracy, debug, notificationTitle, notificationText, activityType]
    );
  },

  start: function(success, failure, config) {
    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'start',
      []
    );
  },

  stop: function(success, failure, config) {
    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'stop',
      []
    );
  },

  finish: function(success, failure) {
    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'finish',
      []
    );
  },

  changePace: function(isMoving, success, failure) {
    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'onPaceChange',
      [isMoving]
    );
  },

/**
* @param {Integer} stationaryRadius
* @param {Integer} desiredAccuracy
* @param {Integer} distanceFilter
* @param {Integer} timeout
*/
  setConfig: function(success, failure, config) {
    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'setConfig',
      [config]
    );
  },

/**
* Returns current stationaryLocation if available.  null if not
*/
  getStationaryLocation: function(success, failure) {
    exec(
      success || function() {},
      failure || function() {},
      'BackgroundGeoLocation',
      'getStationaryLocation',
      []
    );
  }
};

});
