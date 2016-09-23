'use strict';

angular.module('ticketbox.common.block', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.seatplan',
    'ticketbox.common.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/block/:blockId', {
            controller: 'BlockCtrl',
            templateUrl: 'common.block/common.block.html'
        });
    })

    .controller('BlockCtrl', function($scope, $routeParams, Block) {
        $scope.block = Block.get({ 'id': $routeParams.blockId });
    });