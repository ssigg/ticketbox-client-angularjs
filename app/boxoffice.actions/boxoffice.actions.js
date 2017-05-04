'use strict';

angular.module('ticketbox.boxoffice.actions', [
    'ngRoute',
    'ticketbox.components.api',])

    .config(function($routeProvider) {
        $routeProvider.when('/actions/:eventId', {
            controller: 'ActionsCtrl',
            templateUrl: 'boxoffice.actions/boxoffice.actions.html'
        });
    })

    .controller('ActionsCtrl', function($scope, $routeParams, Event) {
        $scope.event = Event.get({ id: $routeParams.eventId });
        $scope.eventId = $routeParams.eventId;
    });