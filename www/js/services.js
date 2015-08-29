(function() {

  angular
    .module('app.services', [])
    .factory('BeerService', BeerService)
    .factory('BeerFormService', BeerFormService);

  function BeerService() {
    var beers = {};

    beers.getBeers = function() {
      return [
        "Dale’s Pale Ale",
        "Breckenridge Vanilla Porter",
        "Brooklyn Brewery Lager",
        "Surly Brewing Darkness"
      ]
    }

    return beers;
  }

  function BeerFormService($interval, $timeout, $http) {
    model = {
      beer: "Surly Brewing Darkness",
      container: "",
      containerSize: "",
      servingTemp: 52,
      currentTemp: "--"
    }

    getUpdates($timeout, $http);

    function getUpdates($timeout, $http) {
      $http.jsonp("http://bartender.mybluemix.net/beer/1?callback=JSON_CALLBACK").then(function(response) {
        model.currentTemp = response.data.temperature.toFixed(1);
        $timeout(function() {
          getUpdates($timeout, $http);
        }, 5000);
      });
    }

    return model;
  }

})();