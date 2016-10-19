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

    .controller('ReservationsPrintoutCtrl', function($scope, $routeParams, $q,  Reservation, Event) {
        var event = Event.get({ id: $routeParams.id }).$promise;
        var reservations = Reservation.query().$promise;

        $q.all([ event, reservations ]).then(function(data) {
            var eventObject = data[0];
            var reservationList = data[1];
            $scope.eventAggregate = {
                event: eventObject,
                reservations: _.groupBy(_.filter(reservationList, function(r) { return _filterReservations(r, eventObject.id); }), _getOrder),
                boxofficePurchases: _.groupBy(_.filter(reservationList, function(r) { return _filterBoxofficePurchases(r, eventObject.id); }), _getOrder)
            };
        });

        function _filterReservations(reservation, event_id) {
            return reservation.event_id === event_id && reservation.order_id !== null && reservation.order_kind === 'reservation';
        };

        function _filterBoxofficePurchases(reservation, event_id) {
            return reservation.event_id === event_id && reservation.order_id !== null && reservation.order_kind === 'boxoffice-purchase';
        };

        function _getOrder(reservation) {
            return reservation.order_id;
        };
    })