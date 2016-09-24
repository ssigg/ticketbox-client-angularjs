'use strict';

describe('ticketbox.common.block', function () {
    var scope, getSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.common.block');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var block = {
                get: function() { }
            };
            getSpy = spyOn(block, 'get');

            var routeParams = {
                'blockId': 42
            };
            $controller('BlockCtrl', {$scope: scope, Block: block, $routeParams: routeParams});
        });
    });

    describe('BlockCtrl', function () {
        describe('$scope.block', function () {
            it('should fetch block', function () {
                expect(getSpy).toHaveBeenCalledWith({ 'id': 42 }); 
            });
        });
    });
});