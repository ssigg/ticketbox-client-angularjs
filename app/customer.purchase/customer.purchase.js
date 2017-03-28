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

    .controller('PurchaseCtrl', function($scope, $rootScope, $location, $timeout, $translate, Reservation, ReservationsExpirationTimestamp, Token, CustomerPurchase, Log, basket, reserver, currency) {
        $scope.errorMessage = '';
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
                    $translate('PROCESSING PURCHASE...').then(function (processingPurchaseMessage) {
                        $rootScope.$broadcast('loading:progress', processingPurchaseMessage);
                    }, function (translationId) {
                        $rootScope.$broadcast('loading:progress', translationId);
                    });
                    CustomerPurchase.save(purchaseData)
                        .$promise.then(_success, function(response) { _failure(response, $scope.data); });
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
            var isLastReservation = $scope.reservations.length === 1;
            reserver.releaseReservation(reservation);
            if (isLastReservation) {
                $location.path('/');
            }
        };

        function _success(response) {
            $rootScope.$broadcast('loading:finish');
            basket.refreshReservations();
            $location.path('/summary/purchase/' + response.unique_id);
        }

        function _failure(response, data) {
            $rootScope.$broadcast('loading:finish');
            if (response.status === 400) {
                // Credit card error - customer has to handle that
                $translate('ERROR DURING PAYMENT - CREDIT CARD HAS NOT BEEN CHARCHED. PLEASE TRY AGAIN.').then(function (errorMessage) {
                    $scope.errorMessage = errorMessage;
                }, function (translationId) {
                    $scope.errorMessage = translationId;
                });
            } else {
                // This is the critical point - user paid, tickets are not sent.
                var logEntry = {
                    severity: 'error',
                    message: angular.toJson(response),
                    userData: data
                };
                Log.save(logEntry);
                $location.path('/error/c');
            }
        }

        function _close() {
            basket.refreshReservations();
            $location.path('/');
        }
    });