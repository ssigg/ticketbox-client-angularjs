'use strict';

describe('ticketbox.boxoffice.checkout.summary', function () {
    var scope, boxofficePurchaseGetSpy, uniqueId;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.boxoffice.checkout.summary');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var boxofficePurchase = {
                get: function() { }
            };
            boxofficePurchaseGetSpy = spyOn(boxofficePurchase, 'get');

            uniqueId = 'uid';
            var routeParams = {
                uniqueId: uniqueId
            }
            $controller('BoxofficeCheckoutSummaryCtrl', {$scope: scope, $routeParams: routeParams, BoxofficePurchase: boxofficePurchase, summary: '$', boxoffice: { name: 'Box Office', type: 'pdf' }});
        });
    });

    describe('BoxofficeCheckoutSummaryCtrl', function () {
        describe('$scope.boxofficePurchase', function () {
            it('should fetch boxoffice purchase with unique id', function () {
                expect(boxofficePurchaseGetSpy).toHaveBeenCalledWith({'unique_id': uniqueId});
            });
        });
    });
});