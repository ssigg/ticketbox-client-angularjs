'use strict';

angular.module('ticketbox.boxoffice.events', [
    'ngRoute',
    'ticketbox.config',
    'ticketbox.components.api',
    'ticketbox.boxoffice.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/events', {
            controller: 'EventsCtrl',
            templateUrl: 'boxoffice.events/boxoffice.events.html'
        });
    })

    .controller('EventsCtrl', function($scope, Event, $location, administrator, boxoffice) {
        $scope.administrator = administrator;
        
        $scope.events = Event.query(function() {
            if ($scope.events.length === 1) {
                $location.path('/actions/' + $scope.events[0].id);
            }
            if (boxoffice.event_id !== undefined) {
                $location.path('/actions/' + boxoffice.event_id);
            }
        });
    });