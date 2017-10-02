'use strict';

describe('ticketbox.boxoffice.events', function () {
    var scope, querySpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.boxoffice.events');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var event = {
                query: function() { }
            };
            querySpy = spyOn(event, 'query');

            var boxoffice = { };
            $controller('EventsCtrl', {$scope: scope, Event: event, boxoffice: boxoffice});
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