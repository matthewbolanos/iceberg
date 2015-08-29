(function() {

  angular
    .module('app.controllers', ['app.services','ngAnimate'])
    .controller('FormController', FormController)
    .controller("BeerStatusController", BeerStatusController);

  function BeerStatusController($scope, BeerFormService, $ionicPopup, MediaService, ScaleService) {
    var vm = this;
    this.model = BeerFormService;

    vm.optimal = {
      'top': ScaleService.calculate(BeerFormService.servingTemp) + 'px'
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

  function FormController($scope, $ionicModal, BeerService, BeerFormService) {
    $scope.beers = BeerService.getBeers();

    $scope.model = BeerFormService;

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
  function Animations() {
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
      mess: Object.create(Sprite)
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
    }

    function setupBeerSprites() {
      sprites.glass.width = 119;
      sprites.glass.height = 515;
      sprites.liquid.width = 119;
      sprites.liquid.height = 236;
      sprites.liquid.offsetY = 515-sprites.liquid.height;
      sprites.drops.width = 47;
      sprites.drops.height = 58;
      sprites.drops.y = 180;
      sprites.drops.x = 35;
      updateSprites();
    }

    function updateBeerAnimation(degree) {
      sprites.glass.degree = degree;
      sprites.liquid.degree = degree;
      if (degree > 90) {
        if (degree < 126) {
          //var keyframes = 126-90;
          //var key = Math.round(((keyframes - (126-degree)) / keyframes) * 100);
          //sprites.liquid.x+= 0.001 * key;
          //sprites.liquid.y+= 0.01 * key;
        }
        if (degree > 126) {
          //var keyframes = 180-126;
          //sprites.liquid.x = (0/100) * key;
          //sprites.liquid.y = (105/100) * key;
        }
      }
      updateSprites();
    }

    function updateSprites() {
      _.each(sprites, function(sprite, name) {
        console.log(sprite.x);
        setTimeout(function() {
          $("." + name).css({
            WebkitTransform: 'rotate(' + sprite.degree + 'deg)',
            transform: 'rotate(' + sprite.degree + 'deg)',
            left: (sprite.offsetX + sprite.x).toString() + "px",
            top: (sprite.offsetY + sprite.y).toString() + "px",
            width: sprite.width.toString() + "px",
            height: sprite.height.toString() + "px",
          });
        }, 5);
      })
    }

    function beerSpilling(setSpillingFlag) {
      if (setSpillingFlag) {
        beer.isSpilling = true;
      }
      if (!isSpilling) {
        return false;
      }
      beer.amount-=beer.flowAmount;
      if (beer.amount <= 0) {
        beer.amount = 0;
      }
      setTimeout(beerSpilling, beer.flowSpeed);
    }

  }

})();