angular.module( 'ngBoilerplate.user', [
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $stateProvider.state('login', {
    url: '/login',
    views: {
      "main": {
        controller: 'UserLoginCtrl',
        templateUrl: 'user/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.run( function run () {
})

.controller( 'UserLoginCtrl', function UserLoginCtrl (
    $scope,
    $rootScope,
    $location,
    $http,
    User
  ){
  $scope.$watch('user', function() {
    $scope.error = false;
  }, true);
  
  $scope.user = {};
  $scope.login = function() {
    User.login($scope.user, function loginSuccess(result) {
      $rootScope.loggedIn = true;
      $rootScope.$broadcast('authentication:token', result.id);
      $http.defaults.headers.common.Authorization = result.id;
    }, function loginError() {
      $scope.error = true;
    });
  };
})

;