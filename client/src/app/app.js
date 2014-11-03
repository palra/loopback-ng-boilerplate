angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.user',
  'ngBoilerplate.home',
  'ui.router',
  'angular-loading-bar',
  'lbServices'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, cfpLoadingBarProvider ) {
  $urlRouterProvider.otherwise('/home');
  cfpLoadingBarProvider.includeSpinner = false;
})

.run( function run ($rootScope) {
  $rootScope.loggedIn = false;
  $rootScope.user = {};
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, LoopBackAuth ) {
  $scope.pageTitle = 'ngBoilerplate';
  $scope.$rootScope = $rootScope;
  
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;

