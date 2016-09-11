'use strict';

angular.module('ticketbox.customer', [
    'ngRoute',
    'ticketbox.events',
    'ticketbox.event',
    'ticketbox.block'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/events'
        });
    })

    .run();