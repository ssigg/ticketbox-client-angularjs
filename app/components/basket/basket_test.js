'use strict';

describe('ticketbox.components.basket', function() {
    describe('basket', function() {
        var basket, reservationListStub, reservationQuerySpy;

        angular.module('ticketbox.components.api',[]);
        beforeEach(module('ticketbox.components.basket', function($provide) {

            var reservationStub = {
                query: function() { }
            }
            reservationListStub = [ { id: 'a' }, { id: 'b' }, { id: 'c' } ];
            reservationQuerySpy = spyOn(reservationStub, 'query').and.returnValue(reservationListStub);
            $provide.value('Reservation', reservationStub);
        }));

        beforeEach(inject(function(_basket_) {
            basket = _basket_;
        }));

        describe('constructor', function() {
            it('should fetch the reservations', function() {
                expect(reservationQuerySpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('refreshReservations()', function() {
            it('should fetch the reservations', function() {
                expect(reservationQuerySpy).toHaveBeenCalledTimes(1);
                basket.refreshReservations();
                expect(reservationQuerySpy).toHaveBeenCalledTimes(2);
            });
        });

        describe('getReservations()', function() {
            it('should return the reservations stored in the basket', function() {
                var reservations = basket.getReservations();
                expect(reservations).toEqual(reservationListStub);
            });
        });

        describe('addReservation()', function() {
            it('should add the reservation to the list stored in the basket', function() {
                var reservations = basket.getReservations();
                expect(reservations).not.toContain({ id: 'x' });
                basket.addReservation({ id: 'x' });
                var reservations = basket.getReservations();
                expect(reservations).toContain({ id: 'x' });
            });
        });

        describe('removeReservation()', function() {
            it('should remove the reservation with the given id from the reservations stored in the basket', function() {
                var reservations = basket.getReservations();
                expect(reservations).toContain({ id: 'a' });
                basket.removeReservation('a');
                var reservations = basket.getReservations();
                expect(reservations).not.toContain({ id: 'a' });
            });

            it('should do nothing if the reservation with the given id is not in the reservations stored in the basket', function() {
                var reservations = basket.getReservations();
                expect(reservations).toContain({ id: 'a' });
                basket.removeReservation('x');
                var reservations = basket.getReservations();
                expect(reservations).toContain({ id: 'a' });
            });
        });
    });
});