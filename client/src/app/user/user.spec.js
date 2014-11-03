describe('User Management', function() {
    
  describe('UserLoginCtrl', function() {
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
      $scope.user = {username: 'palra', password: 'palra'};
      $scope.login();
      
      $httpBackend.flush();
      
      expect($rootScope.loggedIn).toBe(true);
      expect(
        httpProvider.defaults.headers.common.Authorization
      ).toBe(fakeToken);
    }));
    
  });
  
  
});