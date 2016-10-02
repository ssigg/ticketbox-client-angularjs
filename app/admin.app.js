'use strict';

angular.module('ticketbox.admin', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.admin.dashboard'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });
    })

    .run();