angular.module( 'ngBoilerplate.user', [
  'ui.router'
])

.config( function userConfig ( $stateProvider, $urlRouterProvider ) {
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

.value('LOGIN_REDIRECT', 'home')
.value('LOGOUT_REDIRECT', 'home')

.controller( 'UserLoginCtrl', function UserLoginCtrl (
    $scope,
    $rootScope,
    $location,
    $http,
    $state,
    User,
    LOGIN_REDIRECT
  ){
  $scope.$watch('user', function() {
    $scope.error = false;
  }, true);
  
  $scope.user = {};
  $scope.login = function() {
    User.login($scope.user, function loginSuccess(result) {
      $rootScope.user = result.user;
      User.getCurrent();
      $state.go(LOGIN_REDIRECT);
    }, function loginError() {
      $scope.error = true;
    });
  };
})

.controller('UserLogoutCtrl', function UserLogoutCtrl(
    $scope,
    $rootScope,
    $http,
    $state,
    $timeout,
    User,
    LoopBackAuth,
    LOGOUT_REDIRECT
  ) {
  $scope.logout = function() {
    User.logout(function logoutSuccess() {
      LoopBackAuth.clearUser();
      $state.go(LOGOUT_REDIRECT);
    }, function logoutError() {
      $scope.error = true;
      $timeout(function() {
        $scope.error = false;
      }, 3000);
    });
  };
})

;