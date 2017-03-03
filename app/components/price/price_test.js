'use strict';

describe('ticketbox.components.price', function() {
    describe('totalPrice', function () {
        var totalPrice;

        beforeEach(function () {
            angular.mock.module('ticketbox.components.price');

            inject(function ($filter) {
                totalPrice = $filter('totalPrice', {});
            });
        });

        it('should return 0 if reservations is undefined', function() {
            var reservations = undefined;
            var price = totalPrice(reservations);
            expect(price).toEqual(0);
        });

        it('should return the sum of all prices if reservations is defined', function() {
            var reservations = [
                { price: 10 },
                { price: 5 }
            ];
            var price = totalPrice(reservations);
            expect(price).toEqual(10 + 5);
        });
    });
});