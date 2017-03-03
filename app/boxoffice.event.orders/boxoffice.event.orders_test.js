'use strict';

describe('ticketbox.boxoffice.event.orders', function () {
    var scope, querySpy, eventId;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.boxoffice.event.orders');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var order = {
                query: function() { }
            };
            querySpy = spyOn(order, 'query');

            eventId = 'e1';
            var routeParams = {
                eventId: eventId
            }
            $controller('EventOrdersCtrl', {$scope: scope, $routeParams: routeParams, Order: order});
        });
    });

    describe('EventOrdersCtrl', function () {
        describe('$scope.orders', function () {
            it('should fetch orders for given event', function () {
                expect(querySpy).toHaveBeenCalledWith({ 'event_id': eventId });
            });
        });
    });
});