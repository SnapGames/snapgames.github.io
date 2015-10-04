var app = angular.module('snapgames', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/articles.html',
      controller: 'HomeController'
    }).
    when('/download', {
      templateUrl: 'partials/download.html',
      controller: 'HomeController'
    }).
    when('/features/:page', {
      templateUrl: 'features/index.html',
      controller: 'HomeController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

app.controller('HomeController', ['$scope', function($scope) {
	
    }
]);