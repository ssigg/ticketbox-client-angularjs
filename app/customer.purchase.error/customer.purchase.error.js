'use strict';

angular.module('ticketbox.customer.purchase.error', [
    'ngRoute',
    'pascalprecht.translate'])

    .config(function($routeProvider) {
        $routeProvider.when('/error/:type', {
            controller: 'ErrorCtrl',
            templateUrl: 'customer.purchase.error/customer.purchase.error.html'
        });
    })

    .controller('ErrorCtrl', function($scope, $routeParams) {
        $scope.type = $routeParams.type;
    });