'use strict';

angular.module('ticketbox.components.api', [
    'ngResource',
    'ticketbox.config'])

    .factory('Event', function($resource, api) {
        return $resource(api + '/events/:id', { id: '@id' });
    })

    .factory('Eventblock', function($resource, api) {
        return $resource(api + '/eventblocks/:id', { id: '@id' });
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