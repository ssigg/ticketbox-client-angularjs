'use strict';

angular.module('ticketbox.admin.blocks', [
    'ticketbox.components.api',
    'ticketbox.components.itemlist'])

    .directive('blocks', function() {
        return {
            restrict: 'E',
            scope: { },
            controller: 'BlocksCtrl',
            templateUrl: 'admin.blocks/admin.blocks.html'
        }
    })

    .controller('BlocksCtrl', function($scope, Block, itemListFactory) {
        var list = null;

        $scope.blocks = Block.query(function() {
            list = itemListFactory.create(Block, $scope.blocks);
        });

        $scope.save = function(block) {
            var blockData = {
                'name': block.name,
                'seatplan_image_data_url': block.seatplan_image_data_url,
                'numbered': block.numbered
            };
            list.save(blockData, block);
        }

        $scope.cancel = function() {
            list.cancel();
        }

        $scope.create = function() {
            var newBlock = {
                'name': '',
                'seatplan_image_data_url': 'none',
                'numbered': true
            };
            list.create(newBlock);
        }

        $scope.delete = function(block) {
            if (confirm("Delete block " + block.name + "?")) {
                list.delete(block);
            }
        }
    });