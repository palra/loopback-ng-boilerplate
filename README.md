Loopback & ng-boilerplate
=========================
[LoopBack](http://loopback.io) and [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/), together.

## Quick start

```
sudo npm install -g strongloop grunt-cli karma bower

git clone https://github.com/palra/loopback-ng-boilerplate.git
cd loopback-ng-boilerplate
npm install
cd client
npm install
bower install

```

Then, in two different terminals :

```
slc run      # In the root directory
grunt watch  # In the `client` directory

```

## TODO

* Admin
  * Add list of users
  * Add access control, roles, etc ... management
* Common
  * Use server validation messages in the AngularJS forms
