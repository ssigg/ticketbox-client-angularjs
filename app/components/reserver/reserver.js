'use strict';

angular.module('ticketbox.components.reserver', [
    'ticketbox.components.api'])

    .service('reserver', function(Reservation) {
        return {
            reserve: function(eventId, seatId) {
                var reservation = new Reservation();
                reservation.event_id = eventId;
                reservation.seat_id = seatId;
                return reservation.$save();
            },
            release: function(reservationId) {
                var reservation = Reservation.get({ 'id': reservationId });
                return reservation.delete();
            }
        };
    });