'use strict';

angular.module('ticketbox.config', [])

    .constant('api', '%API_URL%')
    
    .constant('currency', '%CURRENCY%')
    
    .factory('styles', function() {
        return {
            'free': { 'background': '#fff', 'stroke': '0px solid #000', 'opacity': 0 },
            'ordered': { 'background': '#16f', 'stroke': '1px solid #000', 'opacity': 0.5 },
            'sold': { 'background': '#f33', 'stroke': '1px solid #000', 'opacity': 1 }
        };
    });