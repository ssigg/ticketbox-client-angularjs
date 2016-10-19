'use strict';

angular.module('ticketbox.admin', [
    'ngRoute',
    'ticketbox.components.progressInterceptor',
    'ticketbox.components.api',
    'ticketbox.admin.dashboard',
    'ticketbox.admin.reservations.printout',
    'ticketbox.admin.block.image',
    'ticketbox.admin.block.seats'])

    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });
        $httpProvider.interceptors.push('progressInterceptor');
    })

    .run(function($rootScope) {
        $rootScope.$on('$routeChangeStart', function() {
            _displayLoader();
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            _displayContent();
        });

        $rootScope.$on('loading:progress', function() {
            _displayLoader();
        })

        $rootScope.$on('loading:finish', function() {
            _displayContent();
        })

        function _displayLoader() {
            angular.element(document.getElementById('content')).addClass('hide');
            angular.element(document.getElementById('loading')).removeClass('hide');
        };

        function _displayContent() {
            angular.element(document.getElementById('loading')).addClass('hide');
            angular.element(document.getElementById('content')).removeClass('hide');
        };
    });