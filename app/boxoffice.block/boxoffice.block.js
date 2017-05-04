'use strict';

angular.module('ticketbox.boxoffice.block', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.common.seatplan.handlers',
    'ticketbox.components.seatplan',
    'ticketbox.boxoffice.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/block/:blockId', {
            controller: 'BlockCtrl',
            templateUrl: 'boxoffice.block/boxoffice.block.html'
        });
    })

    .controller('BlockCtrl', function($scope, $routeParams, Eventblock) {
        $scope.block = Eventblock.get({ 'id': $routeParams.blockId });
    });