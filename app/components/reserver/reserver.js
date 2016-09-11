'use strict';

angular.module('ticketbox.components.reserver', [
    'ticketbox.components.api'])

    .service('reserver', function(Reservation) {
        return {
            reserve: function(eventId, seat) {
                var reservation = {
                    event_id: eventId,
                    seat_id: seat.seat.id
                };
                return Reservation.save(reservation)
                    .$promise.then(function(data) {
                        seat.state = 'reservedbymyself';
                        seat.reservation_id = data.id;
                    });
            },
            release: function(seat) {
                return Reservation.delete({ 'id': seat.reservation_id })
                    .$promise.then(function() {
                        seat.state = 'free';
                        seat.reservation_id = null;
                    });
            }
        };
    });