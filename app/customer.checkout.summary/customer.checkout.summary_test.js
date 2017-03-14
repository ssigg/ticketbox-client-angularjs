'use strict';

describe('ticketbox.customer.checkout.summary', function () {
    var scope, orderGetSpy, uniqueId;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.customer.checkout.summary');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var order = {
                get: function() { }
            };
            orderGetSpy = spyOn(order, 'get');

            uniqueId = 'uid';
            var routeParams = {
                uniqueId: uniqueId
            }
            $controller('CustomerCheckoutSummaryCtrl', {$scope: scope, $routeParams: routeParams, Order: order, summary: '$', hostName: 'Host'});
        });
    });

    describe('CustomerCheckoutSummaryCtrl', function () {
        describe('$scope.order', function () {
            it('should fetch order with unique id', function () {
                expect(orderGetSpy).toHaveBeenCalledWith({'unique_id': uniqueId});
            });
        });
    });
});