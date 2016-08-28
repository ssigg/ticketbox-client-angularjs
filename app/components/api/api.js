'use strict';

angular.module('ticketbox.customer.api', [
    'ngResource',
    'ticketbox.config'])

    .factory('Event', function($resource, api) {
        return $resource(api + '/customer/events/:id', { id: '@id' });
    })

    .factory('Block', function($resource, api) {
        return $resource(api + '/customer/blocks/:id', { id: '@id' });
    })

    .factory('Reservation', function($resource, api) {
        return $resource(api + '/customer/reservations/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })

    .factory('Order', function($resource, api) {
        return $resource(api + '/customer/orders');
    });