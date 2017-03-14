'use strict';

angular.module('ticketbox.customer.checkout.summary', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/summary/checkout/:uniqueId', {
            controller: 'CustomerCheckoutSummaryCtrl',
            templateUrl: 'customer.checkout.summary/customer.checkout.summary.html'
        });
    })

    .controller('CustomerCheckoutSummaryCtrl', function($scope, $routeParams, Order, currency, hostName) {
        $scope.order = Order.get({ 'unique_id': $routeParams.uniqueId });
        $scope.currency = currency;
        $scope.hostName = hostName;
    })
    
    .filter('translationValues', function() {
        return function(order) {
            if (order === undefined) {
                return { };
            }
            return {
                firstname: order.firstname,
                lastname: order.lastname,
                email: order.email
            };
        }
    });