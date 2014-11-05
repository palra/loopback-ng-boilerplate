var debug = require('debug')('boot:create-model-instances');

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create([
    {username: 'palra', email: 'palra@palra.com', password: 'palra'},
    {username: 'alice', email: 'alice@alice.com', password: 'alice'},
    {username: 'bob', email: 'bob@bob.com', password: 'bob'}
  ], function(err, users) {
    if (err) return debug('%j', err);
    debug(users);
    
    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return debug(err);
      debug(role);
      //make palra an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) return debug(err);
        debug(principal);
      });
    });
    
    //create the moderator role
    Role.create({
      name: 'moderator'
    }, function(err, role) {
      if (err) return debug(err);
      debug(role);
      //make alice a moderator
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal) {
        if (err) return debug(err);
        debug(principal);
      });
    });
  });
};