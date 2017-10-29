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

    .controller('BlockCtrl', function($scope, $routeParams, $timeout, Eventblock, reserver, maxNumberOfUnspecifiedSeats) {
        $scope.block = Eventblock.get({ 'id': $routeParams.blockId });

        $scope.showNotification = false;
        $scope.selectableNumbersOfUnspecifiedSeats = _.range(1, maxNumberOfUnspecifiedSeats + 1);
        $scope.data = {
            numberOfSeats: 0
        };
        
        $scope.reserveMultiple = function(block, numberOfSeats) {
            reserver.reserveMultiple(block.id, numberOfSeats)
                .then(function(response) {
                    $scope.data.numberOfSeats = 0;

                    if (response.numberOfReservedSeats > 0) {
                        $scope.data.numberOfReservedSeats = response.numberOfReservedSeats;
                        $scope.showNotification = true;
                        $timeout(function() {
                            $scope.showNotification = false;
                            $scope.data.numberOfReservedSeats = 0;
                        }, 1500);
                    }
                });
        }
    });