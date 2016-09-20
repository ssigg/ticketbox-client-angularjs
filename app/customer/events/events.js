'use strict';

angular.module('ticketbox.events', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/events', {
            controller: 'EventsCtrl',
            templateUrl: 'events/events.html'
        });
    })

    .controller('EventsCtrl', function($scope, Event, $location) {
        $scope.events = Event.query(function() {
            if ($scope.events.length == 1) {
                $location.path('/event/' + $scope.events[0].id);
            }
        });
    });