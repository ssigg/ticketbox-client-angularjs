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

    .factory('ReservationsExpirationTimestamp', function($resource, api) {
        return $resource(api + '/reservations-expiration-timestamp', {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    })

    .factory('Order', function($resource, api) {
        return $resource(api + '/orders/:unique_id', { unique_id: '@unique_id' });
    })
    
    .factory('BoxofficePurchase', function($resource, api) {
        return $resource(api + '/boxoffice-purchases/:unique_id', { unique_id: '@unique_id' });
    })

    .factory('OrderUpgrade', function($resource, api) {
        return $resource(api + '/upgrade-order/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })
    
    .factory('CustomerPurchase', function($resource, api) {
        return $resource(api + '/customer-purchases/:unique_id', { unique_id: '@unique_id' });
    })
    
    .factory('Token', function($resource, api) {
        return $resource(api + '/customer-purchase-token', {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    })
    
    .factory('Log', function($resource, api) {
        return $resource(api + '/log');
    });