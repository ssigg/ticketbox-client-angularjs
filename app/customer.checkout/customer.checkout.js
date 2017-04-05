'use strict';

angular.module('ticketbox.customer.checkout', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.components.reserver',
    'ticketbox.common.toolbar',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/checkout', {
            controller: 'CheckoutCtrl',
            templateUrl: 'customer.checkout/customer.checkout.html'
        });
    })

    .controller('CheckoutCtrl', function($scope, $location, $timeout, $translate, Reservation, ReservationsExpirationTimestamp, Order, basket, reserver, currency) {
        $scope.reservations = basket.getReservations();
        $scope.currency = currency;

        $scope.expirationTimestamp = ReservationsExpirationTimestamp.query(function() {
            if ($scope.expirationTimestamp.value === null) {
                _cancel();
            }

            var epsilon = 1000;
            var expirationDurationInMs = ($scope.expirationTimestamp.value * 1000) - Date.now() + epsilon;
            if (expirationDurationInMs < 0) {
                _cancel();
            } else {
                $timeout(_cancel, expirationDurationInMs);
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

        $scope.createOrder = function(title, firstname, lastname, email) {
            var order = {
                title: title,
                firstname: firstname,
                lastname: lastname,
                email: email,
                locale: $translate.use()
            };
            Order.save(order)
                .$promise.then(_success, _failure);
        }

        function _success(response) {
            basket.refreshReservations();
            $location.path('/summary/checkout/' + response.unique_id);
        }

        function _failure(response) {
            // TODO: push error to logging endpoint and inform user about failure
        }

        function _cancel() {
            basket.refreshReservations();
            $location.path('/');
        }
    });