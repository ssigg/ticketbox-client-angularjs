'use strict';

angular.module('ticketbox.customer.block', [
    'ngRoute',
    'ticketbox.config',
    'ticketbox.components.api',
    'ticketbox.common.seatplan.handlers',
    'ticketbox.components.seatplan',
    'ticketbox.components.reserver',
    'ticketbox.customer.toolbar'])

    .config(function($routeProvider) {
        $routeProvider.when('/block/:blockId', {
            controller: 'BlockCtrl',
            templateUrl: 'customer.block/customer.block.html'
        });
    })

    .controller('BlockCtrl', function($scope, $routeParams, Eventblock, reserver, maxNumberOfUnspecifiedSeats) {
        $scope.block = Eventblock.get({ 'id': $routeParams.blockId });

        $scope.selectableNumbersOfUnspecifiedSeats = _.range(1, maxNumberOfUnspecifiedSeats + 1);
        $scope.data = {
            numberOfSeats: 0
        };
        
        $scope.reserveMultiple = function(block, numberOfSeats) {
            reserver.reserveMultiple(block.id, numberOfSeats)
                .then(function() {
                    $scope.data.numberOfSeats = 0;
                });
        }
    });