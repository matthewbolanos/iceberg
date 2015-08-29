(function() {

  angular.module('starter', ['ionic', 'app.controllers'])
    .run(AppRun)
    .config(AppConfig);

  function AppRun($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

  function AppConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/list.html',
      controller: 'ListController'
    })
    .state('beerReview', {
      url: '/beerReview',
      templateUrl: 'templates/beerReview.html',
      controller: 'BeerReviewController'
    })
    $urlRouterProvider.otherwise('/')
  }

})();