'use strict';

angular.module('ticketbox.admin.dashboard', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.config',
    'ticketbox.admin.reservations',
    'ticketbox.admin.events',
    'ticketbox.admin.blocks',
    'ticketbox.admin.categories'])

    .config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            controller: 'DashboardCtrl',
            templateUrl: 'admin.dashboard/admin.dashboard.html'
        });
    })

    .controller('DashboardCtrl', function($scope, $translate, $http, api) {
        $scope.showEditArea = false;
        $scope.show = function() {
            $scope.showEditArea = true;
        };

        $scope.migrate = function() {
            $translate('MIGRATE QUESTION').then(function (message) {
                if (confirm(message)) {
                    _doMigration();
                }
            }, function (translationId) {
                if (confirm(translationId)) {
                    _doMigration();
                }
            })
        };

        function _doMigration() {
            $http.post(api + '/migrate', {});
        };
    });