'use strict';

angular.module('ticketbox.customer.basket', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.components.reserver',
    'ticketbox.customer.toolbar',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/basket', {
            controller: 'BasketCtrl',
            templateUrl: 'customer.basket/customer.basket.html'
        });
    })

    .controller('BasketCtrl', function($scope, $rootScope, $location, $timeout, $translate, Reservation, ReservationsExpirationTimestamp, basket, reserver, currency) {
        $scope.reservations = basket.getReservations();
        $scope.currency = currency;

        $scope.expirationTimestamp = ReservationsExpirationTimestamp.query(function() {
            if ($scope.expirationTimestamp.value === null) {
                _close();
            }

            var epsilon = 1000;
            var expirationDurationInMs = ($scope.expirationTimestamp.value * 1000) - Date.now() + epsilon;
            if (expirationDurationInMs < 0) {
                _close();
            } else {
                $timeout(_close, expirationDurationInMs);
            }
        });

        $scope.toggleReduction = function(reservation) {
            var newReductionValue = !reservation.isReduced;
            Reservation.update({ 'id': reservation.id }, { 'isReduced': newReductionValue  })
                .$promise.then(function(data) {
                    reservation.isReduced = newReductionValue;
                    reservation.price = data.price;
                });
        };

        $scope.release = function(reservation) {
            var isLastReservation = $scope.reservations.length === 1;
            reserver.releaseReservation(reservation);
            if (isLastReservation) {
                $location.path('/');
            }
        };

        function _close() {
            basket.refreshReservations();
            $location.path('/');
        }
    });