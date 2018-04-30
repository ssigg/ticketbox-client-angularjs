'use strict';

angular.module('ticketbox.admin.login', [
    'ngRoute',
    'pascalprecht.translate',
    'ticketbox.config',
    'ticketbox.admin.reservations',
    'ticketbox.admin.events',
    'ticketbox.admin.blocks',
    'ticketbox.admin.categories'])

    .config(function ($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'admin.login/admin.login.html'
        });
    })

    .controller('LoginCtrl', function($scope, $http, $window, $location, api) {
        $scope.login = function(user, pass) {
            $http.post(api + '/auth/token', { user: user, pass: pass })
                .success(function(response) {
                    if (response.access_token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $window.localStorage.access_token = response.access_token;

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.access_token;

                        // execute callback with true to indicate successful login
                        $location.path('/');
                    } else {
                        // execute callback with false to indicate failed login
                    }
                });
        }
    });