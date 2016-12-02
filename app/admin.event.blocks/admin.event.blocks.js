'use strict';

angular.module('ticketbox.admin.event.blocks', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.itemlist'])

    .config(function ($routeProvider) {
        $routeProvider.when('/event/:id/blocks', {
            controller: 'EventBlocksCtrl',
            templateUrl: 'admin.event.blocks/admin.event.blocks.html'
        });
    })

    .controller('EventBlocksCtrl', function($scope, $routeParams, itemListFactory, Event, Eventblock, Block, Category) {
        var list = null;
        
        $scope.event = Event.get({ id: $routeParams.id }, function() {
            list = itemListFactory.create(Eventblock, $scope.event.blocks);
        });
        $scope.blocks = Block.query();
        $scope.categories = Category.query();

        $scope.save = function(eventblock) {
            var eventblockData = {
                'event_id': $routeParams.id,
                'block_id': eventblock.block_id,
                'category_id': eventblock.category_id
            };

            eventblock.block = _.find($scope.blocks, function(b) { return b.id === eventblock.block_id; });
            eventblock.category = _.find($scope.categories, function(c) { return c.id === eventblock.category_id; });

            list.save(eventblockData, eventblock);
        }

        $scope.cancel = function() {
            list.cancel();
        }

        $scope.create = function() {
            var newEventblock = {
                'block_id': null,
                'category_id': null
            };
            list.create(newEventblock);
        }

        $scope.delete = function(eventblock) {
            if (confirm("Delete assignment " + eventblock.block.name + " - " + eventblock.category.name + "?")) {
                list.delete(eventblock);
            }
        }
    })
    
    .filter('isAnyEventblockTransient', function() {
        return function(eventblocks) {
            if (eventblocks === undefined) {
                return false;
            } else {
                return !_.some(eventblocks, function(e) { return e.isTransient === true; })
            }
        }
    });