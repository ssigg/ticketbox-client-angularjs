'use strict';

describe('ticketbox.boxoffice.checkout', function () {
    var scope, translateUseSpy, reservationUpdateSpy, reservationsExpirationTimestampQuerySpy, boxofficePurchaseSaveSpy, basketGetReservationsSpy, reserverReleaseReservationSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        angular.module('pascalprecht.translate',[]);
        module('ticketbox.boxoffice.checkout');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();

            var translate = function() {
                return {
                    then: function() { }
                }
            };
            translate.use = function() { };
            translateUseSpy = spyOn(translate, 'use').and.returnValue('en');
            
            var reservation = {
                update: function() { }
            };
            reservationUpdateSpy = spyOn(reservation, 'update').and.returnValue({ '$promise': { then: function() {}} });
            
            var reservationsExpirationTimestamp = {
                query: function() { }
            };
            reservationsExpirationTimestampQuerySpy = spyOn(reservationsExpirationTimestamp, 'query').and.returnValue({ '$promise': { then: function() {} } });

            var boxofficePurchase = {
                save: function() { }
            };
            boxofficePurchaseSaveSpy = spyOn(boxofficePurchase, 'save').and.returnValue({ '$promise': { then: function() {}} });

            var basket = {
                getReservations: function() { }
            };
            basketGetReservationsSpy = spyOn(basket, 'getReservations');

            var reserver = {
                releaseReservation: function() { }
            };
            reserverReleaseReservationSpy = spyOn(reserver, 'releaseReservation');

            var boxoffice = {
                name: 'Box Office',
                type: 'paper'
            };

            var routeParams = {
                'blockId': 42
            };
            $controller('CheckoutCtrl', {$scope: scope, $translate: translate, Reservation: reservation,  ReservationsExpirationTimestamp: reservationsExpirationTimestamp, BoxofficePurchase: boxofficePurchase, basket: basket, reserver: reserver, currency: '$', boxoffice: boxoffice});
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

        describe('$scope.createBoxofficePurchase()', function() {
            it('should create order and save it', function() {
                expect(boxofficePurchaseSaveSpy).not.toHaveBeenCalled();
                scope.createBoxofficePurchase();
                expect(boxofficePurchaseSaveSpy).toHaveBeenCalledWith({ locale: 'en', boxofficeName: 'Box Office', boxofficeType: 'paper', email: undefined });
            });

            it('should create order and save it', function() {
                expect(boxofficePurchaseSaveSpy).not.toHaveBeenCalled();
                scope.createBoxofficePurchase('email');
                expect(boxofficePurchaseSaveSpy).toHaveBeenCalledWith({ locale: 'en', boxofficeName: 'Box Office', boxofficeType: 'paper', email: 'email' });
            });

            it('should use the current locale', function() {
                expect(translateUseSpy).not.toHaveBeenCalled();
                scope.createBoxofficePurchase();
                expect(translateUseSpy).toHaveBeenCalled();
            });
        });
    });
});