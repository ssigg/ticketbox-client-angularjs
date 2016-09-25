'use strict';

describe('ticketbox.customer.checkout', function () {
    var scope, reservationUpdateSpy, orderSaveSpy, basketGetReservationsSpy, reserverReleaseReservationSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.customer.checkout');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            
            var reservation = {
                update: function() { }
            };
            reservationUpdateSpy = spyOn(reservation, 'update').and.returnValue({ '$promise': { then: function() {}} });

            var order = {
                save: function() { }
            };
            orderSaveSpy = spyOn(order, 'save').and.returnValue({ '$promise': { then: function() {}} });

            var basket = {
                getReservations: function() { }
            };
            basketGetReservationsSpy = spyOn(basket, 'getReservations');

            var reserver = {
                releaseReservation: function() { }
            };
            reserverReleaseReservationSpy = spyOn(reserver, 'releaseReservation');

            var routeParams = {
                'blockId': 42
            };
            $controller('CheckoutCtrl', {$scope: scope, Reservation: reservation, Order: order, basket: basket, reserver: reserver, currency: '$'});
        });
    });

    describe('CheckoutCtrl', function () {
        describe('$scope.reservations', function () {
            it('should fetch reservations from basket', function () {
                expect(basketGetReservationsSpy).toHaveBeenCalled(); 
            });
        });

        describe('$scope.currency', function() {
            it('should be $', function() {
                expect(scope.currency).toEqual('$');
            });
        });

        describe('$scope.toggleReduction()', function() {
            it('should reduce the reservation price', function() {
                var reservation = {
                    id: 42,
                    isReduced: false
                };
                expect(reservationUpdateSpy).not.toHaveBeenCalled();
                scope.toggleReduction(reservation);
                expect(reservationUpdateSpy).toHaveBeenCalledWith({ 'id': reservation.id }, { 'isReduced': true });
            });

            it('should un-reduce the reservation price', function() {
                var reservation = {
                    id: 42,
                    isReduced: true
                };
                expect(reservationUpdateSpy).not.toHaveBeenCalled();
                scope.toggleReduction(reservation);
                expect(reservationUpdateSpy).toHaveBeenCalledWith({ 'id': reservation.id }, { 'isReduced': false });
            });
        });

        describe('$scope.release()', function() {
            it('should use the reserver to release the reservation', function() {
                var reservation = { };
                expect(reserverReleaseReservationSpy).not.toHaveBeenCalled();
                scope.release(reservation);
                expect(reserverReleaseReservationSpy).toHaveBeenCalledWith(reservation);
            });
        });

        describe('$scope.createOrder()', function() {
            it('should create order and save it', function() {
                var order = {
                    'title': 'title',
                    'firstname': 'firstname',
                    'lastname': 'lastname',
                    'email' :  'email'
                };
                expect(orderSaveSpy).not.toHaveBeenCalled();
                scope.createOrder(order.title, order.firstname, order.lastname, order.email);
                expect(orderSaveSpy).toHaveBeenCalledWith(order);
            });
        });
    });
});