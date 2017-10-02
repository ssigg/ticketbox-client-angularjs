'use strict';

describe('ticketbox.boxoffice.event', function () {
    var scope, getSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.boxoffice.event');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var event = {
                get: function() { }
            };
            getSpy = spyOn(event, 'get');

            var routeParams = {
                'eventId': 42
            };
            $controller('EventCtrl', {$scope: scope, Event: event, $routeParams: routeParams});
        });
    });

    describe('EventCtrl', function () {
        describe('$scope.event', function () {
            it('should fetch event', function () {
                expect(getSpy).toHaveBeenCalledWith({ 'id': 42 }, jasmine.any(Function)); 
            });
        });
    });
});