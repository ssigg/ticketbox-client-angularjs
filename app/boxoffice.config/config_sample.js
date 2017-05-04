'use strict';

angular.module('ticketbox.config', [])

    .constant('api', '<ticketbox-server-url>')
    
    .constant('currency', '$')

    .constant('administrator', {
        'firstname': 'John',
        'lastname': 'Doe',
        'email': 'john.doe@example.com'
    })

    .constant('boxoffice', {
        'name': 'Box Office Name',
        'type': 'paper',// paper: Hardware tickets. Only a notification is sent and the seats are reserved.
                        // pdf: PDF tickets. Additionally to the notification, a confirmation with PDF tickets is sent to the customer.
                        // printout: Tickets to be printed at the box office. A PDF ticket will be generated but it will not be distributed by email.
                        // download: Tickets to be downloaded at the box office. All PDF tickets will be merged into one PDF for download. They will not be distributed by email.
        'event_id': 1   // The event can be hard-coded here
    })
    
    .factory('styles', function() {
        return {
            'free': { 'background': '#3f3', 'stroke': '1px solid #000', 'opacity': 0.2 },
            'freeHover': { 'background': '#282', 'stroke': '1px solid #000', 'opacity': 0.5 },
            'reserved': { 'background': '#000', 'stroke': '1px solid #000', 'opacity': 1 },
            'reservedbymyself': { 'background': '#f33', 'stroke': '1px solid #000', 'opacity': 0.4 }
        };
    });