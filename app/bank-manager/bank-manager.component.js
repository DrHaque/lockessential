'use strict';

angular.module('myApp.bankManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bank', {
    templateUrl: 'bank-manager/bank-manager.html',
    controller: 'BankManagerCtrl'
  });
}])

.controller('BankManagerCtrl', [function() {

}]);