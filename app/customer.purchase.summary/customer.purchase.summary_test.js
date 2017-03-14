'use strict';

describe('ticketbox.customer.purchase.summary', function () {
    var scope, customerPurchaseGetSpy, uniqueId;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.customer.purchase.summary');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var customerPurchase = {
                query: function() { }
            };
            customerPurchaseGetSpy = spyOn(customerPurchase, 'get');

            uniqueId = 'uid';
            var routeParams = {
                uniqueId: uniqueId
            }
            $controller('EventsCtrl', {$scope: scope, $routeParams: routeParams, CustomerPurchase: customerPurchase, summary: '$', hostName: 'Host'});
        });
    });

    describe('EventsCtrl', function () {
        describe('$scope.customerPurchase', function () {
            it('should fetch customer purchase with unique id', function () {
                expect(customerPurchaseGetSpy).toHaveBeenCalledWith({'unique_id': uniqueId});
            });
        });
    });
});