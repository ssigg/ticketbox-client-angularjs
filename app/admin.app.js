'use strict';

angular.module('ticketbox.admin', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.progressInterceptor',
    'ticketbox.components.api',
    'ticketbox.admin.dashboard',
    'ticketbox.admin.reservations.printout',
    'ticketbox.admin.reservations.seatplan',
    'ticketbox.admin.event.blocks',
    'ticketbox.admin.block.image',
    'ticketbox.admin.block.seats',
    'ticketbox.admin.block.seats.unnumbered'])

    .config(function ($routeProvider, $httpProvider, $translateProvider) {
        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });

        $httpProvider.interceptors.push('progressInterceptor');

        $translateProvider.useStaticFilesLoader({
            prefix: 'admin.locales/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
            'en_US': 'en',
            'en_UK': 'en',
            'de_DE': 'de',
            'de_CH': 'de',
            'de_AT': 'de'
        });
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