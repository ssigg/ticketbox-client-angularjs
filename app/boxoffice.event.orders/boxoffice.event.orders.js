'use strict';

angular.module('ticketbox.boxoffice.event.orders', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.config',
    'ticketbox.components.api',
    'ticketbox.boxoffice.toolbar',
    'ticketbox.components.price'])

    .config(function($routeProvider) {
        $routeProvider.when('/event/orders/:eventId', {
            controller: 'EventOrdersCtrl',
            templateUrl: 'boxoffice.event.orders/boxoffice.event.orders.html'
        });
    })

    .controller('EventOrdersCtrl', function($rootScope, $scope, $routeParams, $location, $translate, Order, Log, OrderUpgrade, currency, boxoffice, administrator) {
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

            $translate('PROCESSING PURCHASE...').then(function (processingPurchaseMessage) {
                $rootScope.$broadcast('loading:progress', processingPurchaseMessage);
            }, function (translationId) {
                $rootScope.$broadcast('loading:progress', translationId);
            });
            OrderUpgrade.update({ 'id': order.id }, data)
                .$promise.then(_success, function(response) { _failure(response, $scope.data); });
        };

        function _success(response) {
            $rootScope.$broadcast('loading:finish');
            $location.path('/summary/checkout/' + response.unique_id);
        }

        function _failure(response, data) {
            $rootScope.$broadcast('loading:finish');
            var logEntry = {
                severity: 'error',
                message: angular.toJson(response),
                userData: data
            };
            Log.save(logEntry);
        }
    });