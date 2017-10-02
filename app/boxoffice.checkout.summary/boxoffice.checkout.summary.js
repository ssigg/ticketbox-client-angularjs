'use strict';

angular.module('ticketbox.boxoffice.checkout.summary', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/summary/checkout/:uniqueId', {
            controller: 'BoxofficeCheckoutSummaryCtrl',
            templateUrl: 'boxoffice.checkout.summary/boxoffice.checkout.summary.html'
        });
    })

    .controller('BoxofficeCheckoutSummaryCtrl', function($scope, $location, $routeParams, BoxofficePurchase, api, currency, boxoffice) {
        $scope.boxofficePurchase = BoxofficePurchase.get({ 'unique_id': $routeParams.uniqueId });
        $scope.currency = currency;
        $scope.boxoffice = boxoffice;
        $scope.api = api;
        $scope.uniqueId = $routeParams.uniqueId;
    })
    
    .filter('padWithZeros', function() {
        return function(number, digits) {
            if(number === undefined) {
                return '';
            }
            if(number.length >= digits) {
                return number;
            }
            var zeros = '0'.repeat(digits);
            return (zeros + number).slice(-1 * digits);
        };
    });