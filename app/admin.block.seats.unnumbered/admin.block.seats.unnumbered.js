'use strict';

angular.module('ticketbox.admin.block.seats.unnumbered', [
    'ngRoute',
    'ticketbox.components.api'])

    .config(function ($routeProvider) {
        $routeProvider.when('/block/:id/unnumbered-seats', {
            controller: 'BlockSeatsUnnumberedCtrl',
            templateUrl: 'admin.block.seats.unnumbered/admin.block.seats.unnumbered.html'
        });
    })

    .controller('BlockSeatsUnnumberedCtrl', function($scope, $routeParams, Block, Seat) {
        $scope.block = Block.get({ id: $routeParams.id });
        $scope.seats = Seat.query({ block_id: $routeParams.id });

        $scope.add = function(block_id, numberOfSeats, nameOfSeats) {
            var newSeats = [];
            for (var i = 0; i < numberOfSeats; i += 1) {
                var data = {'block_id': block_id, 'name': nameOfSeats};
                newSeats.push(data);
            }
            Seat.save(newSeats)
                .$promise.then(function(response) {
                    _.each(response, function(s) {
                        $scope.seats.push(s);
                    });
                });
        };
    });