'use strict';

angular.module('ticketbox.customer', [
    'ngRoute',
    'ticketbox.events'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/events'
        });
    })

    .run();