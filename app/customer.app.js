'use strict';

angular.module('ticketbox.customer', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.components.progressInterceptor',
    'ticketbox.customer.events',
    'ticketbox.customer.event',
    'ticketbox.customer.block',
    'ticketbox.customer.basket',
    'ticketbox.customer.checkout',
    'ticketbox.customer.checkout.summary',
    'ticketbox.customer.purchase',
    'ticketbox.customer.purchase.summary',
    'ticketbox.customer.purchase.error'])

    .config(function ($routeProvider, $httpProvider, $translateProvider) {
        $routeProvider.otherwise({
            redirectTo: '/events'
        });

        $httpProvider.interceptors.push('progressInterceptor');

        $translateProvider.useStaticFilesLoader({
            prefix: 'customer.locales/',
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

        $rootScope.$on('loading:progress', function(event, message) {
            _displayLoader(message);
        })

        $rootScope.$on('loading:finish', function() {
            _displayContent();
        })

        function _displayLoader(message) {
            angular.element(document.getElementById('content')).addClass('hide');
            if (message) {
                $rootScope.progressMessage = message;
                angular.element(document.getElementById('loading-with-message')).removeClass('hide');
            } else {
                angular.element(document.getElementById('loading')).removeClass('hide');
            }
        };

        function _displayContent() {
            angular.element(document.getElementById('loading')).addClass('hide');
            angular.element(document.getElementById('loading-with-message')).addClass('hide');
            angular.element(document.getElementById('content')).removeClass('hide');
        };
    });