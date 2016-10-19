'use strict';

angular.module('ticketbox.boxoffice', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.progressInterceptor',
    'ticketbox.common.events',
    'ticketbox.common.event',
    'ticketbox.common.block',
    'ticketbox.boxoffice.checkout'])

    .config(function($routeProvider, $httpProvider, $translateProvider) {
        $routeProvider.otherwise({
            redirectTo: '/events'
        });
        
        $httpProvider.interceptors.push('progressInterceptor');

        $translateProvider.useStaticFilesLoader({
            prefix: 'common.locales/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.determinePreferredLanguage();
        $translateProvider.fallbackLanguage('en');
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