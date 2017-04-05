'use strict';

describe('ticketbox.customer.checkout', function () {
    var scope, translateUseSpy, reservationUpdateSpy, reservationsExpirationTimestampQuerySpy, orderSaveSpy, basketGetReservationsSpy, reserverReleaseReservationSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        angular.module('pascalprecht.translate',[]);
        module('ticketbox.customer.checkout');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();

            var translate = {
                use: function() { }
            };
            translateUseSpy = spyOn(translate, 'use').and.returnValue('en');
            
            var reservation = {
                update: function() { }
            };
            reservationUpdateSpy = spyOn(reservation, 'update').and.returnValue({ '$promise': { then: function() {} } });

            var reservationsExpirationTimestamp = {
                query: function() { }
            };
            reservationsExpirationTimestampQuerySpy = spyOn(reservationsExpirationTimestamp, 'query').and.returnValue({ '$promise': { then: function() {} } });

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
            $controller('CheckoutCtrl', {$scope: scope, $translate: translate, Reservation: reservation, ReservationsExpirationTimestamp: reservationsExpirationTimestamp, Order: order, basket: basket, reserver: reserver, currency: '$'});
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
                scope.reservations = [ 'reservation 1', 'reservation 2' ];
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
                    'email' :  'email',
                    'locale': 'en'
                };
                expect(orderSaveSpy).not.toHaveBeenCalled();
                scope.createOrder(order.title, order.firstname, order.lastname, order.email);
                expect(orderSaveSpy).toHaveBeenCalledWith(order);
            });

            it('should use the current locale', function() {
                expect(translateUseSpy).not.toHaveBeenCalled();
                scope.createOrder('title', 'firstname', 'lastname', 'email');
                expect(translateUseSpy).toHaveBeenCalled();
            });
        });
    });
});