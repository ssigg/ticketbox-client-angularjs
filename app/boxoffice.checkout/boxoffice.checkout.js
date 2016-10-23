'use strict';

angular.module('ticketbox.boxoffice.checkout', [
    'ngRoute',
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

    .controller('CheckoutCtrl', function($scope, $location, $translate, Reservation, BoxofficePurchase, basket, reserver, currency) {
        $scope.reservations = basket.getReservations();
        $scope.currency = currency;

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

        $scope.createBoxofficePurchase = function() {
            var purchase = {
                locale: $translate.use()
            };
            BoxofficePurchase.save(purchase)
                .$promise.then(function() {
                    basket.refreshReservations();
                    $location.path('/summary');
                });
        }
    });