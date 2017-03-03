'use strict';

angular.module('ticketbox.components.price', [
    ])
    
    .filter('totalPrice', function() {
        return function(reservations) {
            if (reservations === undefined) {
                return 0;
            } else {
                return _.reduce(reservations, function(totalPrice, r) { return totalPrice + r.price; }, 0);
            }
        }
    })