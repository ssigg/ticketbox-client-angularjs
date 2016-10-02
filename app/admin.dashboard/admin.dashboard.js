'use strict';

angular.module('ticketbox.admin.dashboard', [
    'ngRoute',
    'ticketbox.admin.reservations',
    'ticketbox.admin.events',
    'ticketbox.admin.blocks',
    'ticketbox.admin.categories'])

    .config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            controller: 'DashboardCtrl',
            templateUrl: 'admin.dashboard/admin.dashboard.html'
        });
    })

    .controller('DashboardCtrl', function() { });