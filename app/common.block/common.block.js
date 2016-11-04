'use strict';

angular.module('ticketbox.common.block', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.common.seatplan.handlers',
    'ticketbox.components.seatplan',
    'ticketbox.common.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/block/:blockId', {
            controller: 'BlockCtrl',
            templateUrl: 'common.block/common.block.html'
        });
    })

    .controller('BlockCtrl', function($scope, $routeParams, Eventblock) {
        $scope.block = Eventblock.get({ 'id': $routeParams.blockId });
    });