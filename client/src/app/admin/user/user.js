angular.module( 'ngBoilerplate.admin.user', [
  'ui.router',
  'ui.utils',
  'ui.bootstrap',
  'ui.grid',
  'templates-common'
])

.config( function adminUserConfig ( $stateProvider, $urlRouterProvider ) {
  $stateProvider.state('admin.user', {
    url: '/user', // Implicit /admin before
    views: {
      'admin': {
        controller: 'AdminUserTabCtrl',
        templateUrl: 'admin/user/user.tpl.html'
      }
    },
    data:{ pageTitle: 'User administration' }
  });
  
  $stateProvider.state('admin.user.create', {
    url: '/create', // Implicit /admin/user before
    views: {
      'admin.user': {
        controller: 'AdminUserCreateCtrl',
        templateUrl: 'admin/user/create.tpl.html'
      }
    },
    data:{ pageTitle: 'Create new user' }
  });
  
  $stateProvider.state('admin.user.list', {
    url: '/list', // Implicit /admin/user before
    views: {
      'admin.user': {
        controller: 'AdminUserListCtrl',
        templateUrl: 'admin/user/list.tpl.html'
      }
    },
    data:{ pageTitle: 'Create new user' }
  });
  
  $stateProvider.state('admin.user.profile', {
    url: '/{id:[0-9]+}', // Implicit /admin/user before
    views: {
      'admin.user': {
        controller: 'AdminUserProfileCtrl',
        templateUrl: 'admin/user/profile.tpl.html'
      }
    },
    data:{ pageTitle: 'User profile' }
  });
})

.run( function run () {
})

.controller('AdminUserTabCtrl', function AdminTabCtrl (
    $scope
  ){
    
})

.controller( 'AdminUserCreateCtrl', function AdminUserCreateCtrl (
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

.controller( 'AdminUserListCtrl', function AdminUserListCtrl (
    $scope,
    $rootScope,
    $location,
    $http,
    $state,
    $timeout,
    $modal,
    User
  ){
  $scope.gridOptions = {
    data: User.find(),
    enableSorting: true,
    enableFiltering: true,
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    multiSelect: false,
    modifierKeysToMultiSelect: false,
    noUnselect: true,
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      {
        field: 'id',
        name: '#',
        width: 75
      },
      {
        field: 'username'
      },
      {
        field: 'email'
      },
      {
        name: 'Operations',
        enableSorting: false,
        enableFiltering: false,
        cellTemplate: 'ui-grid/uiGridCellRD.tpl.html',
        width: 115
      }
    ]
  };
  
  $scope.crudActions = {
    view: function(row) {
      var user = row.entity;
      $state.go('admin.user.profile', {
        id: user.id
      });
    },
    remove: function(row) {
      var user = row.entity;
      $modal.open({
        templateUrl: 'admin/user/removeModal.tpl.html',
        controller: 'AdminUserRemoveCtrl',
        resolve: {
          user: function() {
            return user;
          },
          onSuccess: function() {
            return function() {
              $scope.gridOptions.data = User.find();
            };
          },
          onError: function() {
            return function() {
              // TODO
            };
          }
        }
      });
    }
  };
})

.controller( 'AdminUserProfileCtrl', function AdminUserProfileCtrl (
    $scope,
    $rootScope,
    $location,
    $http,
    $state,
    $stateParams,
    $timeout,
    User
  ){
  $scope.user = User.findById({id: $stateParams.id}, function profileSuccess(data) {
    // ...
  }, function profileError() {
      $state.go('admin.user.list');
  });
})

.controller('AdminUserRemoveCtrl', function AdminUserRemoveCtrl(
    $scope,
    $state,
    $modalInstance,
    User,
    user,
    onSuccess,
    onError
  ){
  $scope.close = $modalInstance.close;
  $scope.remove = function() {
    return User.deleteById({
      id: user.id
    }, function deleteSuccess() {
      $scope.close();
      (onSuccess || angular.noop).apply(this, arguments);
    }, function deleteError(){
      $scope.close();
      (onError || angular.noop).apply(this, arguments);
    });
  };
})

;