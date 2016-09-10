var mod = angular.module('ideaboxApp', []);

mod.controller('ideaController', function($scope, $http, $filter) {
  // can use keyword 'this' for $scope object
  var ideaObject = this;


  // ~~~~~~~~~~~~~~~
  // FIELDS
  // ~~~~~~~~~~~~~~~
  ideaObject.syncing = false;
  ideaObject.ideas = [];


  // ~~~~~~~~~~~~~~~
  // METHODS
  // ~~~~~~~~~~~~~~~
  ideaObject.getIdea = function() {
    ideaObject.syncing = true;

    $http.get('/api/ideas?phonenumber='+ideaObject.phonenumber).success(function(response) {
      ideaObject.ideas = response;
      ideaObject.syncing = false;
    });
  };


  ideaObject.addIdea = function() {
    var data = {
      text: ideaObject.ideaText,
      phonenumber: ideaObject.phonenumber,
      done: false
    };

    $http.post('/api/ideas', data).success(function(response) {
      ideaObject.ideas.push(response);
      ideaObject.ideaText = '';
    });
  };
