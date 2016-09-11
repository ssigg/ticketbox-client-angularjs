'use strict';

angular.module('ticketbox.block', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.seatplan'])

    .config(function($routeProvider) {
        $routeProvider.when('/block/:blockId', {
            controller: 'BlockCtrl',
            templateUrl: 'block/block.html'
        });
    })

    .controller('BlockCtrl', function($scope, $routeParams, Block) {
        $scope.block = Block.get({ 'id': $routeParams.blockId });
    });