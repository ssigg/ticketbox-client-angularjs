'use strict';

angular.module('ticketbox.admin.block.image', [
    'ngRoute',
    'ticketbox.components.api'])

    .config(function ($routeProvider) {
        $routeProvider.when('/block/:id/image', {
            controller: 'BlockImageCtrl',
            templateUrl: 'admin.block.image/admin.block.image.html'
        });
    })

    .controller('BlockImageCtrl', function($scope, $routeParams, $location, Block) {
        $scope.block = Block.get({ id: $routeParams.id });

        $scope.save = function(block) {
            Block.update({ 'id': block.id }, block)
                .$promise.then(function() {
                    $location.path('/dashboard');
                });
        };
    })

    .directive('ngImageUpload', function() {
        function _create(scope, element, attrs) {
            document
                .getElementById('ngFileUpload-input')
                .addEventListener('change', function(event) { _handleFileSelectAdd(scope, event); }, false);
        }

        function _handleFileSelectAdd(scope, event) {
            var f = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    scope.ngModel = e.target.result;
                    scope.$apply();
                    //document.getElementById('ngFileUpload-image').src = e.target.result;
                };
            })(f);
            reader.readAsDataURL(f);
        }

        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            template: '<input type="file" accept="image/*" capture="camera" id="ngFileUpload-input">',
            link: _create
        };
    });