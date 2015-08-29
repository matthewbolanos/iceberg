(function() {

  angular.module('starter', ['ionic', 'app.controllers', 'app.services'])
    .run(AppRun)
    .config(AppConfig);

  function AppRun($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if(window.StatusBar) {
        StatusBar.styleLightContent();
      }
    });
  }

  function AppConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/form.html',
      controller: 'FormController'
    })
    .state('beer-status', {
      url: '/beer-status',
      templateUrl: 'templates/beer-status.html',
      controller: 'BeerStatusController'
    })
    $urlRouterProvider.otherwise('/')
  }

})();