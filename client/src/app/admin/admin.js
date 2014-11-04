angular.module( 'ngBoilerplate.admin', [
  'ngBoilerplate.admin.user',
  'ui.router'
])

.config( function adminConfig ( $stateProvider, $urlRouterProvider ) {
  $stateProvider.state('admin', {
    url: '/admin',
    views: {
      "main": {
        controller: 'AdminTabCtrl',
        templateUrl: 'admin/admin.tpl.html'
      }
    },
    data:{ pageTitle: 'Administration' }
  });
})

.run( function run () {
})

.controller('AdminTabCtrl', function AdminTabCtrl (
    $scope
  ){
    
})


;