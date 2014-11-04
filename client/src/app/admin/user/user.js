angular.module( 'ngBoilerplate.admin.user', [
  'ui.router',
  'ui.utils',
  'ui.bootstrap',
  'ui.grid'
])

.config( function adminUserConfig ( $stateProvider, $urlRouterProvider ) {
  $stateProvider.state('admin.user', {
    url: '/user', // Implicit /admin before
    views: {
      "admin": {
        controller: 'AdminUserTabCtrl',
        templateUrl: 'admin/user/user.tpl.html'
      }
    },
    data:{ pageTitle: 'User administration' }
  });
  
  $stateProvider.state('admin.user.create', {
    url: '/create', // Implicit /admin/user before
    views: {
      "admin.user": {
        controller: 'AdminUserCreateCtrl',
        templateUrl: 'admin/user/create.tpl.html'
      }
    },
    data:{ pageTitle: 'Create new user' }
  });
  
  $stateProvider.state('admin.user.list', {
    url: '/list', // Implicit /admin/user before
    views: {
      "admin.user": {
        controller: 'AdminUserListCtrl',
        templateUrl: 'admin/user/list.tpl.html'
      }
    },
    data:{ pageTitle: 'Create new user' }
  });
})

.run( function run () {
})

.controller('AdminUserTabCtrl', function AdminTabCtrl (
    $scope
  ){
    
})

.controller( 'AdminUserCreateCtrl', function UserCreateCtrl (
    $scope,
    $rootScope,
    $location,
    $http,
    $state,
    $timeout,
    User
  ){
  $scope.$watch('user', function() {
    $scope.error = false;
  }, true);
  
  $scope.user = {};
  $scope.create = function() {
    $scope.user.rememberMe = false;
    User.create($scope.user, function createSuccess(result) {
      $scope.success = true;
      $scope.error = false;
      delete $scope.errorData;
      $timeout(function() {
          $scope.success = false;
      }, 5000);
    }, function createError(res) {
      $scope.error = true;
      $scope.errorData = res.data.error;
    });
  };
})

.controller( 'AdminUserListCtrl', function UserCreateCtrl (
    $scope,
    $rootScope,
    $location,
    $http,
    $state,
    $timeout,
    User
  ){
  $scope.gridOptions = {
    enableSorting: true
  };
  $scope.gridOptions.data = User.find();
})


;