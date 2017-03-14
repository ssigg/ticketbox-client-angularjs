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

    .controller('BoxofficeCheckoutSummaryCtrl', function($scope, $routeParams, BoxofficePurchase, currency, boxoffice) {
        $scope.boxofficePurchase = BoxofficePurchase.get({ 'unique_id': $routeParams.uniqueId });
        $scope.currency = currency;
        $scope.boxoffice = boxoffice;
    });