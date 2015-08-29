(function() {

  angular
    .module('app.services', [])
    .factory('BeerService', BeerService)
    .factory('BeerFormService', BeerFormService)
    .factory('ScaleService', ScaleService)
    .factory('MediaService', MediaService);

  function BeerService() {
    var beers = {};

    beers.getBeers = function() {
      return [
        "Craft/Malt Beer",
        "Standard Ale",
        "Amber Lager",
        "Dark Lager",
        "Cider",
        "Pale Lager",
        "Light ALe",
        "Light Beer"
      ]
    }

    return beers;
  }

  function BeerFormService($interval, $timeout, $http) {
    model = {
      beer: "",
      container: "bottle",
      containerSize: "12oz",
      servingTemp: null,
      currentTemp: "--",
      push: true,
      alarm: true
    }

    getUpdates($timeout, $http);

    function getUpdates($timeout, $http) {
      $http.jsonp("http://bartender.mybluemix.net/beer/1?callback=JSON_CALLBACK").then(function(response) {
        model.currentTemp = response.data.temperature.toFixed(1);
        $timeout(function() {
          getUpdates($timeout, $http);
        }, 2000);
      });
    }

    return model;
  }

  function ScaleService() {
    return {
      calculate: calculate
    };

    function calculate(deg) {
      return (400 / 60) * (80 - deg);
    }

  }

  function MediaService($q, $ionicPlatform, $window) {
    var service = {
      loadMedia: loadMedia,
      getStatusMessage: getStatusMessage,
      getErrorMessage: getErrorMessage
    };

    function loadMedia(src, onError, onStatus, onStop) {
      var defer = $q.defer();
      $ionicPlatform.ready(function() {
        var mediaSuccess = function() {
          if (onStop) {
            onStop();
          }
        };
        var mediaError = function(err) {
          _logError(src, err);
          if (onError) {
            onError(err);
          }
        };
        var mediaStatus = function(status) {
          if (onStatus) {
            onStatus(status);
          }
        };

        if ($ionicPlatform.is('android')) {
          src = '/android_asset/www/' + src;
        }
        defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
      });
      return defer.promise;
    }

    function _logError(src, err) {
      console.error('media error', {
        code: err.code,
        message: getErrorMessage(err.code)
      });
    }

    function getStatusMessage(status) {
      if (status === 0) {
        return 'Media.MEDIA_NONE';
      } else if (status === 1) {
        return 'Media.MEDIA_STARTING';
      } else if (status === 2) {
        return 'Media.MEDIA_RUNNING';
      } else if (status === 3) {
        return 'Media.MEDIA_PAUSED';
      } else if (status === 4) {
        return 'Media.MEDIA_STOPPED';
      } else {
        return 'Unknown status <' + status + '>';
      }
    }

    function getErrorMessage(code) {
      if (code === 1) {
        return 'MediaError.MEDIA_ERR_ABORTED';
      } else if (code === 2) {
        return 'MediaError.MEDIA_ERR_NETWORK';
      } else if (code === 3) {
        return 'MediaError.MEDIA_ERR_DECODE';
      } else if (code === 4) {
        return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';
      } else {
        return 'Unknown code <' + code + '>';
      }
    }

    return service;
  }

})();