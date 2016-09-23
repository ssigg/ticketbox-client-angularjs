'use strict';

angular.module('ticketbox.common.event', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.common.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/event/:eventId', {
            controller: 'EventCtrl',
            templateUrl: 'common.event/common.event.html'
        });
    })

    .controller('EventCtrl', function($scope, $routeParams, Event, $location) {
        $scope.event = Event.get({ 'id': $routeParams.eventId }, function() {
            if ($scope.event.blocks.length == 1) {
                $location.path('/block/' + $scope.event.blocks[0].id);
            }
        });
    });