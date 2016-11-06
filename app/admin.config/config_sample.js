'use strict';

angular.module('ticketbox.config', [])

    .constant('api', '<ticketbox-server-url>')
    
    .constant('currency', '$')
    
    .factory('styles', function() {
        return {
            'free': { 'background': '#fff', 'stroke': '0px solid #000', 'opacity': 0 },
            'ordered': { 'background': '#16f', 'stroke': '1px solid #000', 'opacity': 0.5 },
            'sold': { 'background': '#f33', 'stroke': '1px solid #000', 'opacity': 1 }
        };
    });