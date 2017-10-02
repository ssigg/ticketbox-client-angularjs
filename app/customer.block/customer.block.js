'use strict';

angular.module('ticketbox.customer.block', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.common.seatplan.handlers',
    'ticketbox.components.seatplan',
    'ticketbox.customer.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/block/:blockId', {
            controller: 'BlockCtrl',
            templateUrl: 'customer.block/customer.block.html'
        });
    })

    .controller('BlockCtrl', function($scope, $routeParams, Eventblock) {
        $scope.block = Eventblock.get({ 'id': $routeParams.blockId });
    });