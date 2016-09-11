'use strict';

angular.module('ticketbox.event', [
    'ngRoute',
    'ticketbox.components.api'])

    .config(function($routeProvider) {
        $routeProvider.when('/event/:eventId', {
            controller: 'EventCtrl',
            templateUrl: 'event/event.html'
        });
    })

    .controller('EventCtrl', function($scope, $routeParams, Event) {
        $scope.event = Event.get({ 'id': $routeParams.eventId });
    });