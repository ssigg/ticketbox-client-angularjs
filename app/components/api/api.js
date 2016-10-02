'use strict';

angular.module('ticketbox.components.api', [
    'ngResource',
    'ticketbox.config'])

    .factory('Event', function($resource, api) {
        return $resource(api + '/events/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })

    .factory('Eventblock', function($resource, api) {
        return $resource(api + '/eventblocks/:id', { id: '@id' });
    })

    .factory('Block', function($resource, api) {
        return $resource(api + '/blocks/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })

    .factory('Category', function($resource, api) {
        return $resource(api + '/categories/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })

    .factory('Seat', function($resource, api) {
        return $resource(api + '/seats/:id', { id: '@id' }, {
            save: { method: 'POST', isArray: true }
        });
    })

    .factory('Reservation', function($resource, api) {
        return $resource(api + '/reservations/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })

    .factory('Order', function($resource, api) {
        return $resource(api + '/orders');
    })
    
    .factory('BoxofficePurchase', function($resource, api) {
        return $resource(api + '/boxoffice-purchases');
    });