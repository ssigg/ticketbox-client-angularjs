'use strict';

angular.module('ticketbox.checkout', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.reserver',
    'ticketbox.config'])

    .config(function($routeProvider) {
        $routeProvider.when('/checkout', {
            controller: 'CheckoutCtrl',
            templateUrl: 'checkout/checkout.html'
        });
    })

    .controller('CheckoutCtrl', function($scope, $location, Reservation, Order, basket, reserver, currency) {
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

        $scope.createOrder = function(title, firstname, lastname, email) {
            var order = {
                title: title,
                firstname: firstname,
                lastname: lastname,
                email: email
            };
            Order.save(order)
                .$promise.then(function() {
                    basket.refreshReservations();
                    $location.path('/summary');
                });
        }
    });