'use strict';

angular.module('ticketbox.common.events', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.common.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/events', {
            controller: 'EventsCtrl',
            templateUrl: 'common.events/common.events.html'
        });
    })

    .controller('EventsCtrl', function($scope, Event, $location) {
        $scope.events = Event.query(function() {
            if ($scope.events.length == 1) {
                $location.path('/event/' + $scope.events[0].id);
            }
        });
    });