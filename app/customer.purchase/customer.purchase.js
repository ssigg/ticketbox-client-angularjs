'use strict';

angular.module('ticketbox.customer.purchase', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.api',
    'ticketbox.components.reserver',
    'ticketbox.common.toolbar',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/purchase', {
            controller: 'PurchaseCtrl',
            templateUrl: 'customer.purchase/customer.purchase.html'
        });
    })

    .controller('PurchaseCtrl', function($scope, $location, $timeout, $translate, Reservation, ReservationsExpirationTimestamp, Token, CustomerPurchase, basket, reserver, currency) {
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

        var token = Token.query(function() {
            braintree.setup(token.value, 'dropin', {
                container: 'dropin-container',
                onPaymentMethodReceived: function (data) {
                    var purchaseData = {
                        nonce: data.nonce,
                        title: $scope.data.title,
                        firstname: $scope.data.firstname,
                        lastname: $scope.data.lastname,
                        email: $scope.data.email,
                        locale: $translate.use()
                    };
                    CustomerPurchase.save(purchaseData)
                        .$promise.then(_success, _failure);
                }
            });
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

        function _success(response) {
            basket.refreshReservations();
            $location.path('/summary/purchase/' + response.unique_id);
        }

        function _failure(response) {
            // TODO: push error to logging endpoint and inform user about failure
        }

        function _close() {
            basket.refreshReservations();
            $location.path('/');
        }
    });