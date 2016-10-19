'use strict';

angular.module('ticketbox.components.progressInterceptor', [ ])

    .factory('progressInterceptor', function($q, $rootScope) {
        var pendingRequestsCount = 0;
        return {
            request: function (config) {
                pendingRequestsCount += 1;
                if(pendingRequestsCount === 2) {
                    $rootScope.$broadcast('loading:progress');
                }
                return config || $q.when(config);
            },

            response: function (response) {
                pendingRequestsCount -= 1;
                if(pendingRequestsCount === 0) {
                    $rootScope.$broadcast('loading:finish');
                }
                return response || $q.when(response);
            },

            responseError: function (response) {
                pendingRequestsCount -= 1;
                if(pendingRequestsCount === 0) {
                    $rootScope.$broadcast('loading:finish');
                }
                return $q.reject(response);
            }
        };
    });