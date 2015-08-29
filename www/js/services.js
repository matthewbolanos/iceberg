(function() {

  angular
    .module('app.services', [])
    .factory('BeerService', BeerService)
    .factory('BeerFormService', BeerFormService);

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

  function BeerFormService() {
    model = {
      beer: "",
      container: "bottle",
      containerSize: "12oz",
      servingTemp: 52,
      currentTemp: null,
      push: true,
      alarm: true
    }
    return model;
  }

})();