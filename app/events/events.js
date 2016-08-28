'use strict';

angular.module('ticketbox.events', [
    'ngRoute',
    'ticketbox.components.api'])

    .config(function($routeProvider) {
        $routeProvider.when('/events', {
            controller: 'EventsCtrl',
            templateUrl: 'events/events.html'
        });
    })

    .controller('EventsCtrl', function($scope, $location, Event) {
        $scope.events = Event.query();
    });