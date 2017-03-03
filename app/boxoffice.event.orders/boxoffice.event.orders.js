'use strict';

angular.module('ticketbox.boxoffice.event.orders', [
    'ngRoute',
    'ticketbox.config',
    'ticketbox.components.api',
    'ticketbox.common.toolbar',
    'ticketbox.components.price'])

    .config(function($routeProvider) {
        $routeProvider.when('/event/orders/:eventId', {
            controller: 'EventOrdersCtrl',
            templateUrl: 'boxoffice.event.orders/boxoffice.event.orders.html'
        });
    })

    .controller('EventOrdersCtrl', function($scope, $routeParams, Order, $location, currency, administrator) {
        $scope.administrator = administrator;
        $scope.currency = currency;
        
        $scope.orders = Order.query({ 'event_id': $routeParams.eventId });
    });