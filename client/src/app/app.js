angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.admin',
  'ngBoilerplate.user',
  'ngBoilerplate.home',
  'ui.router',
  'angular-loading-bar',
  'lbServices'
])

.factory('authHttpResponseInterceptor', function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
})

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $httpProvider ) {
  $urlRouterProvider.otherwise('/home');
  $httpProvider.interceptors.push('authHttpResponseInterceptor');
  cfpLoadingBarProvider.includeSpinner = false;
})

.run( function run ($rootScope, User) {
  $rootScope.user = {};
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, LoopBackAuth, User ) {
  $scope.pageTitle = 'ngBoilerplate';
  window.User = User;
  $scope.loggedIn = function() {
    return User.isAuthenticated();
  };
  $scope.user = function() {
    return User.getCachedCurrent();
  };
  
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;

