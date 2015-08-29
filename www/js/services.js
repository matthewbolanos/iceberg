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

  function BeerFormService() {
    model = {
      beer: "Surly Brewing Darkness",
      container: "",
      containerSize: "",
      servingTemp: 52,
      currentTemp: null
    }
    return model;
  }

})();