'use strict';

angular.module('ticketbox.boxoffice', [
    'ngRoute',
    'ticketbox.common.events',
    'ticketbox.common.event',
    'ticketbox.common.block',
    'ticketbox.boxoffice.checkout'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/events'
        });
    })

    .run();