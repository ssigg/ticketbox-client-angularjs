'use strict';

angular.module('ticketbox.components.reserver', [
    'pascalprecht.translate',
    'ticketbox.components.basket',
    'ticketbox.components.api'])

    .service('reserver', function($window, $translate, Reservation, UnspecifiedReservation, basket) {
        return {
            reserve: function(eventId, categoryId, seat) {
                var reservation = {
                    event_id: eventId,
                    seat_id: seat.seat.id,
                    category_id: categoryId
                };
                return Reservation.save(reservation)
                    .$promise.then(function(data) {
                        seat.state = 'reservedbymyself';
                        seat.reservation_id = data.id;
                        basket.addReservation(data);
                    }, function(response) {
                        if (response.status === 409) {
                            seat.state = 'reserved';
                            $translate('SEAT IS ALREADY RESERVED').then(function (message) {
                                $window.alert(message);
                            }, function (translationId) {
                                $window.alert(translationId);
                            });
                        }
                    });
            },
            reserveMultiple: function(eventblockId, numberOfSeats) {
                var requestData = {
                    eventblock_id: eventblockId,
                    number_of_seats: numberOfSeats
                };
                return UnspecifiedReservation.save(requestData)
                    .$promise.then(function(responseData) {
                        _.each(responseData, function(reservation) {
                            basket.addReservation(reservation);
                        });
                        if (responseData.length < numberOfSeats) {
                            $translate('FREE SEATING NOT ENOUGH SEATS').then(function (message) {
                                $window.alert(message);
                            }, function (translationId) {
                                $window.alert(translationId);
                            });
                        }
                        return { numberOfReservedSeats: responseData.length };
                    });
            },
            release: function(seat) {
                var reservationId = seat.reservation_id;
                return Reservation.delete({ 'id': reservationId })
                    .$promise.then(function() {
                        seat.state = 'free';
                        seat.reservation_id = null;
                        basket.removeReservation(reservationId);
                    });
                
            },
            releaseReservation: function(reservation) {
                var reservationId = reservation.id;
                return Reservation.delete({ 'id': reservationId })
                    .$promise.then(function() {
                        basket.removeReservation(reservationId);
                    });
            }
        };
    });