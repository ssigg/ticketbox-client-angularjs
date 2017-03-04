'use strict';

angular.module('ticketbox.boxoffice.event.orders', [
    'ngRoute',
    'pascalprecht.translate',
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

    .controller('EventOrdersCtrl', function($scope, $routeParams, $translate, Order, OrderUpgrade, currency, boxoffice, administrator) {
        $scope.administrator = administrator;
        $scope.currency = currency;
        
        $scope.orders = Order.query({ 'event_id': $routeParams.eventId });

        $scope.selectedOrder = undefined;
        $scope.toggleOrderSelection = function(order) {
            if ($scope.selectedOrder !== order) {
                $scope.selectedOrder = order;
            } else if ($scope.selectedOrder === order) {
                $scope.selectedOrder = undefined;
            }
        };

        $scope.sell = function(order) {
            var data = {
                locale: $translate.use(),
                boxofficeName: boxoffice.name,
                boxofficeType: boxoffice.type
            };
            OrderUpgrade.update({ 'id': order.id }, data)
                .$promise.then(function() {
                    $scope.orders = Order.query({ 'event_id': $routeParams.eventId });
                });
        };
    });