(function() {

  angular
    .module('app.controllers', ['app.services','ngAnimate'])
    .controller('FormController', FormController)
    .controller("BeerStatusController", BeerStatusController)
    .controller("BeerAnimationsController", BeerAnimationsController);

  function BeerStatusController($scope, $state, BeerFormService, $ionicPopup, MediaService, ScaleService) {
    var vm = this;
    vm.model = BeerFormService;
    vm.scaleService = ScaleService;

    console.log(BeerFormService.servingTemp);

    if (!BeerFormService.servingTemp) {
      $state.go('home');
    }

    // An alert dialog
    $scope.showWarningAlert = function() {
      var alertPopup = $ionicPopup.alert({
        template: 'Your beer is in the<br/><strong>danger zone!</strong><br/>Retrieve it soon.',
        buttons: [
          { text: 'Oh no!' },
        ]
      });
    };
    $scope.showReadyAlert1 = function() {
      var alertPopup = $ionicPopup.alert({
        template: 'It\s<br/><strong>beer</strong><br/>time!',
        buttons: [
          { text: 'Oh Yeah!' },
        ]
      });
    };
    $scope.showReadyAlert2 = function() {
      var alertPopup = $ionicPopup.alert({
        template: 'Your<br/><strong>beer</strong><br/>is ready!',
        buttons: [
          { text: 'Sweet!' },
        ]
      });
    };
  }

  function FormController($scope, $state, $ionicModal, BeerService, BeerFormService) {
    $scope.beers = BeerService.getBeers();

    $scope.model = BeerFormService;

    $scope.chill = function () {
      if (BeerFormService.servingTemp) {
        $state.go('beer-status');
      } else {
        return true;
      }
    };

    $scope.ready = function () {
      console.log(!!BeerFormService.servingTemp);
      return !!BeerFormService.servingTemp;
    };

    $ionicModal.fromTemplateUrl('templates/beer-selection.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.selectBeer = function(beer) {
      $scope.model.beer = beer;
      switch (beer) {
        case "Craft/Malt Beer":
          $scope.model.servingTemp = 52;
        break;
        case "Standard Ale":
        case "Amber Lager":
        case "Dark Lager":
        case "Cider":
          $scope.model.servingTemp = 46;
        break;
        case "Pale Lager":
        case "Light Ale":
          $scope.model.servingTemp = 41;
        break;
        case "Light Beer":
          $scope.model.servingTemp = 34;
        break;
      }

      $scope.modal.hide();
    }
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  }

  // Just testing out some animation stuffs
  function BeerAnimationsController($cordovaDeviceMotion) {
    var vm = this;
    var Sprite = {
      x: 0,
      y: 0,
      degree: 0,
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0
    }
    var Beer = {
      amount: 100,
      flowSpeed: 1*1000,
      flowAmount: 10,
      isSpilling: false
    };
    var sprites = {
      glass: Object.create(Sprite),
      liquid: Object.create(Sprite),
      drops: Object.create(Sprite),
      mess: Object.create(Sprite),
      temp: Object.create(Sprite)
    };

    // Definition
    _.extend(vm, {
      selectedRange: 0,
      setupBeerSprites: setupBeerSprites,
      updateBeerAnimation: updateBeerAnimation,
      updateSprites: updateSprites
    });
    _init();

    function _init() {
      setupBeerSprites();
      if (navigator.accelerometer) {
        var watch = $cordovaDeviceMotion.watchAcceleration({
          frequency: 200
        });
        watch.then(
          null,
          function(error) {

          },
          function(result) {
            if (result.x < 8 && result.x > -8) {
              updateBeerAnimation(-result.x*1.8)
            }
        });
      }
    }

    function setupBeerSprites() {
      sprites.glass.width = 300;
      sprites.glass.height = 535;
      sprites.glass.offsetX = -90;
      sprites.liquid.width = 150;
      sprites.liquid.height = 236;
      sprites.liquid.offsetY = 515-sprites.liquid.height;
      sprites.liquid.offsetX = -20;
      sprites.drops.width = 37;
      sprites.drops.height = 48;
      sprites.drops.y = 190;
      sprites.drops.x = 40;
      sprites.temp.height = 100;
      sprites.temp.width = 100;
      sprites.temp.offsetX = 9;
      sprites.temp.offsetY = 330;
      sprites.temp.y = 0;
      sprites.temp.x = 0;
      updateSprites(true);
    }

    window.updateBeerAnimation = updateBeerAnimation;

    function updateBeerAnimation(degree) {
      sprites.drops.degree = degree;
      sprites.liquid.degree = -degree;
      //sprites.temp.degree = degree;
      //sprites.temp.x = -degree*1.3;
      updateSprites();
    }

    function updateSprites(noTimer) {
      if (noTimer) {
        updateSpriteCSS();
      }
      setTimeout(function() {
        updateSpriteCSS();
      }, 5);
    }

    function updateSpriteCSS() {
      _.each(sprites, function(sprite, name) {
        $("." + name).css({
          WebkitTransform: 'rotate(' + sprite.degree + 'deg)',
          transform: 'rotate(' + sprite.degree + 'deg)',
          left: (sprite.offsetX + sprite.x).toString() + "px",
          top: (sprite.offsetY + sprite.y).toString() + "px",
          width: sprite.width.toString() + "px",
          height: sprite.height.toString() + "px",
        });
      });
    }

  }

})();