'use strict';

angular.module('ticketbox.config', [])

    .constant('api', '<ticketbox-server-url>')
    
    .constant('currency', '$')

    .constant('canCustomerPurchase', true)

    .constant('hostName', 'Host Name')

    .constant('administrator', {
        'firstname': 'John',
        'lastname': 'Doe',
        'email': 'john.doe@example.com'
    })
    
    .factory('styles', function() {
        return {
            'free': { 'background': '#3f3', 'stroke': '1px solid #000', 'opacity': 0.2 },
            'freeHover': { 'background': '#282', 'stroke': '1px solid #000', 'opacity': 0.5 },
            'reserved': { 'background': '#000', 'stroke': '1px solid #000', 'opacity': 1 },
            'reservedbymyself': { 'background': '#f33', 'stroke': '1px solid #000', 'opacity': 0.4 }
        };
    });