(function() {

  angular
    .module('app.controllers', [])
    .controller('ListController', ListController)
    .controller("AnimationController", AnimationController);

  function ListController() {

  }

  function AnimationController() {
    var vm = this;
    vm.name = "Mike";
    alert("Cool")
  }

})();