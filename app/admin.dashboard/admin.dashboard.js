'use strict';

angular.module('ticketbox.admin.dashboard', [
    'ngRoute',
    'ticketbox.config',
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

    .controller('DashboardCtrl', function($scope, $http, api) {
        $scope.migrate = function() {
            $http.post(api + '/migrate', {});
        }
    });