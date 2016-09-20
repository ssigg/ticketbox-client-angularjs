'use strict';

describe('ticketbox.events', function () {
    var scope, querySpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.events');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var event = {
                query: function() { }
            };
            querySpy = spyOn(event, 'query');
            $controller('EventsCtrl', {$scope: scope, Event: event});
        });
    });

    describe('EventsCtrl', function () {
        describe('$scope.events', function () {
            it('should fetch events', function () {
                expect(querySpy).toHaveBeenCalled(); 
            });
        });
    });
});