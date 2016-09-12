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

    .controller('EventsCtrl', function($scope, Event) {
        $scope.events = Event.query();
    });