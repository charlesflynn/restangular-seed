'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

  controller('ListCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
    $scope.projects = Restangular.all("projects").getList();
  }]).

  controller('CreateCtrl', ['$scope', '$location', 'Restangular', function ($scope, $location, Restangular) {
    $scope.save = function() {
      Restangular.all('projects').post($scope.project).then(function(project) {
        $location.path('/list');
      });
    }
  }]).

  controller('EditCtrl', ['$scope', '$location', 'Restangular', 'project', function ($scope, $location, Restangular, project) {
    var original = project;
    $scope.project = Restangular.copy(original);
    

    $scope.isClean = function() {
      return angular.equals(original, $scope.project);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/list');
      });
    };

    $scope.save = function() {
      $scope.project.put().then(function() {
        $location.path('/');
      });
    };
  }]);
