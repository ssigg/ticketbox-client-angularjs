'use strict';

describe('ticketbox.boxoffice.event.orders', function () {
    var scope, eventId, translate, orderQuerySpy, orderUpgrade, boxofficeName, boxofficeType;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.boxoffice.event.orders');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();

            eventId = 'e1';
            var routeParams = {
                eventId: eventId
            }

            translate = function() {
                return {
                    then: function() { }
                }
            };
            translate.use = function() { };

            var order = {
                query: function() { }
            };
            orderQuerySpy = spyOn(order, 'query');

            orderUpgrade = {
                update: function() { }
            };

            var log = {
                save: function() { }
            };

            boxofficeName = 'Box Office';
            boxofficeType = 'pdf';
            var boxoffice = {
                'name': boxofficeName,
                'type': boxofficeType
            };
            $controller('EventOrdersCtrl', {$scope: scope, $routeParams: routeParams, $translate: translate, Order: order, OrderUpgrade: orderUpgrade, Log: log, boxoffice: boxoffice});
        });
    });

    describe('EventOrdersCtrl', function () {
        describe('$scope.orders', function () {
            it('should fetch orders for given event', function () {
                expect(orderQuerySpy).toHaveBeenCalledWith({ 'event_id': eventId });
            });
        });

        describe('$scope.toggleOrderSelection', function () {
            it('should select given order when no order is selected', function () {
                var order = { };

                expect(scope.selectedOrder).toEqual(undefined);
                scope.toggleOrderSelection(order);
                expect(scope.selectedOrder).toEqual(order);
            });

            it('should select given order when another order is selected', function () {
                var order1 = { };
                var order2 = { };
                scope.selectedOrder = order1;

                expect(scope.selectedOrder).toEqual(order1);
                scope.toggleOrderSelection(order2);
                expect(scope.selectedOrder).toEqual(order2);
            });

            it('should deselect given order when it is selected', function () {
                var order = { };
                scope.selectedOrder = order;

                expect(scope.selectedOrder).toEqual(order);
                scope.toggleOrderSelection(order);
                expect(scope.selectedOrder).toEqual(undefined);
            });
        });

        describe('$scope.sell', function() {
            it('should upgrade the order', function() {
                var updatePromiseStub = {
                    $promise: {
                        then: function() { }
                    }
                };
                var orderUpgradeUpdateSpy = spyOn(orderUpgrade, 'update').and.returnValue(updatePromiseStub);
                var orderId = 'o1';
                var order = { 'id': orderId };

                var eventId = 1;

                var locale = 'en';
                var translateUseSpy = spyOn(translate, 'use').and.returnValue(locale);
                
                expect(orderUpgradeUpdateSpy).not.toHaveBeenCalled();
                scope.sell(order, eventId);
                expect(orderUpgradeUpdateSpy).toHaveBeenCalledWith({ 'id': orderId }, { locale: locale, boxofficeName: boxofficeName, boxofficeType: boxofficeType, eventId: eventId });
            });
        });
    });
});