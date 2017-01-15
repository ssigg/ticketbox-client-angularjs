'use strict';

angular.module('ticketbox.admin.reservations.printout', [
    'ngRoute',
    'ticketbox.components.api'])

    .config(function ($routeProvider) {
        $routeProvider.when('/event/:id/reservations', {
            controller: 'ReservationsPrintoutCtrl',
            templateUrl: 'admin.reservations.printout/admin.reservations.printout.html'
        });
    })

    .controller('ReservationsPrintoutCtrl', function($scope, $routeParams, $q,  Reservation, Event, Order, BoxofficePurchase, CustomerPurchase, Seat, currency) {
        $scope.currency = currency;
        $scope.event = Event.get({ id: $routeParams.id });
        $scope.orders = Order.query({ event_id: $routeParams.id });
        $scope.boxofficePurchases = BoxofficePurchase.query({ event_id: $routeParams.id });
        $scope.customerPurchases = CustomerPurchase.query({ event_id: $routeParams.id });
    })