'use strict';

angular.module('ticketbox.customer', [
    'ngRoute',
    'ticketbox.common.events',
    'ticketbox.common.event',
    'ticketbox.common.block',
    'ticketbox.customer.checkout'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/events'
        });
    })

    .run();