'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['restangular', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', { 
        controller: 'ListCtrl', 
        templateUrl: 'partials/list.html'
      });
      $routeProvider.when('/edit/:projectId', {
        controller: 'EditCtrl', 
        templateUrl: 'partials/detail.html',
        resolve: {
          project: function(Restangular, $route){
            return Restangular.one('projects', $route.current.params.projectId).get();
          }
        }
      });
      $routeProvider.when('/new', {
        controller: 'CreateCtrl',
        templateUrl: 'partials/detail.html'
      });
      $routeProvider.otherwise({redirectTo:'/'});
  }]).
  config(['RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
      RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
      RestangularProvider.setRestangularFields({
        id: '_id.$oid'
      });
      
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });
  }]);
