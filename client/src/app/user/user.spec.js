describe('User Management', function() {
    
  var UserLoginCtrl,
      UserLogoutCtrl,
      $location,
      $scope,
      $rootScope,
      $controller,
      $httpBackend,
      httpProvider,
      models = {}
  ;
  
  var fakeToken = 'FakeAccessToken';
  var fakeUser = {
    email: 'palra@palra.fr',
    id: 42
  };
  
  var login = function(scope) {
    UserLoginCtrl = $controller('UserLoginCtrl', { $location: $location, $scope: scope });
    scope.user = {username: 'palra', password: 'palra'};
    scope.login();
  };
  
  var logout = function(scope) {
    UserLogoutCtrl = $controller('UserLogoutCtrl', { $location: $location, $scope: scope });
    scope.logout();
  };
  
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
        user: fakeUser,
        userId: fakeUser.id
      });
  }));

  it('should login an user', inject(function() {
    $httpBackend
      .expectPOST(/\/api\/Users\/login/)
    ;
    
    login($scope);
    
    $httpBackend.flush();
    
    expect($rootScope.loggedIn).toBe(true);
    expect($rootScope.user).toEqual(fakeUser);
  }));
  
  it('should logout an user', inject(function() {
    login($rootScope.$new());
    
    $httpBackend
      .expectPOST(/\/api\/Users\/logout/)
      .respond(204, null)  
    ;
      
    logout($scope);
    
    $httpBackend.flush();
      $rootScope.user = {};
    
    expect($rootScope.loggedIn).toBe(false);
    expect($rootScope.user).toEqual({});
  }));
});