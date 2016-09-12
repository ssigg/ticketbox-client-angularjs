'use strict';

angular.module('ticketbox.event', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/event/:eventId', {
            controller: 'EventCtrl',
            templateUrl: 'event/event.html'
        });
    })

    .controller('EventCtrl', function($scope, $routeParams, Event, $location) {
        $scope.event = Event.get({ 'id': $routeParams.eventId }, function() {
            if ($scope.event.blocks.length == 1) {
                $location.path('/block/' + $scope.event.blocks[0].id);
            }
        });
    });