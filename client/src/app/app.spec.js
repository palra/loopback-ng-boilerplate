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
  
  describe('Access control', function() {
    var UserLoginCtrl,
        $location,
        $scope,
        $rootScope,
        $controller,
        $httpBackend,
        httpProvider,
        models = {}
    ;
    
    var fakeToken = 'FakeAccessToken';
    
    beforeEach(module('ngBoilerplate', function($httpProvider) {
      httpProvider = $httpProvider;
    }));

    beforeEach(inject(function(_$controller_, _$location_, _$rootScope_, _$httpBackend_, User) {
      $location = _$location_;
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      models.User = User;
      
      
      $httpBackend
        .whenPOST(/\/api\/Users\/login/)
        .respond({
          id: fakeToken,
          ttl: 1209600,
          created: '2013-12-20T21:10:20.377Z',
          userId: 42
        });
    }));

    it('should login an user', inject(function() {
      
      $httpBackend
        .expectPOST(/\/api\/Users\/login/)
      ;
      
      UserLoginCtrl = $controller('UserLoginCtrl', { $location: $location, $scope: $scope });
      $scope.login({username: 'palra', password: 'palra'});
      
      $httpBackend.flush();
      
      expect($rootScope.loggedIn).toBe(true);
      expect(
        httpProvider.defaults.headers.common.Authorization
      ).toBe('Authorization: '+fakeToken);
    }));
    
  });
});
