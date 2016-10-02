'use strict';

angular.module('ticketbox.admin.reservations', [
    'ticketbox.components.api'])

    .directive('reservations', function() {
        return {
            restrict: 'E',
            scope: { },
            controller: 'ReservationsCtrl',
            templateUrl: 'admin.reservations/admin.reservations.html'
        }
    })

    .controller('ReservationsCtrl', function($scope, $q, Reservation, Event) {
        var events = Event.query().$promise;
        var reservations = Reservation.query().$promise;

        $q.all([ events, reservations ]).then(function(data) {
            var eventList = data[0];
            var reservationList = data[1];
            $scope.eventAggregates = _.map(eventList, function(e) {
                return {
                    event: e,
                    reservations: _.filter(reservationList, function(r) {
                        return r.event_id === e.id && r.order_id !== null;
                    })
                };
            });
        });
    });