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

    .controller('CheckoutCtrl', function($scope, $location, $translate, Reservation, Order, basket, reserver, currency) {
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
                email: email,
                locale: $translate.use()
            };
            Order.save(order)
                .$promise.then(function() {
                    basket.refreshReservations();
                    $location.path('/summary');
                });
        }
    });