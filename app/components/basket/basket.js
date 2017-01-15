'use strict';

angular.module('ticketbox.components.basket', [
    'ticketbox.components.api'])

    .service('basket', function($interval, Reservation) {
        var reservations = Reservation.query();

        function _addReservationInternal(reservation) {
            reservations.push(reservation);
        }

        function _removeReservationInternal(reservationId) {
            var reservationIndex = _.findIndex(reservations, function(r) { return r.id === reservationId; });
            if (reservationIndex !== -1) {
                reservations.splice(reservationIndex, 1);
            }
        }

        return {
            refreshReservations: function() {
                reservations = Reservation.query();
            },
            getReservations: function() {
                return reservations;
            },
            addReservation: function(reservation) {
                _addReservationInternal(reservation);
            },
            removeReservation: function(reservationId) {
                _removeReservationInternal(reservationId);
            }
        }
    });