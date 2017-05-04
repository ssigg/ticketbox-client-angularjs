'use strict';

angular.module('ticketbox.boxoffice.actions', [
    'ngRoute'])

    .config(function($routeProvider) {
        $routeProvider.when('/actions/:eventId', {
            controller: 'ActionsCtrl',
            templateUrl: 'boxoffice.actions/boxoffice.actions.html'
        });
    })

    .controller('ActionsCtrl', function($scope, $routeParams) {
        $scope.eventId = $routeParams.eventId;
    });