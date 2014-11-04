describe('Admin', function() {
  var $location,
      $scope,
      $rootScope,
      $controller,
      $httpBackend,
      httpProvider,
      models = {}
  ;
  
  beforeEach(module('ngBoilerplate', function($httpProvider) {
    httpProvider = $httpProvider;
  }));

  beforeEach(inject(function(_$controller_, _$location_, _$rootScope_, _$httpBackend_) {
    $location = _$location_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

});