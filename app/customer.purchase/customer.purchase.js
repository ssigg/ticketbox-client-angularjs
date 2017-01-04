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

    .controller('PurchaseCtrl', function($scope, $location, $translate, Reservation, Token, CustomerPurchase, basket, reserver, currency) {
        $scope.reservations = basket.getReservations();
        $scope.currency = currency;

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
                        .$promise.then(function(response) {
                            basket.refreshReservations();
                            $location.path('/summary');
                        }, function(response) {
                            console.log(response);
                            alert('failure! See log.'); // TODO: add better error handling.
                        });
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

        // $scope.createPurchase = function(title, firstname, lastname, email) {
        //     var order = {
        //         title: title,
        //         firstname: firstname,
        //         lastname: lastname,
        //         email: email,
        //         locale: $translate.use()
        //     };
        //     Order.save(order)
        //         .$promise.then(function() {
        //             basket.refreshReservations();
        //             $location.path('/summary');
        //         });
        // }
    });