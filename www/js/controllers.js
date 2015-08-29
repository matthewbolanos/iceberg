(function() {

  angular
    .module('app.controllers', [])
    .controller('ListController', ListController)
    .controller("BeerReviewController", BeerReviewController);


  function BeerReviewController() {
    var vm = this;
  }

  function ListController() {

  }

  window.AnimationController = AnimationController;

  // Just testing out some animation stuffs
  function AnimationController() {
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
      name: "Mike",
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