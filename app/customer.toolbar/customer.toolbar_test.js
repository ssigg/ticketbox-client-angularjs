'use strict';

describe('ticketbox.customer.toolbar', function () {
    var scope, pathSpy, getReservationsSpy, releaseReservationSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.customer.toolbar');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            
            var location = {
                path: function() { }
            };
            pathSpy = spyOn(location, 'path');

            var route = {
                current: {
                    controller: 'Ctrl'
                }
            };

            var reserver = {
                releaseReservation: function() { }
            };
            releaseReservationSpy = spyOn(reserver, 'releaseReservation');

            var basket = {
                getReservations: function() { }
            };
            getReservationsSpy = spyOn(basket, 'getReservations').and.returnValue([ 'reservation 1', 'reservation 2' ]);

            $controller('ToolbarCtrl', {$scope: scope, $location: location, $route: route, reserver: reserver, basket: basket, currency: '$'});
        });
    });

    describe('ToolbarCtrl', function () {
        describe('$scope.reservations', function () {
            it('should fetch reservations from basket', function () {
                expect(getReservationsSpy).toHaveBeenCalled();
            });
        });

        describe('$scope.currency', function() {
            it('should be $', function() {
                expect(scope.currency).toEqual('$');
            });
        });

        describe('$scope.cancel()', function() {
            it('should fetch the reservations from basket', function() {
                expect(getReservationsSpy).toHaveBeenCalledTimes(1);
                scope.cancel();
                expect(getReservationsSpy).toHaveBeenCalledTimes(2);
            });

            it('should release all two reservations using the reserver', function() {
                expect(releaseReservationSpy).not.toHaveBeenCalled();
                scope.cancel();
                expect(releaseReservationSpy).toHaveBeenCalledTimes(2)
            });

            it('should go back to /events', function() {
                expect(pathSpy).not.toHaveBeenCalled();
                scope.cancel();
                expect(pathSpy).toHaveBeenCalledWith('/events');
            });
        });
    });
});