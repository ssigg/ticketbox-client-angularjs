'use strict';

angular.module('ticketbox.customer.purchase.summary', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/summary/:uniqueId', {
            controller: 'CustomerPurchaseSummaryCtrl',
            templateUrl: 'customer.purchase.summary/customer.purchase.summary.html'
        });
    })

    .controller('CustomerPurchaseSummaryCtrl', function($scope, $routeParams, CustomerPurchase, currency, hostName) {
        $scope.customerPurchase = CustomerPurchase.get({ 'unique_id': $routeParams.uniqueId });
        $scope.currency = currency;
        $scope.hostName = hostName;
    })
    
    .filter('translationValues', function() {
        return function(customerPurchase) {
            if (customerPurchase === undefined) {
                return { };
            }
            return {
                firstname: customerPurchase.firstname,
                lastname: customerPurchase.lastname,
                email: customerPurchase.email
            };
        }
    });