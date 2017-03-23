'use strict';

angular.module('ticketbox.boxoffice.checkout', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.components.reserver',
    'ticketbox.common.toolbar',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/checkout', {
            controller: 'CheckoutCtrl',
            templateUrl: 'boxoffice.checkout/boxoffice.checkout.html'
        });
    })

    .controller('CheckoutCtrl', function($scope, $rootScope, $timeout, $location, $translate, Reservation, BoxofficePurchase, ReservationsExpirationTimestamp, Log, basket, reserver, currency, boxoffice) {
        $scope.reservations = basket.getReservations();
        $scope.currency = currency;
        $scope.boxoffice = boxoffice;

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
            reserver.releaseReservation(reservation);
        };

        $scope.createBoxofficePurchase = function(email) {
            var purchase = {
                locale: $translate.use(),
                boxofficeName: boxoffice.name,
                boxofficeType: boxoffice.type,
                email: email
            };
            $translate('PROCESSING PURCHASE...').then(function (processingPurchaseMessage) {
                $rootScope.$broadcast('loading:progress', processingPurchaseMessage);
            }, function (translationId) {
                $rootScope.$broadcast('loading:progress', translationId);
            });
            BoxofficePurchase.save(purchase)
                .$promise.then(_success, function(response) { _failure(response, $scope.data); });
        }

        function _success(response) {
            $rootScope.$broadcast('loading:finish');
            basket.refreshReservations();
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
            // TODO: inform user about failure and that the admin is informed.
        }

        function _cancel() {
            basket.refreshReservations();
            $location.path('/');
        }
    });