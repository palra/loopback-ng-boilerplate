describe('AppCtrl', function() {
  describe('isCurrentUrl', function() {
    var AppCtrl,
        $location,
        $scope
    ;

    beforeEach(module('ngBoilerplate'));

    beforeEach(inject(function($controller, _$location_, $rootScope) {
      $location = _$location_;
      $scope = $rootScope.$new();
      AppCtrl = $controller('AppCtrl', { $location: $location, $scope: $scope });
    }));

    it('should have a right title format', inject(function() {
      expect($scope.pageTitle).toMatch(/ngBoilerplate/);
    }));
  });
  
  describe('$rootScope.loading', function() {
    
  });
  
});
